import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { StatsOverview } from './components/StatsOverview';
import { FilterBar } from './components/FilterBar';
import { GoalCard } from './components/GoalCard';
import { GoalFormModal } from './components/GoalFormModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { EmptyState } from './components/EmptyState';
import { StudyTips } from './components/StudyTips';
import { storageService } from './services/storageService';
import { Goal, GoalFormData, GoalStatus, FilterStatus, SortOption } from './types/goal';
import { Check, CheckCircle2, Info, Plus } from 'lucide-react';

export default function App() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Modal states
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [goalToDelete, setGoalToDelete] = useState<Goal | null>(null);

  // Search & Filter & Sort states
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('todos');
  const [sortOption, setSortOption] = useState<SortOption>('prazo_asc');

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
  };

  useEffect(() => {
    if (!toastMessage) return;
    const timer = setTimeout(() => {
      setToastMessage(null);
    }, 3200);
    return () => clearTimeout(timer);
  }, [toastMessage]);

  // Carrega os objetivos do localStorage na inicialização
  useEffect(() => {
    const savedGoals = storageService.getGoals();
    setGoals(savedGoals);
    setIsLoaded(true);
  }, []);

  // Estatísticas calculadas dinamicamente
  const stats = useMemo(() => {
    return storageService.calculateStats(goals);
  }, [goals]);

  // Contagens para os filtros
  const filterCounts = useMemo(() => {
    let nao_iniciado = 0;
    let em_andamento = 0;
    let concluido = 0;

    for (const g of goals) {
      if (g.status === 'nao_iniciado') nao_iniciado++;
      else if (g.status === 'em_andamento') em_andamento++;
      else if (g.status === 'concluido') concluido++;
    }

    return {
      todos: goals.length,
      nao_iniciado,
      em_andamento,
      concluido,
    };
  }, [goals]);

  // Manipuladores de Ações (CRUD)
  const handleOpenCreateModal = () => {
    setEditingGoal(null);
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (goal: Goal) => {
    setEditingGoal(goal);
    setIsFormModalOpen(true);
  };

  const handleFormSubmit = (data: GoalFormData) => {
    if (editingGoal) {
      const updated = storageService.updateGoal(editingGoal.id, data);
      if (updated) {
        setGoals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
        showToast('Objetivo atualizado com sucesso!');
      }
    } else {
      const created = storageService.addGoal(data);
      setGoals((prev) => [created, ...prev]);
      showToast('Novo objetivo de estudo cadastrado!');
    }
    setIsFormModalOpen(false);
    setEditingGoal(null);
  };

  const handleRequestDelete = (goal: Goal) => {
    setGoalToDelete(goal);
  };

  const handleConfirmDelete = () => {
    if (!goalToDelete) return;
    const success = storageService.deleteGoal(goalToDelete.id);
    if (success) {
      setGoals((prev) => prev.filter((g) => g.id !== goalToDelete.id));
      showToast('Objetivo excluído com sucesso.');
    }
    setGoalToDelete(null);
  };

  const handleToggleComplete = (id: string) => {
    const updated = storageService.toggleComplete(id);
    if (updated) {
      setGoals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
      if (updated.status === 'concluido') {
        showToast('Parabéns! Objetivo marcado como concluído 🎉');
      } else {
        showToast('Objetivo reaberto para estudo ativo.');
      }
    }
  };

  const handleStatusChange = (id: string, newStatus: GoalStatus) => {
    const updated = storageService.updateGoal(id, { status: newStatus });
    if (updated) {
      setGoals((prev) => prev.map((g) => (g.id === updated.id ? updated : g)));
      showToast('Status atualizado.');
    }
  };

  const handleLoadSamples = () => {
    const updated = storageService.loadSampleGoals();
    setGoals(updated);
    showToast('Exemplos de objetivos de estudo carregados!');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setStatusFilter('todos');
  };

  // Filtragem e Ordenação
  const filteredGoals = useMemo(() => {
    let result = [...goals];

    // Busca textual
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (g) =>
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q)
      );
    }

    // Filtro por status
    if (statusFilter !== 'todos') {
      result = result.filter((g) => g.status === statusFilter);
    }

    // Ordenação
    result.sort((a, b) => {
      if (sortOption === 'prazo_asc') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return a.deadline.localeCompare(b.deadline);
      }
      if (sortOption === 'prazo_desc') {
        if (!a.deadline) return 1;
        if (!b.deadline) return -1;
        return b.deadline.localeCompare(a.deadline);
      }
      if (sortOption === 'recentes') {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortOption === 'alfabetica') {
        return a.title.localeCompare(b.title, 'pt-BR');
      }
      return 0;
    });

    return result;
  }, [goals, searchQuery, statusFilter, sortOption]);

  const hasAnyFilterActive = searchQuery.trim().length > 0 || statusFilter !== 'todos';

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        <p className="text-sm">Carregando seus estudos...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800">
      {/* Cabeçalho Superior */}
      <Header
        onOpenCreateModal={handleOpenCreateModal}
        onLoadSamples={handleLoadSamples}
        hasGoals={goals.length > 0}
      />

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Painel de Dicas de Estudo para Iniciantes */}
        <StudyTips />

        {/* Resumo Estatístico dos Objetivos */}
        <StatsOverview stats={stats} />

        {/* Área de Gerenciamento da Lista */}
        <section className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Seus Objetivos de Estudo
              </h2>
              <p className="text-xs text-slate-500">
                {goals.length === 0
                  ? 'Nenhum objetivo cadastrado no momento'
                  : `Exibindo ${filteredGoals.length} de ${goals.length} ${
                      goals.length === 1 ? 'objetivo' : 'objetivos'
                    }`}
              </p>
            </div>

            {goals.length > 0 && (
              <button
                type="button"
                onClick={handleOpenCreateModal}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
              >
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Adicionar Mais Um</span>
              </button>
            )}
          </div>

          {/* Filtros e Barra de Busca (apenas se houver objetivos ou busca ativa) */}
          {(goals.length > 0 || hasAnyFilterActive) && (
            <FilterBar
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              statusFilter={statusFilter}
              onStatusFilterChange={setStatusFilter}
              sortOption={sortOption}
              onSortOptionChange={setSortOption}
              counts={filterCounts}
            />
          )}

          {/* Lista de Cartões de Objetivos ou Estados Vazios */}
          {goals.length === 0 ? (
            <EmptyState
              isFiltered={false}
              onOpenCreate={handleOpenCreateModal}
              onLoadSamples={handleLoadSamples}
            />
          ) : filteredGoals.length === 0 ? (
            <EmptyState
              isFiltered={true}
              onOpenCreate={handleOpenCreateModal}
              onClearFilters={handleClearFilters}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
              {filteredGoals.map((goal) => (
                <GoalCard
                  key={goal.id}
                  goal={goal}
                  onEdit={handleOpenEditModal}
                  onRequestDelete={handleRequestDelete}
                  onToggleComplete={handleToggleComplete}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Rodapé Simples e Acolhedor */}
      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500 space-y-1">
          <p className="font-medium text-slate-700">
            StudyFlow — Seu espaço para aprender no seu próprio ritmo.
          </p>
          <p className="text-slate-400">
            Armazenamento 100% no seu navegador com localStorage · Sem necessidade de login ou backend
          </p>
        </div>
      </footer>

      {/* Modal de Cadastro e Edição */}
      <GoalFormModal
        isOpen={isFormModalOpen}
        onClose={() => {
          setIsFormModalOpen(false);
          setEditingGoal(null);
        }}
        onSubmit={handleFormSubmit}
        initialGoal={editingGoal}
      />

      {/* Modal de Confirmação de Exclusão */}
      <DeleteConfirmModal
        isOpen={Boolean(goalToDelete)}
        goal={goalToDelete}
        onClose={() => setGoalToDelete(null)}
        onConfirm={handleConfirmDelete}
      />

      {/* Notificação Toast Amigável */}
      {toastMessage && (
        <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2.5 px-4 py-3 bg-slate-900 text-white text-xs sm:text-sm font-medium rounded-xl shadow-lg transition-all animate-in fade-in slide-in-from-bottom-2 duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
