<script lang="ts">
  export let percentage: string;
  export let label: string;
  export let color: string;
  export let votes: string;

  $: animation =
    "<style>  @keyframes chart-bar { from {height: 0;} to {height:" +
    { percentage } +
    "px}} </style>";
</script>

<svelte:head>
  {@html animation}
</svelte:head>

<section>
  <h4>{label}</h4>
  <h5>{percentage}%</h5>
  <div class="wrapper" style=" border: 1px solid {color}; ">
    <div
      class="chart-bar"
      style="background-color:{color}; height:{Number(percentage) * 4}px"
    />
    <h6>{votes} hlas</h6>
  </div>
</section>

<style>
  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid lightblue;
    padding: 10px;
  }
  .wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
  }
  .chart-bar {
    width: 60px;
    animation: chart-bar;
    animation-duration: 2s;
  }
  h6 {
    margin-top: -12px;
    color: white;
  }
</style>
