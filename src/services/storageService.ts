import { Goal, GoalFormData, GoalStats } from '../types/goal';

const STORAGE_KEY = 'studyflow_goals_v1';

// Exemplos didáticos para estudantes iniciantes
export const SAMPLE_GOALS: Omit<Goal, 'id' | 'createdAt' | 'updatedAt'>[] = [
  {
    title: 'Dominar Lógica de Programação',
    description: 'Compreender estruturas condicionais, laços de repetição e funções através de exercícios diários de 30 minutos.',
    deadline: getFutureDate(14),
    status: 'em_andamento',
    category: 'programacao',
  },
  {
    title: 'Vocabulário Essencial de Inglês',
    description: 'Aprender 10 novas palavras por dia e praticar pronúncia com flashcards e pequenas frases cotidianas.',
    deadline: getFutureDate(30),
    status: 'nao_iniciado',
    category: 'idiomas',
  },
  {
    title: 'Criar Rotina com Técnica Pomodoro',
    description: 'Estudar em blocos de 25 minutos com 5 minutos de pausa, eliminando notificações de redes sociais durante o foco.',
    deadline: getFutureDate(3),
    status: 'concluido',
    category: 'habilidades',
  },
];

function getFutureDate(daysAhead: number): string {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  return d.toISOString().split('T')[0];
}

class StorageService {
  private isStorageAvailable(): boolean {
    try {
      const testKey = '__test_storage__';
      window.localStorage.setItem(testKey, testKey);
      window.localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Obtém todos os objetivos salvos no localStorage
   */
  public getGoals(): Goal[] {
    if (!this.isStorageAvailable()) {
      return [];
    }

    try {
      const data = window.localStorage.getItem(STORAGE_KEY);
      if (!data) {
        return [];
      }
      const parsed = JSON.parse(data);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return [];
    } catch (error) {
      console.error('Erro ao ler objetivos do localStorage:', error);
      return [];
    }
  }

  /**
   * Salva a lista completa de objetivos no localStorage
   */
  public saveGoals(goals: Goal[]): void {
    if (!this.isStorageAvailable()) {
      return;
    }

    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(goals));
    } catch (error) {
      console.error('Erro ao salvar objetivos no localStorage:', error);
    }
  }

  /**
   * Cadastra um novo objetivo
   */
  public addGoal(formData: GoalFormData): Goal {
    const goals = this.getGoals();
    const now = new Date().toISOString();
    
    const newGoal: Goal = {
      id: this.generateId(),
      title: formData.title.trim(),
      description: formData.description.trim(),
      deadline: formData.deadline,
      status: formData.status,
      category: formData.category || 'geral',
      createdAt: now,
      updatedAt: now,
    };

    const updatedGoals = [newGoal, ...goals];
    this.saveGoals(updatedGoals);
    return newGoal;
  }

  /**
   * Atualiza um objetivo existente
   */
  public updateGoal(id: string, updates: Partial<GoalFormData>): Goal | null {
    const goals = this.getGoals();
    const index = goals.findIndex((g) => g.id === id);

    if (index === -1) {
      return null;
    }

    const current = goals[index];
    const updatedGoal: Goal = {
      ...current,
      ...updates,
      title: updates.title !== undefined ? updates.title.trim() : current.title,
      description: updates.description !== undefined ? updates.description.trim() : current.description,
      updatedAt: new Date().toISOString(),
    };

    goals[index] = updatedGoal;
    this.saveGoals(goals);
    return updatedGoal;
  }

  /**
   * Alterna rapidamente o status de conclusão de um objetivo
   */
  public toggleComplete(id: string): Goal | null {
    const goals = this.getGoals();
    const goal = goals.find((g) => g.id === id);
    if (!goal) return null;

    const newStatus = goal.status === 'concluido' ? 'em_andamento' : 'concluido';
    return this.updateGoal(id, { status: newStatus });
  }

  /**
   * Exclui um objetivo após confirmação
   */
  public deleteGoal(id: string): boolean {
    const goals = this.getGoals();
    const filtered = goals.filter((g) => g.id !== id);

    if (filtered.length === goals.length) {
      return false; // Não encontrado
    }

    this.saveGoals(filtered);
    return true;
  }

  /**
   * Carrega dados de exemplo para o estudante iniciante
   */
  public loadSampleGoals(): Goal[] {
    const existing = this.getGoals();
    const now = new Date().toISOString();

    const sampleWithIds: Goal[] = SAMPLE_GOALS.map((sample, idx) => ({
      ...sample,
      id: this.generateId() + `-${idx}`,
      createdAt: now,
      updatedAt: now,
    }));

    const combined = [...existing, ...sampleWithIds];
    this.saveGoals(combined);
    return combined;
  }

  /**
   * Limpa todos os objetivos cadastrados
   */
  public clearAllGoals(): void {
    if (this.isStorageAvailable()) {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }

  /**
   * Calcula estatísticas dos objetivos para apresentação resumida
   */
  public calculateStats(goals: Goal[]): GoalStats {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const sevenDaysLater = new Date(today);
    sevenDaysLater.setDate(today.getDate() + 7);

    let naoIniciados = 0;
    let emAndamento = 0;
    let concluidos = 0;
    let atrasados = 0;
    let proximos7Dias = 0;

    for (const goal of goals) {
      if (goal.status === 'concluido') {
        concluidos++;
        continue;
      }

      if (goal.status === 'nao_iniciado') {
        naoIniciados++;
      } else if (goal.status === 'em_andamento') {
        emAndamento++;
      }

      // Verificação de prazo para objetivos ainda não concluídos
      if (goal.deadline) {
        const [year, month, day] = goal.deadline.split('-').map(Number);
        const deadlineDate = new Date(year, month - 1, day);
        deadlineDate.setHours(0, 0, 0, 0);

        if (deadlineDate < today) {
          atrasados++;
        } else if (deadlineDate <= sevenDaysLater) {
          proximos7Dias++;
        }
      }
    }

    const total = goals.length;
    const taxaConclusao = total > 0 ? Math.round((concluidos / total) * 100) : 0;

    return {
      total,
      naoIniciados,
      emAndamento,
      concluidos,
      atrasados,
      proximos7Dias,
      taxaConclusao,
    };
  }

  private generateId(): string {
    return 'goal_' + Date.now().toString(36) + '_' + Math.random().toString(36).substring(2, 7);
  }
}

export const storageService = new StorageService();
