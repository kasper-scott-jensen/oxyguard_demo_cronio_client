<script>
    import { statusData } from '../../stores/statusStore.js'
    import { setCheckIn, setCheckOut } from '../../scripts/attendance.js'
    import { notifier } from '@beyonk/svelte-notifications';

    let isCheckedIn

    $: statusData.subscribe(value => {
        isCheckedIn = value.isCheckedIn
    })

    function handleCheckIn() {
        if (isCheckedIn == 0) {
            setCheckIn()
        } else {
            notifier.danger('You are already checked in', 3000)
        }
    }

    function handleCheckOut() {
        if (isCheckedIn == 1) {
            setCheckOut()  
        } else {
            notifier.danger('You are not currently checked in', 3000)
        }
    }
</script>

<div
    class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white"
>
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div class="flex flex-wrap items-center">
            <div class="relative w-full max-w-full flex-grow flex-1">
                <h6
                    class="uppercase text-blueGray-400 mb-1 text-xs font-semibold"
                >
                    Options
                </h6>
                <h2 class="text-black text-xl font-semibold">Check In / Out</h2>
            </div>
        </div>
    </div>
    <div class="p-4 flex-auto bg-blueGray-100">
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="relative h-350-px flex text-black align-items-center justify-center"
        >
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="bg-emerald-500 shadow-lg rounded-lg text-center pt-12 p-8 m-16 w-6/12 mr-4 cursor-pointer"
                on:click={handleCheckIn}
            >
                <div
                    class="text-emerald-500 p-8 text-center inline-flex items-center justify-center mb-5 shadow-lg rounded-full bg-white"
                >
                    <i class="fas fa-user-check fa-2x"></i>
                </div>
                <p class="text-lg text-white font-semibold">Check In</p>
            </div>
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <div
                class="bg-red-500 shadow-lg rounded-lg text-center pt-12 p-8 m-16 w-6/12 ml-4 cursor-pointer"
                on:click={handleCheckOut}
            >
                <div
                    class="text-red-500 p-8 text-center inline-flex items-center justify-center mb-5 shadow-lg rounded-full bg-white"
                >
                    <i class="fas fa-user-lock fa-2x"></i>
                </div>
                <p class="text-lg text-white font-semibold">Check Out</p>
            </div>
        </div>
    </div>
</div>
