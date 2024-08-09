<script>
    import PrivateSidebar from "../components/sidebar/PrivateSidebar.svelte";
    import PrivateNavbar from "../components/navbar/PrivateNavbar.svelte";
    import HeaderStats from "../components/header/HeaderStats.svelte";
    import PrivateFooter from "../components/footer/PrivateFooter.svelte";
    import CardCheckInOut from "../components/card/CardCheckInOut.svelte";
    import CardCurrentCheckIn from "../components/card/CardCurrentCheckIn.svelte";
    import CardLatestAttendance from "../components/card/CardLatestAttendance.svelte";
</script>

<div>
    <PrivateSidebar />
    <div class="relative md:ml-64 bg-blueGray-100">
      <PrivateNavbar />
      <HeaderStats />
      <div class="px-4 md:px-10 mx-auto w-full -m-24">
        <div>
          <div class="flex flex-wrap">
            <div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4">
                <CardCheckInOut />
            </div>
            <div class="w-full xl:w-4/12 px-4">
                <CardCurrentCheckIn />
            </div>
          </div>
          <div class="flex flex-wrap">
            <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
                <CardLatestAttendance />
            </div>
          </div>
        </div>
        <PrivateFooter />
      </div>
    </div>
  </div>
