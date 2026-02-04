import { Injectable, signal } from '@angular/core';
import { nanoid } from 'nanoid';

import { CategoryModel } from '../../models/category.model';
import { StorageService } from '../storage/storage-service';
import { TasksService } from '../tasks/tasks-service';

const CATEGORIES_KEY = 'categories';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {

  private _categories = signal<CategoryModel[]>([]);
  categories = this._categories.asReadonly();

  constructor(private storage: StorageService, private tasksService: TasksService) {
    this.loadCategories();
  }

  async loadCategories() {
    const categories =
      (await this.storage.get<CategoryModel[]>(CATEGORIES_KEY)) || [];
    this._categories.set(categories);
  }

  async addCategory(name: string) {
    const category: CategoryModel = {
      id: nanoid(),
      name
    };

    const updated = [...this._categories(), category];
    this._categories.set(updated);
    await this.storage.set(CATEGORIES_KEY, updated);
  }

  async deleteCategory(id: string) {
    const updated = this._categories().filter(c => c.id !== id);
    this._categories.set(updated);
    await this.storage.set(CATEGORIES_KEY, updated);
    await this.tasksService.deleteTasksByCategory(id);
  }


  async updateCategory(id: string, data: Partial<CategoryModel>) {
    const updated = this.categories().map(c =>
      c.id === id ? { ...c, ...data } : c
    );

    this._categories.set(updated);
    await this.storage.set(CATEGORIES_KEY, updated);

    if (data.id && data.id !== id) {
      await this.tasksService.updateTasksCategory(id, data.id);
    }
  }


}
