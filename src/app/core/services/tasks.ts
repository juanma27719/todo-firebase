import { Injectable, signal } from '@angular/core';
import { Task } from '../models/task.model';
import { StorageService } from './storage';

const TASKS_KEY = 'tasks';

@Injectable({ providedIn: 'root' })
export class TasksService {

  private _tasks = signal<Task[]>([]);
  tasks = this._tasks.asReadonly();

  constructor(private storage: StorageService) {
    this.loadTasks();
  }

  async loadTasks() {
    const tasks = (await this.storage.get<Task[]>(TASKS_KEY)) || [];
    this._tasks.set(tasks);
  }

  async addTask(title: string, categoryId?: string) {
    const task: Task = {
      id: crypto.randomUUID(),
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
}
