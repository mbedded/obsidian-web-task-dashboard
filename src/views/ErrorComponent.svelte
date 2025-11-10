<script lang="ts">
  export let header: string;
  export let message: string;
</script>

<style>
  .error-container {
    border: 1px solid var(--background-modifier-border);
  }

  .error-header {
    color: var(--text-error);
    font-weight: bold;
  }
</style>

<div class="error-container">
  <div class="error-header">{header}</div>
  <div>{message}</div>
</div>
