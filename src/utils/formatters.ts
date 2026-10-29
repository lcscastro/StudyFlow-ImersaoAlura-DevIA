import { GoalCategory, GoalStatus } from '../types/goal';

export function formatDateBR(dateString: string): string {
  if (!dateString) return 'Sem prazo';
  try {
    const [year, month, day] = dateString.split('-').map(Number);
    if (!year || !month || !day) return dateString;
    return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')}/${year}`;
  } catch {
    return dateString;
  }
}

export function formatDeadlineStatus(deadline: string, status: GoalStatus): {
  label: string;
  isOverdue: boolean;
  isSoon: boolean;
  isToday: boolean;
  daysDiff: number;
} {
  if (status === 'concluido') {
    return {
      label: 'Concluído',
      isOverdue: false,
      isSoon: false,
      isToday: false,
      daysDiff: 0,
    };
  }

  if (!deadline) {
    return {
      label: 'Sem prazo definido',
      isOverdue: false,
      isSoon: false,
      isToday: false,
      daysDiff: 0,
    };
  }

  const [year, month, day] = deadline.split('-').map(Number);
  const targetDate = new Date(year, month - 1, day);
  targetDate.setHours(0, 0, 0, 0);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffTime = targetDate.getTime() - today.getTime();
  const daysDiff = Math.round(diffTime / (1000 * 60 * 60 * 24));

  if (daysDiff < 0) {
    const absDays = Math.abs(daysDiff);
    return {
      label: absDays === 1 ? 'Atrasado há 1 dia' : `Atrasado há ${absDays} dias`,
      isOverdue: true,
      isSoon: false,
      isToday: false,
      daysDiff,
    };
  }

  if (daysDiff === 0) {
    return {
      label: 'Vence hoje!',
      isOverdue: false,
      isSoon: true,
      isToday: true,
      daysDiff: 0,
    };
  }

  if (daysDiff === 1) {
    return {
      label: 'Vence amanhã',
      isOverdue: false,
      isSoon: true,
      isToday: false,
      daysDiff: 1,
    };
  }

  if (daysDiff <= 7) {
    return {
      label: `Faltam ${daysDiff} dias`,
      isOverdue: false,
      isSoon: true,
      isToday: false,
      daysDiff,
    };
  }

  return {
    label: `Faltam ${daysDiff} dias`,
    isOverdue: false,
    isSoon: false,
    isToday: false,
    daysDiff,
  };
}

export const STATUS_CONFIG: Record<
  GoalStatus,
  {
    label: string;
    description: string;
    badgeBg: string;
    badgeText: string;
    border: string;
    dotBg: string;
  }
> = {
  nao_iniciado: {
    label: 'Não iniciado',
    description: 'Planejado para começar em breve',
    badgeBg: 'bg-slate-100',
    badgeText: 'text-slate-700',
    border: 'border-slate-200',
    dotBg: 'bg-slate-400',
  },
  em_andamento: {
    label: 'Em andamento',
    description: 'Estudo em progresso ativa',
    badgeBg: 'bg-amber-50',
    badgeText: 'text-amber-800',
    border: 'border-amber-200',
    dotBg: 'bg-amber-500',
  },
  concluido: {
    label: 'Concluído',
    description: 'Objetivo de estudo alcançado!',
    badgeBg: 'bg-emerald-50',
    badgeText: 'text-emerald-800',
    border: 'border-emerald-200',
    dotBg: 'bg-emerald-500',
  },
};

export const CATEGORY_CONFIG: Record<
  GoalCategory,
  {
    label: string;
    iconName: string;
  }
> = {
  geral: { label: 'Geral', iconName: 'BookOpen' },
  programacao: { label: 'Programação & Tech', iconName: 'Code' },
  idiomas: { label: 'Idiomas', iconName: 'Languages' },
  vestibular_concurso: { label: 'Vestibular / Concurso', iconName: 'GraduationCap' },
  faculdade: { label: 'Faculdade / Escola', iconName: 'School' },
  leitura: { label: 'Leitura', iconName: 'BookMarked' },
  habilidades: { label: 'Habilidades & Hábitos', iconName: 'Sparkles' },
};
