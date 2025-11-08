<script lang="ts">
  export let text: string;
</script>

<style>
  .container {
    display: flex;
    align-items: center;
    margin-top: 10px; /* Just for some spacing */
  }

  .container span {
    margin-left: 10px; /* Space between spinner and text */
  }

  .spinner {
    display: inline-block;
    width: 20px; /* Adjust size as needed */
    height: 20px; /* Adjust size as needed */
    /* We're using obsidian colors here */
    border: var(--background-modifier-border);
    border-top: 4px solid var(--interactive-accent); /* Accent color */
    border-radius: 50%;
    animation: spin 1.5s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>

<div class='container'>
  <div class="spinner"></div>
  <span>{text}</span>
</div>
