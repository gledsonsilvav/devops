import { describe, it, expect, beforeEach } from 'vitest';
import * as tm from '../src/taskManager.js';

describe('Gerenciador de Tarefas - Testes Completos', () => {
  
  beforeEach(() => {
    tm.resetId();
  });

  // --- Validação e Criação ---
  describe('createTask & Priority', () => {
    it('deve criar tarefa com prioridade padrão medium', () => {
      const task = tm.createTask('Estudar');
      expect(task.priority).toBe('medium');
    });

    it('deve aceitar prioridade high', () => {
      const task = tm.createTask('Urgente', 'high');
      expect(task.priority).toBe('high');
    });

    it('deve validar prioridades corretamente', () => {
      expect(tm.validatePriority('high')).toBe(true);
      expect(tm.validatePriority('urgente')).toBe(false);
    });
  });

  // --- Adição e Duplicatas ---
  describe('addTask & Duplicates', () => {
    it('deve lançar erro para tarefa duplicada (case-insensitive)', () => {
      const tasks = tm.addTask([], 'Estudar');
      expect(() => tm.addTask(tasks, '  estudar  ')).toThrow('Tarefa duplicada');
    });

    it('deve detectar duplicatas corretamente', () => {
      const tasks = [{ title: 'Trabalhar' }];
      expect(tm.isDuplicate(tasks, 'TRABALHAR')).toBe(true);
      expect(tm.isDuplicate(tasks, 'Correr')).toBe(false);
    });
  });

  // --- Remoção e Alteração ---
  describe('removeTask & toggleTask', () => {
    it('deve remover tarefa por ID e manter imutabilidade', () => {
      const t1 = tm.createTask('T1');
      const t2 = tm.createTask('T2');
      const list = [t1, t2];
      const result = tm.removeTask(list, 1);
      expect(result).toHaveLength(1);
      expect(list).toHaveLength(2);
    });

    it('deve alternar status da tarefa', () => {
      const task = tm.createTask('Teste');
      const updated = tm.toggleTask(task);
      expect(updated.completed).toBe(true);
      expect(task.completed).toBe(false);
    });
  });

  // --- Ordenação e Busca ---
  describe('sortTasks & searchTasks', () => {
    it('deve ordenar colocando pendentes primeiro', () => {
      const t1 = { id: 1, completed: true };
      const t2 = { id: 2, completed: false };
      const sorted = tm.sortTasks([t1, t2]);
      expect(sorted[0].id).toBe(2);
    });

    it('deve buscar tarefas por texto', () => {
      const tasks = [{ title: 'Estudar Vitest' }, { title: 'Comer' }];
      const result = tm.searchTasks(tasks, 'est');
      expect(result).toHaveLength(1);
      expect(result[0].title).toBe('Estudar Vitest');
    });
  });

  // --- Contadores ---
  describe('Contadores', () => {
    it('deve contar corretamente tarefas pendentes e concluídas', () => {
      const tasks = [
        { completed: true },
        { completed: false },
        { completed: false }
      ];
      expect(tm.countTasks(tasks)).toBe(3);
      expect(tm.countCompleted(tasks)).toBe(1);
      expect(tm.countPending(tasks)).toBe(2);
    });
  });
});