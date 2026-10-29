import React, { useState, useEffect } from 'react';
import { X, Calendar, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { Goal, GoalCategory, GoalFormData, GoalStatus } from '../types/goal';

interface GoalFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: GoalFormData) => void;
  initialGoal?: Goal | null;
}

export const GoalFormModal: React.FC<GoalFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialGoal,
}) => {
  const isEditing = Boolean(initialGoal);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [status, setStatus] = useState<GoalStatus>('nao_iniciado');
  const [category, setCategory] = useState<GoalCategory>('geral');

  // Error validation states
  const [errors, setErrors] = useState<{ title?: string; deadline?: string }>({});

  useEffect(() => {
    if (initialGoal) {
      setTitle(initialGoal.title);
      setDescription(initialGoal.description || '');
      setDeadline(initialGoal.deadline || '');
      setStatus(initialGoal.status || 'nao_iniciado');
      setCategory(initialGoal.category || 'geral');
    } else {
      // Default para novo objetivo: prazo para daqui a 14 dias
      const defaultDate = new Date();
      defaultDate.setDate(defaultDate.getDate() + 14);
      setTitle('');
      setDescription('');
      setDeadline(defaultDate.toISOString().split('T')[0]);
      setStatus('nao_iniciado');
      setCategory('geral');
    }
    setErrors({});
  }, [initialGoal, isOpen]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleQuickDeadline = (days: number) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    setDeadline(d.toISOString().split('T')[0]);
    if (errors.deadline) {
      setErrors((prev) => ({ ...prev, deadline: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: { title?: string; deadline?: string } = {};

    if (!title.trim()) {
      newErrors.title = 'Por favor, informe o título do seu objetivo de estudo.';
    } else if (title.trim().length < 3) {
      newErrors.title = 'O título deve ter no mínimo 3 caracteres.';
    }

    if (!deadline) {
      newErrors.deadline = 'Por favor, escolha uma data limite para seu objetivo.';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim(),
      deadline,
      status,
      category,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between px-6 py-4.5 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 id="modal-title" className="text-base font-bold text-slate-900">
                {isEditing ? 'Editar Objetivo de Estudo' : 'Novo Objetivo de Estudo'}
              </h2>
              <p className="text-xs text-slate-500">
                {isEditing
                  ? 'Atualize as informações do seu objetivo'
                  : 'Defina o que você quer aprender e quando pretende alcançar'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
            aria-label="Fechar janela"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {/* Título */}
          <div>
            <label htmlFor="goal-title" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Título do Objetivo <span className="text-rose-500">*</span>
            </label>
            <input
              id="goal-title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
              }}
              placeholder="Ex.: Aprender Sintaxe Básica do Python"
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-colors ${
                errors.title
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
              }`}
              autoFocus
            />
            {errors.title && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.title}
              </p>
            )}
            <p className="text-[11px] text-slate-400 mt-1">
              Dica: Seja específico no que deseja alcançar.
            </p>
          </div>

          {/* Descrição */}
          <div>
            <label htmlFor="goal-desc" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Descrição ou Plano de Ação
            </label>
            <textarea
              id="goal-desc"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Ex.: Assistir aulas 1 a 10 do curso, praticar 15 exercícios no caderno e criar um projeto simples no final."
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 bg-white placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors resize-none"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Opcional, mas ajuda muito a lembrar quais materiais ou etapas seguir.
            </p>
          </div>

          {/* Prazo (Deadline) com Atalhos Rápidos */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label htmlFor="goal-deadline" className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Prazo Limite (Data) <span className="text-rose-500">*</span>
              </label>
              <div className="flex items-center gap-1 text-[11px] text-slate-500">
                <span className="hidden sm:inline">Atalhos:</span>
                <button
                  type="button"
                  onClick={() => handleQuickDeadline(7)}
                  className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
                >
                  +1 sem
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDeadline(15)}
                  className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
                >
                  +15 dias
                </button>
                <button
                  type="button"
                  onClick={() => handleQuickDeadline(30)}
                  className="px-1.5 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium transition-colors cursor-pointer"
                >
                  +1 mês
                </button>
              </div>
            </div>

            <div className="relative">
              <input
                id="goal-deadline"
                type="date"
                value={deadline}
                onChange={(e) => {
                  setDeadline(e.target.value);
                  if (errors.deadline) setErrors((prev) => ({ ...prev, deadline: undefined }));
                }}
                className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-white focus:outline-none focus:ring-2 transition-colors ${
                  errors.deadline
                    ? 'border-rose-400 focus:ring-rose-200'
                    : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-100'
                }`}
              />
            </div>
            {errors.deadline && (
              <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium">
                <AlertCircle className="w-3.5 h-3.5" />
                {errors.deadline}
              </p>
            )}
          </div>

          {/* Linha dupla: Status & Categoria */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
            {/* Status */}
            <div>
              <label htmlFor="goal-status" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Status Inicial
              </label>
              <select
                id="goal-status"
                value={status}
                onChange={(e) => setStatus(e.target.value as GoalStatus)}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white text-slate-800 font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors cursor-pointer"
              >
                <option value="nao_iniciado">Não iniciado</option>
                <option value="em_andamento">Em andamento</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>

            {/* Categoria */}
            <div>
              <label htmlFor="goal-category" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Área de Estudo
              </label>
              <select
                id="goal-category"
                value={category}
                onChange={(e) => setCategory(e.target.value as GoalCategory)}
                className="w-full px-3 py-2.5 text-sm rounded-xl border border-slate-300 bg-white text-slate-800 font-medium focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-colors cursor-pointer"
              >
                <option value="geral">Geral</option>
                <option value="programacao">Programação & Tech</option>
                <option value="idiomas">Idiomas</option>
                <option value="vestibular_concurso">Vestibular / Concurso</option>
                <option value="faculdade">Faculdade / Escola</option>
                <option value="leitura">Leitura</option>
                <option value="habilidades">Habilidades & Hábitos</option>
              </select>
            </div>
          </div>

          {/* Botões de Ação do Rodapé */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-semibold text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              {isEditing ? 'Salvar Alterações' : 'Cadastrar Objetivo'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
