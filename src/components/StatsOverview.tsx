import React from 'react';
import { Target, Clock, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { GoalStats } from '../types/goal';

interface StatsOverviewProps {
  stats: GoalStats;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span>Visão Geral dos Seus Estudos</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
              {stats.total === 1 ? '1 objetivo' : `${stats.total} objetivos no total`}
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Acompanhe seu ritmo de aprendizado e mantenha a consistência diária.
          </p>
        </div>

        {/* Barra de Progresso de Conclusão */}
        <div className="min-w-[200px] sm:min-w-[240px]">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-slate-600 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Taxa de Conclusão
            </span>
            <span className="text-indigo-600 font-bold">{stats.taxaConclusao}%</span>
          </div>
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 rounded-full transition-all duration-500"
              style={{ width: `${stats.taxaConclusao}%` }}
              role="progressbar"
              aria-valuenow={stats.taxaConclusao}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>

      {/* Grid com os Cartões de Estatísticas */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-5">
        {/* Total */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-slate-50 border border-slate-100">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-xs font-medium">Total Cadastrado</span>
            <Target className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-2xl font-bold text-slate-900 tabular-nums">
            {stats.total}
          </div>
          <span className="text-[11px] text-slate-500">
            {stats.total === 0 ? 'Nenhum item' : 'Metas registradas'}
          </span>
        </div>

        {/* Em Andamento */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-amber-50/60 border border-amber-100/80">
          <div className="flex items-center justify-between text-amber-700 mb-1">
            <span className="text-xs font-medium">Em Andamento</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl font-bold text-amber-900 tabular-nums">
            {stats.emAndamento}
          </div>
          <span className="text-[11px] text-amber-700/80">
            {stats.emAndamento === 1 ? 'Em estudo ativo' : 'Em estudo ativo'}
          </span>
        </div>

        {/* Concluídos */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-emerald-50/60 border border-emerald-100/80">
          <div className="flex items-center justify-between text-emerald-700 mb-1">
            <span className="text-xs font-medium">Concluídos</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-2xl font-bold text-emerald-900 tabular-nums">
            {stats.concluidos}
          </div>
          <span className="text-[11px] text-emerald-700/80">
            {stats.concluidos === 1 ? 'Meta alcançada 🎉' : 'Metas alcançadas 🎉'}
          </span>
        </div>

        {/* Pendentes / Atrasados */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-indigo-50/50 border border-indigo-100/80">
          <div className="flex items-center justify-between text-indigo-700 mb-1">
            <span className="text-xs font-medium">Não Iniciados</span>
            {stats.atrasados > 0 ? (
              <AlertTriangle className="w-4 h-4 text-rose-500" />
            ) : (
              <Clock className="w-4 h-4 text-indigo-400" />
            )}
          </div>
          <div className="text-2xl font-bold text-indigo-950 tabular-nums">
            {stats.naoIniciados}
          </div>
          <span className="text-[11px] text-indigo-700/80">
            {stats.atrasados > 0 ? (
              <span className="text-rose-600 font-medium">
                {stats.atrasados === 1 ? '1 com prazo vencido' : `${stats.atrasados} com prazo vencido`}
              </span>
            ) : (
              'Próximos passos'
            )}
          </span>
        </div>
      </div>
    </section>
  );
};
