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
  ToastController,
  AlertController,
  IonIcon,
  IonModal
} from '@ionic/angular/standalone';

import { addIcons } from 'ionicons';
import { createOutline, trash } from 'ionicons/icons';
import { CategoryModel } from '../../core/models/category.model';
import { CategoriesService } from '../../core/services/categories/categories-service';

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

  editingCategoryId = signal<string | null>(null);
  newCategoryEdit = signal('');

  constructor(
    private categoriesService: CategoriesService,
    private modalController: ModalController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    addIcons({ createOutline, trash });
  }

  addCategory() {
    if (!this.newCategory().trim()) return;
    this.categoriesService.addCategory(this.newCategory());
    this.presentToast(`Category create: ${this.newCategory()}`, 2000, 'bottom');
    this.newCategory.set('');
  }

  async confirmDeleteCategory(id: string, name: string) {
    const alert = await this.alertController.create({
      header: 'Delete category',
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
            this.deleteCategory(id);
          }
        }
      ]
    });

    await alert.present();
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id);
    this.presentToast(`Category delete`, 2000, 'bottom');
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
    const id = this.editingCategoryId();
    if (!id) return;

    this.categoriesService.updateCategory(id, {
      name: this.newCategoryEdit(),
      id: this.newCategoryEdit()
    });

    this.presentToast(`Category update: ${this.newCategoryEdit()}`, 2000, 'bottom');
    this.modal.dismiss();
  }
}
