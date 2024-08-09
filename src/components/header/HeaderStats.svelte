<script>
    import CardTeamHeader from "../../components/card/CardTeamHeader.svelte";
    import CardNextEvent from "../../components/card/CardNextEvent.svelte";
    import CardMonthlyEvents from "../card/CardMonthlyEvents.svelte";
    import CardCompletion from "../card/CardCompletion.svelte";
</script>

<!-- Header -->
<div class="relative bg-red-500 md:pt-32 pb-32 pt-12">
  <div class="px-4 md:px-10 mx-auto w-full">
    <div>
      <!-- Card stats -->
      <div class="flex flex-wrap">
        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardNextEvent />
        </div>
        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardMonthlyEvents />
        </div>
        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardCompletion />
        </div>
        <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
          <CardTeamHeader />
        </div>
      </div>
    </div>
  </div>
</div>
