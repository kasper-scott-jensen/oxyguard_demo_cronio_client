<script>
    import { eventData } from "../../stores/eventStore";

    let data = [];
    let currentTime = new Date();
    let statIconName = "far fa-calendar";
    let statIconColor = "bg-orange-500";
    let statDescription;
    let statPercentColor;
    let statArrow;
    let statPercent;
    let totalEventsOfMonth = 0;
    let totalDurationOfMonth = 0;
    let totalDurationOfLastMonth = 0;

    $: eventData.subscribe((value) => {
        data = value.events;
        if (data) {
            calculateEventsAndDuration();
        }
    });

    function calculateEventsAndDuration() {
        const currentMonth = currentTime.getMonth();
        const currentYear = currentTime.getFullYear();
        const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const lastYear = lastMonth === 11 ? currentYear - 1 : currentYear;
        totalEventsOfMonth = totalDurationOfMonth = 0;
        data.forEach((event) => {
            const eventDate = new Date(
                `${event.start_date} ${event.start_time}`,
            );
            if (
                eventDate.getMonth() === currentMonth &&
                eventDate.getFullYear() === currentYear
            ) {
                totalDurationOfMonth += getEventDuration(event);
                totalEventsOfMonth++;
            }
            if (
                eventDate.getMonth() === lastMonth &&
                eventDate.getFullYear() === lastYear
            ) {
                totalDurationOfLastMonth += getEventDuration(event);
            }
        });
        setStats();
    }

    function getEventDuration(event) {
        const start = new Date(`${event.start_date} ${event.start_time}`);
        const end = new Date(`${event.end_date} ${event.end_time}`);
        return (end - start) / (1000 * 60 * 60);
    }

    function setStats() {
        if (totalDurationOfMonth > totalDurationOfLastMonth) {
            statArrow = "up";
            statPercent = `${formatHourString(totalDurationOfMonth - totalDurationOfLastMonth)}`;
            statDescription = "more than last month";
            statPercentColor = "text-emerald-500"
        } else if (totalDurationOfMonth < totalDurationOfLastMonth) {
            statArrow = "down";
            statPercent = `${formatHourString(totalDurationOfMonth - totalDurationOfLastMonth)}`;
            statDescription = "less than last month";
            statPercentColor = "text-red-500"
        } else {
            statArrow = "equal";
            statPercent = "";
            statDescription = "Same as last month";
            statPercentColor = "text-blueGray-500"
        }
    }

    function formatHourString(hours) {
        return `${hours.toFixed(0)} ${hours === 1 ? 'hour' : 'hours'}`;
    }
</script>

<div
    class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
>
    <div class="flex-auto p-4">
        <div class="flex flex-wrap">
            <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 class="text-blueGray-400 uppercase font-bold text-xs">
                    Total This Month
                </h5>
                <span class="font-semibold text-xl text-blueGray-700">
                    {`${totalEventsOfMonth} events`}
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
                <i
                class={
                    statArrow === 'up'
                        ? 'fas fa-arrow-up'
                        : statArrow === 'down'
                            ? 'fas fa-arrow-down'
                            : 'fas fa-equals'
                }
                ></i>
                {statPercent}
            </span>
            <span class="whitespace-nowrap">{statDescription}</span>
        </p>
    </div>
</div>
