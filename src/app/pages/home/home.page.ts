import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonCheckbox, IonButton, IonList, IonLabel } from '@ionic/angular/standalone';
import { TasksService } from '../../core/services/tasks';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonLabel, IonList, IonButton, IonCheckbox, IonItem, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HomePage {

  public tasksService = inject(TasksService);
  tasks$ = this.tasksService.getTasks();
  newTask = '';

  addTask() {
    if (!this.newTask.trim()) return;
    this.tasksService.addTask(this.newTask);
    this.newTask = '';
  }

  trackById(_: number, task: any) {
    return task.id;
  }

}
