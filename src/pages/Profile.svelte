<script>
    import { userData } from '../stores/userStore'

    import PrivateSidebar from "../components/sidebar/PrivateSidebar.svelte";
    import PrivateNavbar from "../components/navbar/PrivateNavbar.svelte";
    import HeaderStats from "../components/header/HeaderStats.svelte";
    import PrivateFooter from "../components/footer/PrivateFooter.svelte";

    let bannerUrl
    let avatarUrl
    let name
    let empDate
    let department
    let title
    let bio
    let email
    let phone

    $: userData.subscribe(value => {
        bannerUrl = value.bannerUrl
        avatarUrl = value.avatarUrl
        name = `${value.firstName} ${value.lastName}`
        empDate = value.empDate
        department = value.department
        title =  value.title
        bio = value.bio
        email = value.email
        phone = value.phone
    })
</script>

<div>
    <PrivateSidebar />
    <div class="relative md:ml-64 bg-blueGray-100">
        <PrivateNavbar />
        <HeaderStats />
        <div class="px-4 md:px-10 mx-auto w-full -m-24">
            <section class="relative block h-500-px">
                <div
                    class="absolute top-0 w-full h-full bg-center bg-cover rounded-t"
                    style="
                background-image: url({bannerUrl});"
                >
                    <span
                        id="blackOverlay"
                        class="w-full h-full absolute opacity-50 bg-black rounded-t"
                    ></span>
                </div>
                <div
                    class="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-70-px"
                    style="transform: translateZ(0);"
                >
                    <svg
                        class="absolute bottom-0 overflow-hidden"
                        xmlns="http://www.w3.org/2000/svg"
                        preserveAspectRatio="none"
                        version="1.1"
                        viewBox="0 0 2560 100"
                        x="0"
                        y="0"
                    >
                        <polygon
                            class="text-blueGray-200 fill-current"
                            points="2560 0 2560 100 0 100"
                        ></polygon>
                    </svg>
                </div>
            </section>
            <section class="relative py-16 bg-blueGray-200 rounded">
                <div class="container mx-auto px-4">
                    <div
                        class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64"
                    >
                        <div class="px-6">
                            <div class="flex flex-wrap justify-center">
                                <div
                                    class="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center"
                                >
                                    <div class="relative">
                                        <img
                                            alt="..."
                                            src={avatarUrl}
                                            class="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                                        />
                                    </div>
                                </div>
                                <div
                                    class="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center"
                                >
                                    <div class="py-6 px-3 mt-32 sm:mt-0">
                                        <button
                                            class="bg-red-400 active:bg-red-500 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            on:click={() => window.location.href=`mailto:${email}`}
                                        >
                                            Message
                                        </button>
                                    </div>
                                </div>
                                <div class="w-full lg:w-4/12 px-4 lg:order-1">
                                    <div
                                        class="flex justify-center py-4 lg:pt-4 pt-8"
                                    >
                                        <div class="mr-4 p-3 text-center">
                                            <span
                                                class="text-xl font-bold block tracking-wide text-blueGray-600"
                                            >
                                                {empDate}
                                            </span>
                                            <span
                                                class="text-xs text-blueGray-400"
                                                >Employed since</span
                                            >
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center mt-12">
                                <h3
                                    class="text-4xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
                                >
                                    {name}
                                </h3>
                                <div
                                    class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
                                >
                                    <i
                                        class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"
                                    ></i>
                                    {department}
                                </div>
                                <div class="mb-2 text-blueGray-600 mt-10">
                                    <i
                                        class="fas fa-briefcase mr-2 text-lg text-blueGray-400"
                                    ></i>
                                    {title}
                                </div>
                            </div>
                            <div
                                class="mt-10 py-10 border-t border-blueGray-200 text-center"
                            >
                                <div class="flex flex-wrap justify-center">
                                    <div class="w-full lg:w-9/12 px-4">
                                        <p
                                            class="mb-4 text-lg leading-relaxed text-blueGray-700"
                                        >
                                            {bio}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <PrivateFooter />
        </div>
    </div>
</div>
