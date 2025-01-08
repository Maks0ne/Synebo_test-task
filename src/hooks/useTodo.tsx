import { useEffect, useState } from 'react';

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export type Filter = 'all' | 'active' | 'completed';

const useTodo = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const saveTasks = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const addTask = (text: string) => {
    if (text.trim()) {
      const newTask: Task = { id: Date.now(), text, completed: false };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      saveTasks(updatedTasks);
    }
  };

  const toggleTaskCompletion = (taskId: number) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task,
    );
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const clearCompleted = () => {
    const updatedTasks = tasks.filter((task) => !task.completed);
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return { tasks, addTask, toggleTaskCompletion, clearCompleted, filteredTasks, filter, setFilter };
};

export default useTodo;
