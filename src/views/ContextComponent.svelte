<script lang="ts">
  import { type ContextItem, TodoItem } from "../adapters/TodoClasses";
  import type { ITodoAdapter } from "../adapters/ITodoAdapter";
  import { onMount } from "svelte";
  import SpinnerComponent from "./SpinnerComponent.svelte";
  import TodoComponent from "./TodoComponent.svelte";

  interface Props {
    adapter: ITodoAdapter;
    context: ContextItem;
  }

  let {
    context,
    adapter,
  }: Props = $props();

  let loading = $state(true);
  let todos: TodoItem[] = $state([]);

  onMount(async () => {
    await initialize()
  });

  async function initialize() {
    // todo: check adapter/API: can it filter for context via context-id?
    // todos = await adapter.GetTodos(context.id);
    todos = await adapter.GetActiveTodos(context.id);
    loading = false;
  }

  function markAsDone(todo: TodoItem){

  }

</script>

<style>
  .container {
    border: 1px solid var(--background-modifier-border);
    padding: 5px 10px;
    margin: 5px;
  }

  .header {
    margin: 0 0 10px 0;
    font-weight: var(--bold-weight);
    color: var(--text-normal);
    font-size: var(--font-ui-large);
    line-height: var(--line-height-normal);
  }

</style>

<!-- todo: localize view -->
<div class="container">
  <p class="header">{context.name}</p>

  {#if loading}
    <SpinnerComponent text="Loading todos…"/>
  {/if}

  {#if todos}

    {#each todos as todo}
      <TodoComponent todo={todo} markTodoAsDone={markAsDone(todo)}/>
    {/each}

  {:else}
    <p>NO TODOS EXISTING</p>
  {/if}

</div>
