<script>
    import PrivateSidebar from "../components/sidebar/PrivateSidebar.svelte";
    import PrivateNavbar from "../components/navbar/PrivateNavbar.svelte";
    import HeaderStats from "../components/header/HeaderStats.svelte";
    import PrivateFooter from "../components/footer/PrivateFooter.svelte";
    import CardWishList from "../components/card/CardWishList.svelte";
</script>

<div>
    <PrivateSidebar />
    <div class="relative md:ml-64 bg-blueGray-100 min-h-screen">
        <PrivateNavbar />
        <HeaderStats />
        <div class="px-4 md:px-10 mx-auto w-full -m-24">
                <div class="flex flex-wrap">
                    <div class="w-full xl:w-12/12 mb-12 xl:mb-0 px-4">
                        <CardWishList />
                    </div>
                </div>
            <PrivateFooter />
        </div>
    </div>
</div>
