<script>
    import { eventData } from "../../stores/eventStore";

    let events = [];
    let totalHoursData = [];

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    $: eventData.subscribe((value) => {
        events = value.events;
        totalHoursData = []
        calculate()
    });

    function calculateMonthData(monthOffset) {
        const currentMonth = new Date().getMonth() + 1;
        const targetMonth = ((currentMonth + monthOffset) % 12 + 12) % 12 || 12;
        const filteredEvents = events.filter(item => getMonth(item.start_date) === targetMonth);
        const totalHours = filteredEvents.reduce((total, item) => total + calculateEventHours(item), 0);
        totalHoursData.push({
            month: months[targetMonth - 1],
            total: totalHours.toFixed(0)
        });
    }

    function calculate() {
        calculateMonthData(1);
        calculateMonthData(0);
        calculateMonthData(-1);
        calculateMonthData(-2);
        calculateMonthData(-3);
        calculateMonthData(-4);
    }

    function getMonth(dateString) {
        return new Date(dateString).getMonth() + 1;
    }

    function calculateEventHours(eventItem) {
        const startDateTime = new Date(`${eventItem.start_date}T${eventItem.start_time}`);
        const endDateTime = new Date(`${eventItem.end_date}T${eventItem.end_time}`);
        const timeDifferenceInSeconds = (endDateTime - startDateTime) / 1000;
        return timeDifferenceInSeconds / 3600;
    }
</script>

<div class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div class="flex flex-wrap items-center">
            <div class="relative w-full max-w-full flex-grow flex-1">
                <h6 class="uppercase text-blueGray-400 mb-1 text-xs font-semibold">Overview</h6>
                <h2 class="text-blueGray-700 text-xl font-semibold">Event Time Allocation</h2>
            </div>
        </div>
    </div>
    <div class="py-4 flex-auto">
        <div class="relative block w-full overflow-x-auto h-350-px min-h-full">
            <table class="items-center w-full bg-transparent border-collapse">
                <thead class="thead-light">
                    <tr>
                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Month
                        </th>
                        <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                            Total
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {#each totalHoursData as { month, total }}
                        <tr>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left">
                                {month}
                            </td>
                            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                                {total}
                            </td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
</div>
