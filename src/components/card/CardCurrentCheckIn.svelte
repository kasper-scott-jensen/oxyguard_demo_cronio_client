<script>
    import { currentAttendanceData } from "../../stores/currentCheckIn";
    import { statusData } from "../../stores/statusStore";

    let currentCheckInDate
    let currentCheckInTime
    let checkedInStore

    $: currentAttendanceData.subscribe(value => {
        currentCheckInDate = value.startDate
        currentCheckInTime = value.startTime
    })

    $: statusData.subscribe(value => {
        checkedInStore = value.isCheckedIn
    })
</script>

<div
    class="relative flex flex-col min-w-0 break-words bg-blueGray-700 w-full mb-6 shadow-lg rounded"
>
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div class="flex flex-wrap items-center">
            <div class="relative w-full max-w-full flex-grow flex-1">
                <h6
                    class="uppercase text-blueGray-400 mb-1 text-xs font-semibold"
                >
                    Status
                </h6>
                <h2 class="text-white text-xl font-semibold">
                    Current Attendance
                </h2>
            </div>
        </div>
    </div>
    <div class="p-4 flex-auto h-full items-center">
        <div class="relative h-350-px h-full items-center border-2 rounded border-blue-700 {checkedInStore ? 'blue-pulse' : ''}">
            <div class="flex flex-wrap h-full items-center">
                <div class="relative w-full max-w-full flex-grow flex-1 text-center items-center">
                    <h5 class="text-white font-semibold text-xl text-white">
                        {checkedInStore ? currentCheckInTime : ''}
                    </h5>
                    <h5 class="text-white font-semibold text-xl text-white">
                        {checkedInStore ? currentCheckInDate : ''}
                    </h5>
                    <h5 class="text-white font-semibold text-sm text-blueGray-400 uppercase">
                        {checkedInStore ? 'Checked in at' : 'Not currently checked in'}
                    </h5>
                </div>
            </div>
        </div>
    </div>
</div>
