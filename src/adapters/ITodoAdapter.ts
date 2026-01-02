import { ContextItem, PingResult, TodoItem } from "./TodoClasses";

/**
 * This interface defines the general interfaces for adapters, so any
 * task-list-endpoint could be added in the future.
 */
export interface ITodoAdapter {

  /**
   * Returns a human-readable name for the adapter.
   */
  getDisplayInfo(): string;

  /**
   * Sends a ping request to verify connectivity or the responsiveness of a service.
   *
   * @return {Promise<PingResult>} A promise that resolves with the result of the ping operation, containing details
   * about the response such as the status and latency, or rejects if the operation fails.
   */
  ping(): Promise<PingResult>;

  /**
   * Retrieves a list of active contexts asynchronously.
   *
   * @return {Promise<Context[]>} A promise that resolves to an array of context objects.
   */
  getActiveContexts(): Promise<ContextItem[]>;

  /**
   * Retrieves a list of todo items for a given context.
   *
   * @return {Promise<TodoItem[]>} A promise that resolves to an array of Todo objects.
   */
  getActiveTodos(contextId: number): Promise<TodoItem[]>

  /**
   * Toggles the state of a specific todo item between active and completed.
   *
   * @param {number} todoId - The unique identifier of the todo item to toggle..
   * @return {Promise<boolean>} A promise that resolves to a boolean indicating whether the operation was successful.
   */
  toggleTodoState(todoId: number): Promise<boolean>

  /**
   * Creates a new todo item in the specified context.
   *
   * @param {number} contextId - The ID of the context to add the todo to.
   * @param {string} text - The text/content of the new todo.
   * @return {Promise<TodoItem>} A promise that resolves to the newly created TodoItem.
   */
  createTodo(contextId: number, text: string): Promise<TodoItem>

  /**
   * Deletes a specific todo item.
   *
   * @param {number} todoId - The unique identifier of the todo item to delete.
   * @return {Promise<boolean>} A promise that resolves to a boolean indicating whether the operation was successful.
   */
  deleteTodo(todoId: number): Promise<boolean>

}
