<script>
    import { attendanceData } from "../../stores/attendanceStore";
    import { eventData } from "../../stores/eventStore";

    let statIconName = "fas fa-percent";
    let statIconColor = "bg-pink-500";
    let events;
    let statPercentColor;
    let statPercent;
    let attendance;
    let totalEventTime;
    let totalAttendanceTime;

    $: eventData.subscribe((value) => {
        events = value.events;
        calculateTotalEventTime();
        calculateStatPercentAndColor();
    });

    $: attendanceData.subscribe((value) => {
        attendance = value;
        calculateTotalAttendanceTime();
        calculateStatPercentAndColor();
    });

    function calculateTotalEventTime() {
        totalEventTime = 0;
        if (events) {
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth();
            events.forEach((event) => {
                const eventDate = new Date(event.start_date);
                if (eventDate.getMonth() === currentMonth) {
                    const startDateTime = new Date(
                        `${event.start_date}T${event.start_time}`
                    );
                    const endDateTime = new Date(
                        `${event.end_date}T${event.end_time}`
                    );
                    const timeDifferenceInSeconds =
                        (endDateTime - startDateTime) / 1000;
                    totalEventTime += timeDifferenceInSeconds;
                }
            });
        }
    }

    function calculateTotalAttendanceTime() {
        totalAttendanceTime = 0;
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth();
        attendance.forEach((event) => {
            const eventDate = new Date(event.start_date);
            if (eventDate.getMonth() === currentMonth) {
                const startDateTime = new Date(
                    `${event.start_date}T${event.start_time}`
                );
                const endDateTime = new Date(
                    `${event.end_date}T${event.end_time}`
                );
                const timeDifferenceInSeconds =
                    (endDateTime - startDateTime) / 1000;
                totalAttendanceTime += timeDifferenceInSeconds;
            }
        });
    }

    function calculateStatPercentAndColor() {
        statPercent = ((totalAttendanceTime / totalEventTime) * 100).toFixed(1);
        if (statPercent >= 60) {
            statPercentColor = "text-emerald-500";
        } else if (statPercent >= 30) {
            statPercentColor = "text-orange-500";
        } else {
            statPercentColor = "text-red-500";
        }
    }

    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = seconds % 60;
        if (hours === 0) {
            return `${minutes}m ${remainingSeconds}s`;
        } else {
            return `${hours}h ${minutes}m ${remainingSeconds}s`;
        }
    }
</script>

<div
    class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
>
    <div class="flex-auto p-4">
        <div class="flex flex-wrap">
            <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 class="text-blueGray-400 uppercase font-bold text-xs">
                    Completed This Month
                </h5>
                <span class="font-semibold text-xl text-blueGray-700">
                    {formatTime(totalAttendanceTime)}
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
            <span class="mr-2 {statPercentColor}">
                {statPercent} %
            </span>
            <span class="whitespace-nowrap">of planned events</span>
        </p>
    </div>
</div>
