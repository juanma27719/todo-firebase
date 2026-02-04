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
  ModalController
} from '@ionic/angular/standalone';

import { CategoriesService } from '../../core/services/categories';

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
    IonLabel
  ]
})
export class CategoriesPage {


  newCategory = signal('');

  categories = this.categoriesService.categories;

  constructor(
    private categoriesService: CategoriesService,
    private modalController: ModalController
  ) {}

  addCategory() {
    if (!this.newCategory().trim()) return;
    this.categoriesService.addCategory(this.newCategory());
    this.newCategory.set('');
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id);
  }

  dismiss() {
    this.modalController.dismiss();
  }

  trackById(_: number, c: any) {
    return c.id;
  }
}
