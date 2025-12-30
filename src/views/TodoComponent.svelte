<script lang="ts">
  import { TodoItem } from "../adapters/TodoClasses";

  interface Props {
    todo: TodoItem;
    markTodoAsDone: (x: TodoItem) => Promise<boolean>
  }

  let {
    todo,
    markTodoAsDone
  }: Props = $props();

  let waiting = $state(false);

  async function markDone() {
    waiting = true;
    const results = await markTodoAsDone(todo);

    waiting = false;
  }
</script>

<style>
  .container {
    margin-bottom: 5px;
  }

  .btn-done {
    background-color: var(--interactive-accent);
    color: var(--text-on-accent);
  }

  .description {
    /* todo: align vertical center */
  }
</style>

<div class="container">
  <button type="button" class="btn-done" onclick={markDone}>
    <!-- todo: add icon or something-->
    <!--    <Check/>-->
    Done
  </button>

  <span class="description">{todo.description}</span>ˆ
</div>

