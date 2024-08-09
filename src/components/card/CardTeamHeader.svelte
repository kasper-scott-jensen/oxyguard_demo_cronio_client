<script>
    import { Link } from 'svelte-routing'
    import { teamData } from '../../stores/teamStore';

    let statIconName = "fas fa-users"
    let statIconColor = "bg-emerald-500"
    let team

    $: teamData.subscribe(value => {
        team = value.length        
    })
</script>

<div
    class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
>
    <div class="flex-auto p-4">
        <div class="flex flex-wrap">
            <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 class="text-blueGray-400 uppercase font-bold text-xs">
                    Current Team members
                </h5>
                <span class="font-semibold text-xl text-blueGray-700">
                    {team}
                </span>
            </div>
            <div class="relative w-auto pl-4 flex-initial">
                <div
                    class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full {statIconColor}"
                >
                    <i class={statIconName}></i>
                </div>
            </div>
        </div>
        <p class="text-sm text-blueGray-400 mt-4">
            <Link to={'/team'}><span class="whitespace-nowrap hover:cursor-pointer">Click here to view team !</span></Link>
        </p>
    </div>
</div>
