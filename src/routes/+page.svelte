<script lang="ts">
  import { goto } from "$app/navigation";
  import SearchCombo from "$lib/components/SearchCombo.svelte";

  type Regions = Array<{
    okres: string;
    obec: string;
  }>;
  let selectedRegion: { okres: string; obec: string } | null = null;

  const getValue = (value: { okres: string; obec: string }) =>
    (selectedRegion = value);

  async function getCompanyDetails() {
    const response = await fetch("/api/regions", {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = (await response.json()) as Regions;
    return data;
  }
</script>

{#await getCompanyDetails()}
  <p>...loading regions</p>
{:then regions}
  <main>
    <nav>
      <SearchCombo {getValue} options={regions} />
      <button
        on:click={() => {
          const m = new URLSearchParams({ ...selectedRegion });
          goto(`../results?${m}`);
        }}>Results</button
      >
    </nav>
  </main>
{/await}

<style>
  main {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  nav {
    display: flex;
    gap: 10px;
    height: 50px;
  }
  button {
    all: unset;
    padding: 5px 20px;
    border-radius: 8px;
    background-color: coral;
    height: 100%;
    color: white;
  }
</style>
