import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { FC, useState } from 'react';

import { SortableItem } from '../../../hooks/useSortableItem';
import useTodo from '../../../hooks/useTodo';
import TaskCard from '../ui/TaskCard';
import styles from './todo.module.scss';

const Todo: FC = () => {
  const {
    tasks,
    setTasks,
    saveTasks,
    addTask,
    toggleTaskCompletion,
    clearCompleted,
    filteredTasks,
    filter,
    setFilter,
  } = useTodo();
  const [newTaskText, setNewTaskText] = useState<string>('');

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 10 } }));

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask(newTaskText);
      setNewTaskText('');
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task.id === active.id);
      const newIndex = tasks.findIndex((task) => task.id === over.id);

      const reorderedTasks = Array.from(tasks);
      const [removed] = reorderedTasks.splice(oldIndex, 1);
      reorderedTasks.splice(newIndex, 0, removed);

      setTasks(reorderedTasks);
      saveTasks(reorderedTasks);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>T O D O</h1>
      <div className={styles.newTask}>
        <div className={styles.disabledCheckbox} />
        <input
          type="text"
          placeholder="Create a new todo..."
          className={styles.inputField}
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.taskWrapper}>
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          <SortableContext items={filteredTasks} strategy={verticalListSortingStrategy}>
            <div className={styles.taskContainer}>
              {filteredTasks.map((task) => (
                <SortableItem key={task.id} id={task.id}>
                  <TaskCard task={task} toggleCompletion={() => toggleTaskCompletion(task.id)} />
                </SortableItem>
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <nav className={styles.taskHandler}>
          {tasks.filter((task) => task.completed).length} items left
          <section>
            <button
              onClick={() => setFilter('all')}
              className={filter === 'all' ? styles.active : ''}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={filter === 'active' ? styles.active : ''}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={filter === 'completed' ? styles.active : ''}
            >
              Completed
            </button>
          </section>
          <button onClick={clearCompleted}>Clear Completed</button>
        </nav>
      </div>

      <span className={styles.dnd}>Drag and drop to reorder list</span>
    </div>
  );
};

export default Todo;
