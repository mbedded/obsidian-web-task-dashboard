<script lang="ts">
  import { TodoItem } from "../adapters/TodoClasses";

  interface Props {
    // The entry to display and interact with.
    todo: TodoItem;
    // Function (callback to parent) to mark an entry as done.
    markTodoAsDone: (x: TodoItem) => Promise<boolean>
  }

  let {
    todo,
    markTodoAsDone
  }: Props = $props();

  async function OnClickDone() {
    const success = await markTodoAsDone(todo);
  }
</script>

<style>
  .container {
    margin-bottom: 5px;
  }

  .btn-done {
    background-color: var(--interactive-accent);
    color: var(--text-on-accent);
    /* todo: check or delete style */
    /*background-color: var(--interactive-normal);*/
    /*color: var(--text-normal);*/
  }

  .description {
    margin-left: 5px;
    vertical-align: center;
    /* todo: align vertical center */
  }
</style>

<div class="container">
  <button type="button" class="btn-done" onclick={OnClickDone}>
    <!-- todo: add icon or something-->
    <!--    <Check/>-->
    ✓
  </button>

  <span class="description">{todo.description}</span>
</div>

