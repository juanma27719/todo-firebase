import { Injectable, signal } from '@angular/core';
import { nanoid } from 'nanoid';

import { TaskModel } from '../../models/task.model';
import { StorageService } from '../storage/storage-service';

const TASKS_KEY = 'tasks';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private _tasks = signal<TaskModel[]>([]);
  tasks = this._tasks.asReadonly();

  constructor(private storage: StorageService) {
    this.loadTasks();
  }

  async loadTasks() {
    const tasks = (await this.storage.get<TaskModel[]>(TASKS_KEY)) || [];
    this._tasks.set(tasks);
  }

  async addTask(title: string, categoryId?: string) {
    const task: TaskModel = {
      id: nanoid(),
      title,
      completed: false,
      categoryId,
      createdAt: Date.now()
    };

    const updated = [...this._tasks(), task];
    this._tasks.set(updated);
    await this.storage.set(TASKS_KEY, updated);
  }

  async toggleTask(id: string) {
    const updated = this._tasks().map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this._tasks.set(updated);
    await this.storage.set(TASKS_KEY, updated);
  }

  async deleteTask(id: string) {
    const updated = this._tasks().filter(t => t.id !== id);
    this._tasks.set(updated);
    await this.storage.set(TASKS_KEY, updated);
  }

  async updateTask(id: string, data: Partial<TaskModel>) {
    const updated = this.tasks().map(t =>
      t.id === id ? { ...t, ...data } : t
    );
    this._tasks.set(updated);
    await this.storage.set(TASKS_KEY, updated);
  }

  async updateTasksCategory(oldCategoryId: string, newCategoryId: string) {
    const updated = this._tasks().map(t =>
      t.categoryId === oldCategoryId
        ? { ...t, categoryId: newCategoryId }
        : t
    );

    this._tasks.set(updated);
    await this.storage.set(TASKS_KEY, updated);
  }

  async deleteTasksByCategory(categoryId: string) {
    const updated = this._tasks().filter(
      t => t.categoryId !== categoryId
    );

    this._tasks.set(updated);
    await this.storage.set(TASKS_KEY, updated);
  }

}
