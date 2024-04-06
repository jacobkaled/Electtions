<script lang="ts">
  import { page } from "$app/stores";
  import ChartBar from "$lib/components/ChartBar.svelte";
  import NoData from "$lib/components/NoData.svelte";
  import candidatesb from "./candidates.json";

  type CandidateList = Array<{ PORADOVE_CISLO: string; HLASY: string }>;

  const m = new URLSearchParams($page.url.searchParams.toString());

  const colors = [
    "red",
    "blue",
    "grey",
    "green",
    "brown",
    "purple",
    "black",
    "DarkSlateGray",
    "Coral",
  ];

  async function getVotes() {
    const response = await fetch(`/api/votes?${m}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    const data = (await response.json()) as CandidateList;
    return data;
  }

  const percentage = (candidates: CandidateList, votes: string) =>
    (
      (100 * Number(votes)) /
      candidates.reduce((acc, candidate) => (acc += Number(candidate.HLASY)), 0)
    ).toFixed(2);

  const mapCandidates = (candidateNumber: string) => {
    const candidateE = candidatesb.PE_REGKAND_ROW.find(
      (candidate) => candidate.CKAND === candidateNumber
    );
    if (!candidateE) throw "could not find candidate";
    return candidateE.JMENO;
  };
</script>

<div class="main">
  <div class="wrapper">
    {#if !m.has("okres") || !m.has("obec")}
      <NoData />
    {:else}
      {#await getVotes()}
        <p>...loading</p>
      {:then candidates}
        {#if candidates.length > 0}
          {#each candidates as candidate, index}
            <ChartBar
              percentage={percentage(candidates, candidate.HLASY)}
              label={mapCandidates(candidate.PORADOVE_CISLO)}
              votes={candidate.HLASY}
              color={colors[index]}
            />
          {/each}
        {:else}
          <NoData />
        {/if}
      {/await}
    {/if}
  </div>
</div>

<style>
  .main {
    display: flex;
    justify-content: center;
  }
  .wrapper {
    display: flex;
    height: 500px;
  }
</style>
