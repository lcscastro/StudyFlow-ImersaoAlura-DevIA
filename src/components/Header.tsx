import React from 'react';
import { BookOpenCheck, Plus, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenCreateModal: () => void;
  onLoadSamples: () => void;
  hasGoals: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCreateModal,
  onLoadSamples,
  hasGoals,
}) => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Logo & Nome da Aplicação */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-sm">
              <BookOpenCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-slate-900">
                  StudyFlow
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 hidden sm:inline-block">
                  Iniciantes
                </span>
              </div>
              <p className="text-xs text-slate-500 hidden sm:block">
                Organize o que você quer aprender com clareza e foco
              </p>
            </div>
          </div>

          {/* Ações do Topo */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {!hasGoals && (
              <button
                type="button"
                onClick={onLoadSamples}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                title="Carregar objetivos sugeridos para se inspirar"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Carregar Exemplos</span>
              </button>
            )}

            <button
              type="button"
              onClick={onOpenCreateModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors shadow-sm cursor-pointer whitespace-nowrap"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Novo Objetivo</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
