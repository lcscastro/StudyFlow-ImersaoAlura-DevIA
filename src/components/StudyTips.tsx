import React, { useState } from 'react';
import { Lightbulb, ChevronRight, X, Sparkles } from 'lucide-react';

const TIPS = [
  {
    title: 'Quebre metas grandes em partes menores',
    text: 'Em vez de "Aprender Programação", defina "Fazer 3 exercícios de laços for hoje". Metas pequenas diminuem o medo de começar!',
  },
  {
    title: 'Adote a Técnica Pomodoro',
    text: 'Estude durante 25 minutos com foco total e descanse 5 minutos. Isso evita o cansaço mental e melhora a retenção.',
  },
  {
    title: 'Consistência vence a intensidade',
    text: 'Estudar 30 minutos todos os dias é muito mais eficaz do que estudar 6 horas em um único dia do fim de semana.',
  },
];

export const StudyTips: React.FC = () => {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const currentTip = TIPS[currentTipIndex];

  const handleNextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % TIPS.length);
  };

  return (
    <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-indigo-500/10 border border-amber-200/80 rounded-2xl p-4 sm:p-5 relative">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
            <Lightbulb className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
                Dica para Iniciantes
              </span>
              <span className="text-slate-300" aria-hidden="true">·</span>
              <span className="text-xs text-slate-500">
                {currentTipIndex + 1} de {TIPS.length}
              </span>
            </div>
            <h4 className="text-sm font-bold text-slate-900 mt-0.5">
              {currentTip.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              {currentTip.text}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={handleNextTip}
            className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-amber-100/60 rounded-lg transition-colors cursor-pointer text-xs font-semibold inline-flex items-center gap-1"
            title="Próxima dica"
          >
            <span className="hidden sm:inline">Outra dica</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => setIsDismissed(true)}
            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-200/50 rounded-lg transition-colors cursor-pointer"
            title="Fechar dicas"
            aria-label="Fechar dicas"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
