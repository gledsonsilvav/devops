// src/taskManager.js

let _nextId = 1;

export function resetId() {
  _nextId = 1;
}

// --- Exercício 4: Validação de Prioridade ---
export function validatePriority(priority) {
  const validPriorities = ['low', 'medium', 'high'];
  return validPriorities.includes(priority);
}

export function validateTitle(title) {
  if (typeof title !== 'string') return false;
  return title.trim().length >= 3;
}

// --- Exercício 5: Verificar Duplicadas ---
export function isDuplicate(tasks, title) {
  if (!title || typeof title !== 'string') return false;
  const cleanTitle = title.trim().toLowerCase();
  return tasks.some(t => t.title.toLowerCase() === cleanTitle);
}

// --- Criação e Adição ---
export function createTask(title, priority = 'medium') {
  return {
    id: _nextId++,
    title: title.trim(),
    completed: false,
    priority: validatePriority(priority) ? priority : 'medium'
  };
}

export function addTask(tasks, title, priority = 'medium') {
  if (!validateTitle(title)) throw new Error('Título inválido');
  if (isDuplicate(tasks, title)) throw new Error('Tarefa duplicada');
  
  const newTask = createTask(title, priority);
  return [...tasks, newTask];
}

export function toggleTask(task) {
  return { ...task, completed: !task.completed };
}

export function removeTask(tasks, taskId) {
  return tasks.filter((task) => task.id !== taskId);
}

// --- Filtros e Buscas ---
export function filterTasks(tasks, status) {
  switch (status) {
    case 'completed': return tasks.filter(t => t.completed);
    case 'pending': return tasks.filter(t => !t.completed);
    default: return [...tasks];
  }
}

// --- Exercício 7: Busca por texto ---
export function searchTasks(tasks, query) {
  if (!query) return [...tasks];
  const cleanQuery = query.toLowerCase();
  return tasks.filter(t => t.title.toLowerCase().includes(cleanQuery));
}

// --- Exercício 6: Ordenar tarefas (Pendentes primeiro) ---
export function sortTasks(tasks) {
  return [...tasks].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });
}

// --- Contagens ---
export function countTasks(tasks) { return tasks.length; }
export function countCompleted(tasks) { return tasks.filter(t => t.completed).length; }
export function countPending(tasks) { return tasks.filter(t => !t.completed).length; }