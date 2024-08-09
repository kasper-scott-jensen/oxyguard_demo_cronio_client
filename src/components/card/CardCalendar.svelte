<script>
    import Calendar from "@event-calendar/core";
    import TimeGrid from "@event-calendar/time-grid";
    import List from '@event-calendar/list';
    import DayGrid from '@event-calendar/day-grid'

    import { eventData } from '../../stores/eventStore'

    let data = []

    $: eventData.subscribe(value => {
        data = value.events
        if (data) {
            displayEvents(data)
        }
    })

    let plugins = [TimeGrid, List, DayGrid];
    let options = {
        view: "timeGridWeek",
        dragSCroll: true,
        allDaySlot: false,
        firstDay: 1,
        headerToolbar: {
            start: 'prev,next today',
            center: 'title',
            end: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
        },
        events: []
    };

    function displayEvents(data) {
        options.events = data.map(event => ({
            id: event.id.toString(),
            start: `${event.start_date} ${event.start_time}`,
            end: `${event.end_date} ${event.end_time}`,
            title: event.title,
            backgroundColor: event.backgroundColor
        }));
    }
</script>

<div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
>
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div class="rounded-t bg-white mb-0 pb-6">
            <div class="text-center flex justify-between">
              <h6 class="text-blueGray-700 text-xl font-bold mt-4">Calendar</h6>
            </div>
        </div>
        <Calendar {plugins} {options} />
    </div>
</div>
