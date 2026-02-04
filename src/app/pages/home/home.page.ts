import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { combineLatest, map } from 'rxjs';

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
  IonSegmentButton, IonButtons, IonModal, ModalController } from '@ionic/angular/standalone';


import { TasksService } from '../../core/services/tasks';
import { CategoriesService } from '../../core/services/categories';
import { CategoriesPage } from '../categories/categories.page';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonSegmentButton, IonLabel, IonList, IonButton, IonCheckbox,
    IonItem, IonContent, IonHeader, IonTitle, IonToolbar,
    CommonModule, FormsModule, IonSelectOption, IonSelect, IonInput, IonSegment, IonButtons]
})
export class HomePage {

  newTask = '';
  tasks$ = this.tasksService.getTasks();

  categories$ = this.categoriesService.getCategories();
  selectedCategory?: string;
  filterCategory?: string;

  constructor(
    private tasksService: TasksService,
    private categoriesService: CategoriesService,
    private modalController: ModalController
  ) { }

  addTask() {
    if (!this.newTask.trim()) return;
    this.tasksService.addTask(this.newTask, this.selectedCategory);
    this.newTask = '';
    this.selectedCategory = undefined;
  }

  trackById(_: number, task: any) {
    return task.id;
  }

  toggleTask(id: string) {
    this.tasksService.toggleTask(id);
  }

  deleteTask(id: string) {
    this.tasksService.deleteTask(id);
  }

  async openModalCategories(){
    console.log("open modal")
    const modal = await this.modalController.create({
      component: CategoriesPage
    });
    modal.present();
  }
  filteredTasks$ = combineLatest([
    this.tasksService.getTasks(),
    this.categoriesService.getCategories()
  ]).pipe(
    map(([tasks]) => {
      if (!this.filterCategory) return tasks;
      return tasks.filter(t => t.categoryId === this.filterCategory);
    })
  );


}
