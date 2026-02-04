import { Component, computed, signal, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { addIcons } from 'ionicons';
import { createOutline, trash, duplicateOutline } from 'ionicons/icons';

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
  ModalController,
  ToastController,
  AlertController,
  IonIcon,
  IonModal
} from '@ionic/angular/standalone';

import { TasksService } from '../../core/services/tasks/tasks-service';
import { CategoriesService } from '../../core/services/categories/categories-service';
import { CategoriesPage } from '../categories/categories.page';
import { TaskModel } from '../../core/models/task.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonIcon,
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
    IonButtons, IonModal]
})
export class HomePage {

  @ViewChild(IonModal) modal!: IonModal;

  newTask = signal('');
  selectedCategory = signal<string | undefined>(undefined);
  filterCategory = signal<string | undefined>(undefined);

  editingTaskId = signal<string | null>(null);
  selectedCategoryEdit = signal<string | undefined>(undefined);
  newTaskEdit = signal('');

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
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({ createOutline, trash, duplicateOutline });
  }

  addTask() {
    if (!this.newTask().trim()) return;

    this.tasksService.addTask(
      this.newTask(),
      this.selectedCategory()
    );

    this.presentToast(`Task create: ${this.newTask()}`, 2000, 'bottom');

    this.newTask.set('');
    this.selectedCategory.set(undefined);

  }

  toggleTask(id: string) {
    this.tasksService.toggleTask(id);
  }

  async confirmDeleteCategory(id: string, name: string) {
    const alert = await this.alertController.create({
      header: 'Delete task',
      message: `Are you sure you want to delete ${name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Delete',
          role: 'destructive',
          handler: async () => {
            this.deleteTask(id);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteTask(id: string) {
    this.tasksService.deleteTask(id);
    this.presentToast(`Task delete`, 2000, 'bottom');
  }

  editTask(task: TaskModel) {
    this.editingTaskId.set(task.id);
    this.newTaskEdit.set(task.title);
    this.selectedCategoryEdit.set(task.categoryId);

    this.modal.present();
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

  async presentToast(message: string, duration: number, position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
    });

    await toast.present();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    const id = this.editingTaskId();
    if (!id) return;

    this.tasksService.updateTask(id, {
      title: this.newTaskEdit(),
      categoryId: this.selectedCategoryEdit()
    });

    this.presentToast(`Task update: ${this.newTaskEdit()}`, 2000, 'bottom');
    this.modal.dismiss();
  }


}
