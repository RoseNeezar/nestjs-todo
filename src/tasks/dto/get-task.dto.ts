import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  status: TaskStatus;
  search: string;

  constructor(status: TaskStatus, search: string) {
    this.search = search;
    this.status = status;
  }
}
