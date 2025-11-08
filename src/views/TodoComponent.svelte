<script lang="ts">
  import { TodoItem } from "../adapters/TodoClasses";
  interface Props {
    todo: TodoItem;
  }

  let {
    todo
  }: Props = $props();
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
  <button type="button" class="btn-done">
    <i data-lucide="check"></i>
    Done
  </button>

  <span class="description">{todo.description}</span>
</div>

