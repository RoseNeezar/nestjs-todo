import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from 'src/entities/task.repository';
import { Task } from 'src/entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getFilteredTasks(filterDto: GetTasksFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (task) =>
  //         task.title.includes(search) || task.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  async getTaskById(id: string): Promise<Task | undefined> {
    const result = await this.taskRepository.findOne(id);
    if (!result) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return result;
  }

  // deleteTaskById(id: string): void {
  //   this.getTaskById(id);
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { description, title } = createTaskDto;
  //   const task: Task = {
  //     id: v1(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task | undefined {
  //   const task = this.getTaskById(id);
  //   task!.status = status;
  //   return task;
  // }
}
