<script>
    import { eventData } from '../../stores/eventStore'

    let data = []
    let currentTime = new Date()
    let nextEvent
    let statIconName = "far fa-clock";
    let statIconColor = "bg-red-500";
    let statDescription

    $: eventData.subscribe(value => {
        data = value.events
        if (data) {
            sortEventsByStartTime()
            getNextEvent()
        }
    })

    function getNextEvent() {
        nextEvent = data.find(event => {
            const eventStartTime = new Date(`${event.start_date} ${event.start_time}`);
            return eventStartTime > currentTime;
        });
        if (nextEvent) {
            const eventStartTime = new Date(`${nextEvent.start_date} ${nextEvent.start_time}`);
            const timeDifference = eventStartTime - currentTime;
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
            let description = 'In ';
            if (days > 0) {
                description += `${days} ${days === 1 ? 'day' : 'days'}, `;
            }
            if (hours > 0 || days > 0) {
                description += `${hours} ${hours === 1 ? 'hour' : 'hours'}, `;
            }
            description += `${minutes} ${minutes === 1 ? 'minute' : 'minutes'}`;
            statDescription = description;
        } else {
            statDescription = 'No further events planned';
        }
    }

    function sortEventsByStartTime() {
        data.sort((a, b) => {
            const eventStartTimeA = new Date(`${a.start_date} ${a.start_time}`);
            const eventStartTimeB = new Date(`${b.start_date} ${b.start_time}`);
            return eventStartTimeA - eventStartTimeB;
        });
    }
</script>

<div
    class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg"
>
    <div class="flex-auto p-4">
        <div class="flex flex-wrap">
            <div class="relative w-full pr-4 max-w-full flex-grow flex-1">
                <h5 class="text-blueGray-400 uppercase font-bold text-xs">
                    Next
                </h5>
                <span class="font-semibold text-xl text-blueGray-700">
                    {nextEvent ? `${nextEvent.start_date} ${nextEvent.start_time}` : 'N/A'}
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
            <span class="whitespace-nowrap">{statDescription}</span>
        </p>
    </div>
</div>
