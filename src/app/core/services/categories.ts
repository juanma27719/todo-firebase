import { Injectable, signal } from '@angular/core';
import { CategoryModel } from '../models/category.model';
import { StorageService } from './storage';

const CATEGORIES_KEY = 'categories';

@Injectable({ providedIn: 'root' })
export class CategoriesService {

  private _categories = signal<CategoryModel[]>([]);
  categories = this._categories.asReadonly();

  constructor(private storage: StorageService) {
    this.loadCategories();
  }

  async loadCategories() {
    const categories =
      (await this.storage.get<CategoryModel[]>(CATEGORIES_KEY)) || [];
    this._categories.set(categories);
  }

  async addCategory(name: string) {
    const category: CategoryModel = {
      id: name,
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
  }

  async updateCategory(id: string, data: Partial<CategoryModel>) {
    const updated = this.categories().map(t =>
      t.id === id ? { ...t, ...data } : t
    );
    this._categories.set(updated);
    await this.storage.set(CATEGORIES_KEY, updated);
  }
}
