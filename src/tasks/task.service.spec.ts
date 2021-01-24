import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskRepository } from 'src/entities/task.repository';
import { GetTasksFilterDto } from './dto/get-task.dto';
import { TaskStatus } from './task.enum';
import { TasksService } from './tasks.service';

const mockUser = {
  id: 'b7eca235-9847-4ea3-ba75-796f79bd9b8f',
  username: 'Test User',
};

const mockTaskRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
});

describe('TasksService', () => {
  let taskService: any;
  let taskRepository: any;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TaskRepository, useFactory: mockTaskRepository },
      ],
    }).compile();
    taskService = await module.get<TasksService>(TasksService);
    taskRepository = await module.get<TaskRepository>(TaskRepository);
  });
  describe('getTasks', () => {
    it('get all task from repository', async () => {
      taskRepository.getTasks.mockResolvedValue('someVal');
      expect(taskRepository.getTasks).not.toHaveBeenCalled();
      const filters: GetTasksFilterDto = {
        search: 'Some search',
        status: TaskStatus.IN_PROGRESS,
      };
      const result = await taskService.getTasks(filters, mockUser);
      taskService.getTasks(filters, mockUser);
      expect(taskRepository.getTasks).toHaveBeenCalled();
      expect(result).toEqual('someVal');
    });
  });

  describe('getTaskById', () => {
    it('calls taskRepository.findOne() and succesffuly retrieve and return the task', async () => {
      const mockTask = { title: 'Test task', description: 'Test desc' };
      taskRepository.findOne.mockResolvedValue(mockTask);

      const result = await taskService.getTaskById(
        'b7eca235-9847-4ea3-ba75-796f79bd9b8f',
        mockUser,
      );
      expect(result).toEqual(mockTask);

      expect(taskRepository.findOne).toHaveBeenCalledWith({
        where: {
          id: 'b7eca235-9847-4ea3-ba75-796f79bd9b8f',
          userId: mockUser.id,
        },
      });
    });

    it('throws an error as task is not found', () => {
      taskRepository.findOne.mockResolvedValue(null);
      expect(
        taskService.getTaskById(
          'b7eca235-9847-4ea3-ba75-796f79bd9b8f',
          mockUser,
        ),
      ).rejects.toThrow(NotFoundException);
    });
  });
});
