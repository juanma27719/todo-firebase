import { Injectable, signal } from '@angular/core';
import { Category } from '../models/category.model';
import { StorageService } from './storage';

const CATEGORIES_KEY = 'categories';

@Injectable({ providedIn: 'root' })
export class CategoriesService {

  private _categories = signal<Category[]>([]);
  categories = this._categories.asReadonly();

  constructor(private storage: StorageService) {
    this.loadCategories();
  }

  async loadCategories() {
    const categories =
      (await this.storage.get<Category[]>(CATEGORIES_KEY)) || [];
    this._categories.set(categories);
  }

  async addCategory(name: string) {
    const category: Category = {
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
}
