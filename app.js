import { addTask, toggleTask, removeTask } from './src/taskManager.js';

// Estado da aplicação na memória
let tasks = [];

const input = document.getElementById('taskInput');
const btn = document.getElementById('addBtn');
const list = document.getElementById('taskList');

// Função para desenhar a lista na tela (Render)
function render() {
    list.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span>${task.title}</span>
            <button onclick="handleToggle(${task.id})">✔</button>
        `;
        list.appendChild(li);
    });
}

// Evento de Adicionar
btn.addEventListener('click', () => {
    try {
        tasks = addTask(tasks, input.value);
        input.value = '';
        render();
    } catch (error) {
        alert(error.message); // Exibe "Título inválido..." que você testou!
    }
});

// Funções globais para os botões da lista
window.handleToggle = (id) => {
    const task = tasks.find(t => t.id === id);
    const updatedTask = toggleTask(task);
    tasks = tasks.map(t => t.id === id ? updatedTask : t);
    render();
};

render();