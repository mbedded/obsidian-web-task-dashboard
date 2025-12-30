<script lang="ts">
  import type { ITodoAdapter } from "../adapters/ITodoAdapter";
  import { t } from "localizify";
  import { ContextItem } from "../adapters/TodoClasses";
  import SpinnerComponent from "./SpinnerComponent.svelte";
  import ContextComponent from "./ContextComponent.svelte";
  import ErrorComponent from "./ErrorComponent.svelte";

  interface Props {
    adapter: ITodoAdapter;
  }

  let {
    adapter,
  }: Props = $props();

  let loading = $state(true);

  let hasError = $state(false);
  let errorHeader = $state("error-header");
  let errorMessage = $state("error-message");

  let contexts: ContextItem[] = $state([]);

  // todo: use "onMount" instead of external call
  export async function initializeView() {
    loading = true;
    hasError = false;

    // Check if service is reachable
    var pingResult = await adapter.Ping();

    if (pingResult.isReachable == false) {
      errorHeader = t("messages.service-unreachable-header");
      errorMessage = t("messages.service-unreachable-description");
    }
    if (pingResult.isAuthenticated == false) {
      errorHeader = t("messages.service-authentication-failed-header");
      errorMessage = t("messages.service-authentication-failed-description");
    }
    if (pingResult.isOk() == false) {
      loading = false;
      hasError = true;

      return;
    }

    // Initialize view
    contexts = await adapter.GetActiveContexts();

    loading = false;
  }

</script>

<!-- todo: localize view -->

{#if loading}
  <SpinnerComponent text="Loading contexts…"/>
{/if}


{#if !loading}
  <!-- todo: show when context == empty-->

  {#each contexts as context}
    <ContextComponent adapter={adapter} context={context}/>
  {/each}
{/if}


{#if hasError}
  <ErrorComponent header={errorHeader} message={errorMessage}/>
{/if}



