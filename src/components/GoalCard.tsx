import React from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Edit2,
  Trash2,
  Circle,
  Tag,
  AlertCircle,
} from 'lucide-react';
import { Goal, GoalStatus } from '../types/goal';
import {
  formatDateBR,
  formatDeadlineStatus,
  STATUS_CONFIG,
  CATEGORY_CONFIG,
} from '../utils/formatters';

interface GoalCardProps {
  goal: Goal;
  onEdit: (goal: Goal) => void;
  onRequestDelete: (goal: Goal) => void;
  onToggleComplete: (id: string) => void;
  onStatusChange: (id: string, newStatus: GoalStatus) => void;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goal,
  onEdit,
  onRequestDelete,
  onToggleComplete,
  onStatusChange,
}) => {
  const isCompleted = goal.status === 'concluido';
  const deadlineInfo = formatDeadlineStatus(goal.deadline, goal.status);
  const statusCfg = STATUS_CONFIG[goal.status];
  const categoryCfg = goal.category ? CATEGORY_CONFIG[goal.category] : null;

  return (
    <article
      className={`group relative bg-white rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between ${
        isCompleted
          ? 'border-emerald-200/80 bg-emerald-50/20 shadow-xs'
          : deadlineInfo.isOverdue
          ? 'border-rose-200/80 shadow-xs'
          : 'border-slate-200 hover:border-slate-300 hover:shadow-xs'
      }`}
    >
      <div>
        {/* Linha Superior: Categoria / Metadata & Botão de Conclusão Rápida */}
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2 text-xs text-slate-500 flex-wrap">
            {categoryCfg && (
              <>
                <span className="inline-flex items-center gap-1 font-medium text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                  <Tag className="w-3 h-3 text-indigo-500" />
                  {categoryCfg.label}
                </span>
                <span className="text-slate-300" aria-hidden="true">·</span>
              </>
            )}

            {/* Seletor Rápido de Status */}
            <div className="relative inline-flex items-center">
              <select
                value={goal.status}
                onChange={(e) => onStatusChange(goal.id, e.target.value as GoalStatus)}
                aria-label={`Status do objetivo: ${goal.title}`}
                className={`text-xs font-semibold py-0.5 px-2 rounded-md border transition-colors cursor-pointer focus:outline-none focus:ring-1 focus:ring-indigo-500 ${statusCfg.badgeBg} ${statusCfg.badgeText} ${statusCfg.border}`}
              >
                <option value="nao_iniciado">Não iniciado</option>
                <option value="em_andamento">Em andamento</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>
          </div>

          {/* Botão de Concluir com 1 clique */}
          <button
            type="button"
            onClick={() => onToggleComplete(goal.id)}
            className={`p-1 rounded-lg transition-colors cursor-pointer shrink-0 ${
              isCompleted
                ? 'text-emerald-600 hover:text-emerald-700 hover:bg-emerald-100/60'
                : 'text-slate-400 hover:text-indigo-600 hover:bg-slate-100'
            }`}
            title={isCompleted ? 'Desmarcar conclusão' : 'Marcar como concluído'}
            aria-label={isCompleted ? 'Desmarcar objetivo concluído' : 'Marcar objetivo como concluído'}
          >
            {isCompleted ? (
              <CheckCircle2 className="w-5 h-5 fill-emerald-100 text-emerald-600" />
            ) : (
              <Circle className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Título do Objetivo */}
        <h3
          className={`text-base font-bold text-slate-900 leading-snug break-words mb-2 ${
            isCompleted ? 'line-through text-slate-500 decoration-slate-400' : ''
          }`}
        >
          {goal.title}
        </h3>

        {/* Descrição do Objetivo */}
        {goal.description && (
          <p
            className={`text-sm text-slate-600 whitespace-pre-line leading-relaxed break-words mb-4 line-clamp-4 ${
              isCompleted ? 'text-slate-400' : ''
            }`}
          >
            {goal.description}
          </p>
        )}
      </div>

      {/* Rodapé do Cartão: Prazo & Botões de Ação */}
      <div className="pt-3.5 mt-2 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
        {/* Informação do Prazo */}
        <div className="flex items-center gap-1.5 flex-wrap min-w-0">
          <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-600 font-medium whitespace-nowrap">
            {formatDateBR(goal.deadline)}
          </span>

          {goal.deadline && (
            <>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span
                className={`font-medium inline-flex items-center gap-1 whitespace-nowrap ${
                  isCompleted
                    ? 'text-emerald-600'
                    : deadlineInfo.isOverdue
                    ? 'text-rose-600'
                    : deadlineInfo.isSoon
                    ? 'text-amber-600'
                    : 'text-slate-500'
                }`}
              >
                {!isCompleted && deadlineInfo.isOverdue && (
                  <AlertCircle className="w-3 h-3 text-rose-500 shrink-0" />
                )}
                {!isCompleted && deadlineInfo.isSoon && (
                  <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                )}
                {deadlineInfo.label}
              </span>
            </>
          )}
        </div>

        {/* Botões de Ação: Editar e Excluir */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => onEdit(goal)}
            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
            title="Editar este objetivo"
            aria-label="Editar objetivo"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => onRequestDelete(goal)}
            className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
            title="Excluir este objetivo"
            aria-label="Excluir objetivo"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </article>
  );
};
