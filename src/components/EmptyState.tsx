import React from 'react';
import { BookOpen, Sparkles, Plus, SearchX } from 'lucide-react';

interface EmptyStateProps {
  isFiltered?: boolean;
  onOpenCreate: () => void;
  onLoadSamples?: () => void;
  onClearFilters?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isFiltered = false,
  onOpenCreate,
  onLoadSamples,
  onClearFilters,
}) => {
  if (isFiltered) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-8 sm:p-12 text-center max-w-xl mx-auto my-6">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-500 mx-auto flex items-center justify-center mb-4">
          <SearchX className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 mb-1">
          Nenhum objetivo encontrado
        </h3>
        <p className="text-sm text-slate-500 mb-5 max-w-sm mx-auto">
          Não encontramos nenhum objetivo com os termos de busca ou filtros selecionados.
        </p>
        <div className="flex items-center justify-center gap-3">
          {onClearFilters && (
            <button
              type="button"
              onClick={onClearFilters}
              className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              Limpar Filtros
            </button>
          )}
          <button
            type="button"
            onClick={onOpenCreate}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors shadow-xs cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Criar Novo Objetivo</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-dashed border-indigo-200 p-8 sm:p-12 text-center max-w-2xl mx-auto my-6">
      <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-600 mx-auto flex items-center justify-center mb-4 shadow-xs">
        <BookOpen className="w-7 h-7" />
      </div>

      <h3 className="text-lg font-bold text-slate-900 mb-2">
        Comece sua jornada de aprendizado!
      </h3>
      <p className="text-sm text-slate-600 mb-6 max-w-md mx-auto leading-relaxed">
        Você ainda não cadastrou nenhum objetivo de estudo. Organizar suas metas com prazos claros é a melhor forma de manter o foco e aprender de verdade.
      </p>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <button
          type="button"
          onClick={onOpenCreate}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-xl transition-colors shadow-xs cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Cadastrar Meu Primeiro Objetivo</span>
        </button>

        {onLoadSamples && (
          <button
            type="button"
            onClick={onLoadSamples}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Carregar Metas de Exemplo</span>
          </button>
        )}
      </div>

      <div className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400">
        💡 Seus dados ficam salvos de forma segura no seu próprio navegador através do localStorage.
      </div>
    </div>
  );
};
