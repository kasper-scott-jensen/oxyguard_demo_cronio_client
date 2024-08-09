<script>
    import { Router, Route } from "svelte-routing";
    import { userAuth } from "./stores/authenticationStore";
    import { NotificationDisplay } from "@beyonk/svelte-notifications";
    import { verifyToken } from "./scripts/authentication";
    import { onMount } from "svelte";

    import Home from "./pages/Home.svelte";
    import Login from "./pages/Login.svelte";
    import NotFound from "./pages/NotFound.svelte";
    import Dashboard from "./pages/Dashboard.svelte";
    import Settings from "./pages/Settings.svelte";
    import Profile from "./pages/Profile.svelte";
    import Team from "./pages/Team.svelte";
    import Calendar from "./pages/Calendar.svelte";
    import WishList from "./pages/WishList.svelte";
    import Attendance from "./pages/Attendance.svelte";
    import Chat from "./pages/Chat.svelte";

    let isAuthenticated;

    $: userAuth.subscribe((value) => {
        isAuthenticated = value.isAuthenticated;
    });

    const authRoutes = {
        "/dashboard": Dashboard,
        "/settings": Settings,
        "/profile": Profile,
        "/team": Team,
        "/calendar": Calendar,
        "/wishlist": WishList,
        "/attendance": Attendance,
        "/chat": Chat
    };

    const verificationRoutes = [
        '/login',
        '/dashboard',
        '/settings',
        '/profile',
        '/team',
        '/calendar',
        '/wishlist',
        '/attendance',
        '/chat'
    ]
    
    onMount(() => {
        verificationRoutes.forEach(element => {
            if (window.location.pathname === element) {
                verifyToken();
            }
        });
    })
</script>

<NotificationDisplay />
<Router>
    <Route path={"/"} component={Home} />
    <Route path={"/login"} component={Login} />
    <Route path={"*"} component={NotFound} />
    {#if isAuthenticated}
        {#each Object.entries(authRoutes) as [path, component]}
            <Route {path} component={component} />
        {/each}
    {:else}
        {#each Object.entries(authRoutes) as [path, component]}
            <Route {path} component={Login} />
        {/each}
    {/if}
</Router>

<style>
    @import "./styles/global.css";
    @import "./styles/tailwind.css";
    @import "./styles/animations.css";
</style>
