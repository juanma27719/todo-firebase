import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../models/task.model';
import { StorageService } from './storage';

const TASKS_KEY = 'tasks';

@Injectable({ providedIn: 'root' })

export class TasksService {
  private tasks$ = new BehaviorSubject<Task[]>([]);
  private storage = inject(StorageService);

  constructor() {
    this.loadTasks();
  }

  async loadTasks() {
    const tasks = (await this.storage.get<Task[]>(TASKS_KEY)) || [];
    this.tasks$.next(tasks);
  }

  getTasks() {
    return this.tasks$.asObservable();
  }

  async addTask(title: string, categoryId?: string) {
    const task: Task = {
      id: crypto.randomUUID(),
      title,
      completed: false,
      categoryId,
      createdAt: Date.now()
    };

    const updated = [...this.tasks$.value, task];
    this.tasks$.next(updated);
    await this.storage.set(TASKS_KEY, updated);
  }

  async toggleTask(id: string) {
    const updated = this.tasks$.value.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    );
    this.tasks$.next(updated);
    await this.storage.set(TASKS_KEY, updated);
  }

  async deleteTask(id: string) {
    const updated = this.tasks$.value.filter(t => t.id !== id);
    this.tasks$.next(updated);
    await this.storage.set(TASKS_KEY, updated);
  }
}
