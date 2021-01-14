import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Task } from 'src/entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';
import { TaskStatus } from './task.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  // @Get()
  // getTasks(@Query(ValidationPipe) filterDto: GetTasksFilterDto): Task[] {
  //   if (Object.keys(filterDto).length) {
  //     return this.taskService.getFilteredTasks(filterDto);
  //   } else {
  //     return this.taskService.getAllTasks();
  //   }
  // }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task | undefined> {
    return this.taskService.getTaskById(id);
  }
  // @Delete('/:id')
  // deleteTaskById(@Param('id') id: string): void {
  //   return this.taskService.deleteTaskById(id);
  // }
  // @Post()
  // @UsePipes(ValidationPipe)
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.taskService.createTask(createTaskDto);
  // }
  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  // ): Task | undefined {
  //   return this.taskService.updateTaskStatus(id, status);
  // }
}
