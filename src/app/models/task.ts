export interface Task {
  _id?: number;
  title: string;
  description: string;
  createdAt: Date;
  status: boolean;
}
