import React from 'react';
import { Search, X, ArrowUpDown, Filter } from 'lucide-react';
import { FilterStatus, SortOption } from '../types/goal';

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: FilterStatus;
  onStatusFilterChange: (status: FilterStatus) => void;
  sortOption: SortOption;
  onSortOptionChange: (sort: SortOption) => void;
  counts: {
    todos: number;
    nao_iniciado: number;
    em_andamento: number;
    concluido: number;
  };
}

export const FilterBar: React.FC<FilterBarProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  sortOption,
  onSortOptionChange,
  counts,
}) => {
  return (
    <div className="space-y-3">
      {/* Barra de Busca e Ordenação */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        {/* Campo de Busca */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por título ou descrição..."
            className="w-full pl-9 pr-9 py-2 text-sm bg-white border border-slate-200 rounded-xl placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 rounded cursor-pointer"
              title="Limpar busca"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Seletor de Ordenação */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="sort-select" className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span>Ordenar:</span>
          </label>
          <select
            id="sort-select"
            value={sortOption}
            onChange={(e) => onSortOptionChange(e.target.value as SortOption)}
            className="text-xs sm:text-sm bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors cursor-pointer"
          >
            <option value="prazo_asc">Prazo (mais próximo primeiro)</option>
            <option value="prazo_desc">Prazo (mais distante primeiro)</option>
            <option value="recentes">Mais recentes cadastrados</option>
            <option value="alfabetica">Título (A-Z)</option>
          </select>
        </div>
      </div>

      {/* Abas / Segmentos de Filtro de Status */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider mr-1 hidden md:inline-flex items-center gap-1">
          <Filter className="w-3 h-3" />
          Filtro:
        </span>

        <button
          type="button"
          onClick={() => onStatusFilterChange('todos')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            statusFilter === 'todos'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>Todos</span>
          <span className={`text-[11px] px-1.5 py-0.2 rounded-full tabular-nums ${
            statusFilter === 'todos' ? 'bg-slate-700 text-slate-200' : 'bg-slate-100 text-slate-600'
          }`}>
            {counts.todos}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onStatusFilterChange('nao_iniciado')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            statusFilter === 'nao_iniciado'
              ? 'bg-slate-700 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>Não iniciados</span>
          <span className={`text-[11px] px-1.5 py-0.2 rounded-full tabular-nums ${
            statusFilter === 'nao_iniciado' ? 'bg-slate-600 text-slate-200' : 'bg-slate-100 text-slate-600'
          }`}>
            {counts.nao_iniciado}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onStatusFilterChange('em_andamento')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            statusFilter === 'em_andamento'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>Em andamento</span>
          <span className={`text-[11px] px-1.5 py-0.2 rounded-full tabular-nums ${
            statusFilter === 'em_andamento' ? 'bg-amber-700 text-amber-100' : 'bg-amber-50 text-amber-700'
          }`}>
            {counts.em_andamento}
          </span>
        </button>

        <button
          type="button"
          onClick={() => onStatusFilterChange('concluido')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
            statusFilter === 'concluido'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <span>Concluídos</span>
          <span className={`text-[11px] px-1.5 py-0.2 rounded-full tabular-nums ${
            statusFilter === 'concluido' ? 'bg-emerald-700 text-emerald-100' : 'bg-emerald-50 text-emerald-700'
          }`}>
            {counts.concluido}
          </span>
        </button>
      </div>
    </div>
  );
};
