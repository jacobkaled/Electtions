<script lang="ts">
  let inputText = "";
  let inputElement: HTMLInputElement;
  let showList = false;
  export let getValue: (value: { okres: string; obec: string }) => void;
  export let options: Array<{
    okres: string;
    obec: string;
  }> = [];

  let searchedstring: Array<{ okres: string; obec: string }> = [];
  const search = (inputString: string) => {
    searchedstring = options.filter((option) =>
      option.obec.toLowerCase().includes(inputString)
    );
  };

  $: search(inputText);

  const clickOutside = (e: any) => {
    if (inputElement.contains(e.target)) return;
    showList = false;
  };
</script>

<svelte:document on:click={clickOutside} />
<div class="SearchCombo">
  <div style="display:flex">
    <input
      bind:this={inputElement}
      on:keyup={(e) => (inputText = e.currentTarget.value)}
      on:focus={() => (showList = true)}
    />
  </div>
  {#if showList}
    <ul>
      {#each searchedstring as option}
        <li>
          <button
            on:click={(e) => {
              inputElement.value = option.obec;
              getValue(option);
              showList = false;
            }}
            ><h5 style="color:lightgray">{option.okres}</h5>
            <h4>{option.obec}</h4></button
          >
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  .SearchCombo {
    position: relative;
    width: 500px;
  }
  input {
    padding: 20px;
    font-weight: bold;
  }
  ul {
    list-style: none;
    position: absolute;
    left: 0;
    padding: 0;
    margin: 0;
    width: 100%;
    height: auto;
    max-height: 200px;
    overflow-y: auto;
  }
  li {
    width: 100%;
  }
  button {
    display: flex;
    background-color: white;
    border: none;
    border-bottom: 1px solid lightgray;
    gap: 5px;
    width: 100%;

    padding: 0;
    margin: 0;
  }
  button:hover {
    background-color: darkgray;
  }
  input {
    width: 100%;
    border-radius: 8px;
  }
</style>
