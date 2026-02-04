import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonItem,
  IonButton,
  IonList,
  IonLabel,
  IonInput,
  IonButtons,
  ModalController, IonIcon
} from '@ionic/angular/standalone';

import { CategoriesService } from '../../core/services/categories';
import { addIcons } from 'ionicons';
import { createOutline, trash } from 'ionicons/icons';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonButtons,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonList,
    IonLabel,
    IonIcon
  ]
})
export class CategoriesPage {


  newCategory = signal('');

  categories = this.categoriesService.categories;

  constructor(
    private categoriesService: CategoriesService,
    private modalController: ModalController
  ) {
    addIcons({ createOutline, trash });
  }

  addCategory() {
    if (!this.newCategory().trim()) return;
    this.categoriesService.addCategory(this.newCategory());
    this.newCategory.set('');
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id);
  }

  editCategory(id: string) {
    // this.categoriesService.deleteCategory(id);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  trackById(_: number, c: any) {
    return c.id;
  }
}
