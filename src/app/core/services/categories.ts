import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category } from '../models/category.model';
import { StorageService } from './storage';

const CATEGORIES_KEY = 'categories';

@Injectable({ providedIn: 'root' })
export class CategoriesService {

  private categories$ = new BehaviorSubject<Category[]>([]);
  private storage = inject(StorageService);

  constructor() {
    this.loadCategories();
  }

  async loadCategories() {
  const stored = await this.storage.get<Category[]>(CATEGORIES_KEY);

  if (stored && stored.length > 0) {
    this.categories$.next(stored);
  } else {
    await this.storage.set(CATEGORIES_KEY, this.categories$.value);
  }
}


  getCategories() {
    return this.categories$.asObservable();
  }

  async addCategory(name: string) {
    console.log('ADD CATEGORY:', name);
    const category: Category = {
      id: name,
      name
    };

    const updated = [...this.categories$.value, category];
    await this.storage.set('categories', updated);
    this.categories$.next(updated);
  }


  async deleteCategory(id: string) {
    const updated = this.categories$.value.filter(c => c.id !== id);
    this.categories$.next(updated);
    await this.storage.set(CATEGORIES_KEY, updated);
  }
}
