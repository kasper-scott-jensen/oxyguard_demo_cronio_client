<script>
    import PrivateSidebar from "../components/sidebar/PrivateSidebar.svelte";
    import PrivateNavbar from "../components/navbar/PrivateNavbar.svelte";
    import HeaderStats from "../components/header/HeaderStats.svelte";
    import PrivateFooter from "../components/footer/PrivateFooter.svelte";

    import CardSettings from "../components/card/CardSettings.svelte";
    import CardProfile from "../components/card/CardProfile.svelte";
</script>

<div>
    <PrivateSidebar />
    <div class="relative md:ml-64 bg-blueGray-100">
        <PrivateNavbar />
        <HeaderStats />
        <div class="px-4 md:px-10 mx-auto w-full -m-24">
            <div class="flex flex-wrap">
                <div class="w-full lg:w-8/12 px-4">
                    <CardSettings />
                </div>
                <div class="w-full lg:w-4/12 px-4">
                    <CardProfile />
                </div>
            </div>
            <PrivateFooter />
        </div>
    </div>
</div>
