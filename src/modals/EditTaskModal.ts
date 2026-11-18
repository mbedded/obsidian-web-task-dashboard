import { type App, Modal } from "obsidian";
import { mount, unmount } from "svelte";
import EditTaskComponent from "./EditTaskComponent.svelte";
import type { ITaskAdapter } from "../adapters/ITaskAdapter";
import type { ContextItem, TaskItem } from "../adapters/TaskClasses";
import type { IMessenger, TaskUpdatedEventArgs } from "../messenger/IMessenger";

export class EditTaskModal extends Modal {
  private view: ReturnType<typeof EditTaskComponent> | null = null;

  constructor(app: App,
              private adapter: ITaskAdapter,
              private messenger: IMessenger,
              private task: TaskItem,
              private contexts: ContextItem[]) {
    super(app);
  }

  async onOpen() {
    this.view = mount(EditTaskComponent, {
      target: this.contentEl,
      props: {
        contexts: this.contexts,
        task: this.task,
        onSubmit: this.onSubmit.bind(this)
      }
    });
  }

  async onClose() {
    if (this.view) {
      await unmount(this.view);
    }
  }

  private async onSubmit(editedTask: TaskItem) {
    if (!editedTask.title) {
      this.messenger.send("show_notice_error", "Title is required.");
      return;
    }

    const task = await this.adapter.updateTask(editedTask.id, editedTask.contextId, editedTask.title, editedTask.description);
    const args: TaskUpdatedEventArgs = {
      taskId: task.id,
      contextId: task.contextId,
      title: task.title,
      description: task.description
    };
    this.messenger.send("task_updated", args);
    this.close();
  }
}
