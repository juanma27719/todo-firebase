export interface TaskModel {
  id: string;
  title: string;
  completed: boolean;
  categoryId?: string;
  createdAt: number;
}
