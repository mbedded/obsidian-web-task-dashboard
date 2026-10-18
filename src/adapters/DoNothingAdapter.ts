import type { ITaskAdapter } from "./ITaskAdapter";
import { ContextItem, PingResult, TaskItem } from "./TaskClasses";

export class DoNothingAdapter implements ITaskAdapter {
  createTask(contextId: number, title: string, description: string): Promise<TaskItem> {
    return Promise.resolve(new TaskItem(0, 0, "", ""));
  }

  deleteTask(taskId: number): Promise<boolean> {
    return Promise.resolve(true);
  }

  getActiveContexts(): Promise<ContextItem[]> {
    return Promise.resolve([]);
  }

  getActiveTasks(contextId: number): Promise<TaskItem[]> {
    return Promise.resolve([]);
  }

  getDisplayInfo(): string {
    return "DoNothingAdapter";
  }

  ping(): Promise<PingResult> {
    return Promise.resolve(new PingResult(false, false, ""));
  }

  toggleTaskState(taskId: number): Promise<boolean> {
    return Promise.resolve(true);
  }

  updateTask(taskId: number, contextId: number, title: string, description: string): Promise<TaskItem> {
    return Promise.resolve(new TaskItem(0, 0, "", ""));
  }

}
