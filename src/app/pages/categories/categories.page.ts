import { Component, signal, ViewChild } from '@angular/core';
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
  ModalController,
  IonIcon,
  IonModal
} from '@ionic/angular/standalone';

import { CategoriesService } from '../../core/services/categories';
import { addIcons } from 'ionicons';
import { createOutline, trash } from 'ionicons/icons';
import { CategoryModel } from 'src/app/core/models/category.model';

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
    IonIcon,
    IonModal
  ]
})
export class CategoriesPage {

  @ViewChild(IonModal) modal!: IonModal;

  newCategory = signal('');
  categories = this.categoriesService.categories;

  // edit category
   editingCategoryId = signal<string | null>(null);
   newCategoryEdit = signal('');

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

  editCategory(category: CategoryModel) {
    this.editingCategoryId.set(category.id);
    this.newCategoryEdit.set(category.name);

    this.modal.present();
  }

  dismiss() {
    this.modalController.dismiss();
  }

  trackById(_: number, c: any) {
    return c.id;
  }

  // actions to edit category
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  confirm() {
    const id = this.editingCategoryId();
    if (!id) return;

    this.categoriesService.updateCategory(id, {
      name: this.newCategoryEdit(),
      id: this.newCategoryEdit()
    });

    this.modal.dismiss();
  }
}
