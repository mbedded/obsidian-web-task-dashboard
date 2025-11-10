import { ContextItem, PingResult, TodoItem } from "./TodoClasses";

/**
 * This interface defines the general interfaces for adapters, so any
 * task-list-endpoint could be added in the future.
 */
export interface ITodoAdapter {

  /**
   * Sends a ping request to verify connectivity or the responsiveness of a service.
   *
   * @return {Promise<PingResult>} A promise that resolves with the result of the ping operation, containing details
   * about the response such as the status and latency, or rejects if the operation fails.
   */
  Ping(): Promise<PingResult>;

  /**
   * Retrieves a list of contexts asynchronously.
   *
   * @return {Promise<Context[]>} A promise that resolves to an array of context objects.
   */
  GetContexts(): Promise<ContextItem[]>;

  /**
   * Retrieves a list of todo items.
   *
   * @return {Promise<TodoItem[]>} A promise that resolves to an array of Todo objects.
   */
  GetTodos(): Promise<TodoItem[]>

  /**
   * Retrieves the information about the adapter for the user.
   *
   * @return {string} The information for the user as a string.
   */
  GetDisplayInfo(): string;
}
