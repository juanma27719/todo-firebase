import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonCheckbox,
  IonButton,
  IonList,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonSegment,
  IonSegmentButton,
  IonButtons,
  ModalController
} from '@ionic/angular/standalone';

import { TasksService } from '../../core/services/tasks';
import { CategoriesService } from '../../core/services/categories';
import { CategoriesPage } from '../categories/categories.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonItem,
    IonCheckbox,
    IonButton,
    IonList,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonSegment,
    IonSegmentButton,
    IonButtons
  ]
})
export class HomePage {

  newTask = signal('');
  selectedCategory = signal<string | undefined>(undefined);
  filterCategory = signal<string | undefined>(undefined);

  tasks = this.tasksService.tasks;
  categories = this.categoriesService.categories;

  filteredTasks = computed(() => {
    const filter = this.filterCategory();
    if (!filter) return this.tasks();
    return this.tasks().filter(t => t.categoryId === filter);
  });

  constructor(
    private tasksService: TasksService,
    private categoriesService: CategoriesService,
    private modalController: ModalController
  ) { }

  addTask() {
    if (!this.newTask().trim()) return;

    this.tasksService.addTask(
      this.newTask(),
      this.selectedCategory()
    );

    this.newTask.set('');
    this.selectedCategory.set(undefined);
  }

  toggleTask(id: string) {
    this.tasksService.toggleTask(id);
  }

  deleteTask(id: string) {
    this.tasksService.deleteTask(id);
  }

  async openModalCategories() {
    const modal = await this.modalController.create({
      component: CategoriesPage
    });
    await modal.present();
  }

  trackById(_: number, task: any) {
    return task.id;
  }

  onFilterChange(value: string | number | null | undefined) {
    if (typeof value === 'string' && value !== '') {
      this.filterCategory.set(value);
    } else {
      this.filterCategory.set(undefined);
    }
  }

}
