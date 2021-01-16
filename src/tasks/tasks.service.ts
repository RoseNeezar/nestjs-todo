import { Injectable, NotFoundException } from '@nestjs/common';

import { CreateTaskDto } from './dto/create-task.dto';

import { InjectRepository } from '@nestjs/typeorm';
import { TaskRepository } from 'src/entities/task.repository';
import { Task } from 'src/entities/task.entity';
import isUuid from 'is-uuid';
import { TaskStatus } from './task.enum';
import { GetTasksFilterDto } from './dto/get-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskRepository.getTasks(filterDto);
  }

  async getTaskById(id: string): Promise<Task | undefined> {
    if (!isUuid.v4(id)) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    const result = await this.taskRepository
      .createQueryBuilder('task')
      .where('task.id = :id', { id: id })
      .getOne();

    if (!result) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return result;
  }

  async deleteTaskById(id: string): Promise<void> {
    if (!isUuid.v4(id)) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    this.taskRepository.deleteTaskById(id);
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto);
  }

  async updateTaskStatus(
    id: string,
    status: TaskStatus,
  ): Promise<Task | undefined> {
    const task = await this.getTaskById(id);
    task!.status = status;
    await task?.save();
    return task;
  }
}
