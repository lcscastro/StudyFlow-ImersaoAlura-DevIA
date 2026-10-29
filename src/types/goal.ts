export type GoalStatus = 'nao_iniciado' | 'em_andamento' | 'concluido';

export type GoalCategory = 
  | 'geral'
  | 'programacao'
  | 'idiomas'
  | 'vestibular_concurso'
  | 'faculdade'
  | 'leitura'
  | 'habilidades';

export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: string; // Formato YYYY-MM-DD
  status: GoalStatus;
  category?: GoalCategory;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export type GoalFormData = {
  title: string;
  description: string;
  deadline: string;
  status: GoalStatus;
  category?: GoalCategory;
};

export type FilterStatus = 'todos' | GoalStatus;

export type SortOption = 'prazo_asc' | 'prazo_desc' | 'recentes' | 'alfabetica';

export interface GoalStats {
  total: number;
  naoIniciados: number;
  emAndamento: number;
  concluidos: number;
  atrasados: number;
  proximos7Dias: number;
  taxaConclusao: number; // Porcentagem 0 a 100
}
