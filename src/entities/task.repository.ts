import { NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from 'src/tasks/dto/create-task.dto';
import { GetTasksFilterDto } from 'src/tasks/dto/get-task.dto';
import { TaskStatus } from 'src/tasks/task.enum';
import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { User } from './user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { search, status } = filterDto;

    const query = this.createQueryBuilder('task');
    query.where('task.userId = :userId', { userId: user.id });
    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(
    createTaskDto: CreateTaskDto,
    user: User,
  ): Promise<Partial<Task>> {
    const { description, title } = createTaskDto;
    const task: Partial<Task> = {
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    };

    const result = await Task.create(task).save();
    const { ['user']: _, ...res } = result;

    return res;
  }

  async deleteTaskById(id: string, user: User): Promise<void> {
    const result = await this.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
