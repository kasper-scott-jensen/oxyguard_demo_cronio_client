<script>
    import { attendanceData } from "../../stores/attendanceStore";

    let attendance;
    let latestAttendance  = []

    $: attendanceData.subscribe((value) => {
        attendance = value;
        if (attendance && attendance.length >= 5) {
            latestAttendance = attendance.slice(-5).reverse();
        } else {
            latestAttendance = [...attendance].reverse();
        }
    });

    function calculateTotalTime(startDate, startTime, endDate, endTime) {
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${endTime}`);
        const timeDifference = endDateTime - startDateTime;
        const totalSeconds = Math.floor(timeDifference / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        const formattedHours = ('0' + hours).slice(-2);
        const formattedMinutes = ('0' + minutes).slice(-2);
        const formattedSeconds = ('0' + seconds).slice(-2);
        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }
</script>

<div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
>
    <div class="rounded-t mb-0 px-4 py-3 border-0">
        <div class="flex flex-wrap items-center">
            <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 class="font-semibold text-base text-blueGray-700">
                    Latest Attendance
                </h3>
            </div>
        </div>
    </div>
    <div class="block w-full overflow-x-auto">
        <table class="items-center w-full bg-transparent border-collapse">
            <thead>
                <tr>
                    <th
                        class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                        Start Date
                    </th>
                    <th
                        class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                        Start Time
                    </th>
                    <th
                        class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                        End Date
                    </th>
                    <th
                        class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                        End Time
                    </th>
                    <th
                        class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                    >
                        Total Time
                    </th>
                </tr>
            </thead>
            <tbody>
                {#each latestAttendance as element}
                    <tr>
                        <td
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                            {element.start_date}
                        </td>
                        <td
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                            {element.start_time}
                        </td>
                        <td
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                            {element.end_date}
                        </td>
                        <td
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                            {element.end_time}
                        </td>
                        <td
                            class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                        >
                            { calculateTotalTime(element.start_date, element.start_time, element.end_date, element.end_time) }
                        </td>
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
