<script>
    import Calendar from "@event-calendar/core";
    import TimeGrid from "@event-calendar/time-grid";
    import List from "@event-calendar/list";
    import Interaction from "@event-calendar/interaction";
    import DayGrid from "@event-calendar/day-grid";

    import { wishData } from "../../stores/wishStore";
    import { userData } from "../../stores/userStore";
    import { saveUserWishList, deleteWish, getUserWishList } from "../../scripts/wishlist.js";
    import { onMount } from "svelte";
    import { v4 as uuid } from "uuid";
    import { scrollToArg } from "../../scripts/utility.js";

    let userStore;
    let ec;
    let data = [];
    let eventsToSave = [];
    let createWishModal = false;
    let editWishModal = false;
    let editWishObject;

    $: wishData.subscribe((value) => {
        data = value.wishlist;
        if (data) {
            displayEvents(data);
        }
    });

    $: userData.subscribe((value) => {
        userStore = value.email;
    });

    let plugins = [TimeGrid, List, Interaction, DayGrid];
    let options = {
        view: "timeGridWeek",
        dragSCroll: true,
        allDaySlot: false,
        firstDay: 1,
        headerToolbar: {
            start: "prev,next today",
            center: "title",
            end: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
        },
        events: [],
    };

    function displayEvents(data) {
        options.events = data.map((event) => ({
            id: event.id.toString(),
            start: `${event.start_date} ${event.start_time}`,
            end: `${event.end_date} ${event.end_time}`,
            title: event.title,
            backgroundColor: event.backgroundColor,
        }));
    }

    function isV4UUIDStructure(id) {
        const v4UUIDPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
        return v4UUIDPattern.test(id);
    }

    async function saveChanges() {
        eventsToSave = ec.getEvents().map((event) => {
            const id = isV4UUIDStructure(event.id) ? null : event.id;
            return {
                id: id,
                user: userStore,
                start_date: event.start.toISOString().split("T")[0],
                start_time: event.start.toLocaleTimeString("en-US", {
                    hour12: false,
                }),
                end_date: event.end.toISOString().split("T")[0],
                end_time: event.end.toLocaleTimeString("en-US", {
                    hour12: false,
                }),
                title: event.title,
                backgroundColor: event.backgroundColor,
            };
        });
        await saveUserWishList(eventsToSave);
        getUserWishList()
    }

    function openCreateWishModal() {
        createWishModal = true;
        editWishModal = false;
        scrollToArg('modalSection')
    }

    function closeCreateWishModal() {
        createWishModal = false;
    }

    function openEditWishModal() {
        editWishModal = true;
        createWishModal = false;
        scrollToArg('modalSection')
    }

    function closeEditWishModal() {
        editWishModal = false;
    }

    async function handleSubmitCreateEvent(event) {
        const formDataEntries = new FormData(event.target).entries();
        const data = Object.fromEntries(formDataEntries);
        closeCreateWishModal();
        await ec;
        ec.addEvent({
            id: uuid(),
            start: constructDateTime(data.startDate, data.startTime),
            end: constructDateTime(data.endDate, data.endTime),
            title: data.title,
            backgroundColor: data.backgroundColor,
        });
        saveChanges()
    }

    async function handleSubmitEditEvent(event) {
        const formDataEntries = new FormData(event.target).entries();
        const data = Object.fromEntries(formDataEntries);
        closeEditWishModal();
        await ec;
        ec.updateEvent({
            id: editWishObject.id,
            start: editWishObject.start,
            end: editWishObject.end,
            title: data.title,
            backgroundColor: data.backgroundColor,
        });
        saveChanges()
    }

    function constructDateTime(date, time) {
        const dateTimeString = `${date}T${time}`;
        const dateTime = new Date(dateTimeString);
        return dateTime;
    }

    async function deleteEvent() {
        closeEditWishModal()
        await ec
        ec.removeEventById(editWishObject.id)
        await deleteWish(editWishObject.id)
        getUserWishList()
    }

    onMount(() => {
        ec.setOption('eventClick', function (info) {
            editWishObject = info.event;
            openEditWishModal();
        });
        ec.setOption('eventDrop', function (info) {
            saveChanges()
        })
        ec.setOption('eventResize', function (info) {
            saveChanges()
        })
    });
</script>

<div
    class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
>
    <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div class="rounded-t bg-white mb-0 pb-6">
            <div class="text-center flex justify-between">
                <div class="mr-8">
                    <h6 class="text-blueGray-700 text-xl font-bold mt-4 text-left">
                        Wish List
                    </h6>
                    <p
                    class="leading-relaxed mt-1 text-blueGray-500 text-left text-sm"
                    >
                        Use the calendar to update your schedule wishes.
                    </p>
                </div>
                {#if !createWishModal && !editWishModal}
                    <div class="justify-end">
                        <button
                        class="bg-red-400 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                        type="button"
                        on:click={openCreateWishModal}
                    >
                        Create
                    </button>
                    </div>
                {/if}
            </div>
        </div>
        <section id="modalSection"></section>
        {#if createWishModal}
            <div class="mx-auto w-full mb-8">
                <div class="flex flex-wrap justify-center w-full">
                    <div class="w-full lg:w-12/12">
                        <div
                            class="relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded-lg bg-blueGray-200"
                        >
                            <div class="flex-auto p-5 lg:p-10">
                                <h4 class="text-2xl font-semibold">
                                    Create Event
                                </h4>
                                <p
                                    class="leading-relaxed mt-1 mb-4 text-blueGray-500"
                                >
                                    Complete this form to submit an event to
                                    your wish list.
                                </p>
                                <form
                                    on:submit|preventDefault={handleSubmitCreateEvent}
                                >
                                    <div class="relative w-full mb-3">
                                        <div class="relative w-full mb-3 mt-8">
                                            <label
                                                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                for="startDate"
                                            >
                                                Start Date
                                            </label>
                                            <input
                                                id="startDate"
                                                name="startDate"
                                                type="date"
                                                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Start Date"
                                                required
                                            />
                                        </div>
                                        <div class="relative w-full mb-3">
                                            <label
                                                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                for="startTime"
                                            >
                                                Start Time
                                            </label>
                                            <input
                                                id="startTime"
                                                name="startTime"
                                                type="time"
                                                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="Start Time"
                                                required
                                            />
                                        </div>
                                        <div class="relative w-full mb-3">
                                            <label
                                                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                for="endDate"
                                            >
                                                End Date
                                            </label>
                                            <input
                                                id="endDate"
                                                name="endDate"
                                                type="date"
                                                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="End Date"
                                                required
                                            />
                                        </div>
                                        <div class="relative w-full mb-3">
                                            <label
                                                class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                                for="endTime"
                                            >
                                                End Time
                                            </label>
                                            <input
                                                id="endTime"
                                                name="endTime"
                                                type="time"
                                                class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                placeholder="End Time"
                                                required
                                            />
                                        </div>
                                        <label
                                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            for="title"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id="title"
                                            name="title"
                                            rows="4"
                                            cols="80"
                                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            placeholder="Type a description..."
                                            required
                                        />
                                    </div>
                                    <div class="relative w-full mb-3">
                                        <label
                                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            for="backgroundColor"
                                        >
                                            Background Color
                                        </label>
                                        <select
                                            id="backgroundColor"
                                            name="backgroundColor"
                                            class="border-0 px-3 py-2 text-sm shadow focus:outline-none focus:ring w-full rounded"
                                            required
                                        >
                                            <option value="red">Red</option>
                                            <option value="green">Green</option>
                                            <option value="blue">Blue</option>
                                            <option value="yellow"
                                                >Yellow</option
                                            >
                                            <option value="orange"
                                                >Orange</option
                                            >
                                        </select>
                                        <div class="text-center mt-6">
                                            <button
                                                class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                on:click={closeCreateWishModal}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                class="bg-red-400 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
        {#if editWishModal}
            <div class="mx-auto w-full mb-8">
                <div class="flex flex-wrap justify-center w-full">
                    <div class="w-full lg:w-12/12">
                        <div
                            class="relative flex flex-col min-w-0 break-words w-full mb-3 shadow-lg rounded-lg bg-blueGray-200"
                        >
                        <div class="flex justify-end w-full">
                            <button
                                class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mb-1 ease-linear transition-all duration-150 mr-10 mt-8"
                                type="button"
                                on:click={deleteEvent}
                            >
                                Delete
                            </button>
                        </div>
                            <div class="flex-auto px-5 lg:p-10">
                                <h4 class="text-2xl font-semibold">
                                    Edit Event
                                </h4>
                                <p
                                    class="leading-relaxed mt-1 mb-6 text-blueGray-500"
                                >
                                    Complete this form to update the chosen
                                    event.
                                </p>
                                <form
                                    on:submit|preventDefault={handleSubmitEditEvent}
                                >
                                    <div class="relative w-full mb-3">
                                        <label
                                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            for="title"
                                        >
                                            Description
                                        </label>
                                        <textarea
                                            id="title"
                                            name="title"
                                            rows="4"
                                            cols="80"
                                            class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                                            placeholder={editWishObject.title}
                                            required
                                        />
                                    </div>
                                    <div class="relative w-full mb-3">
                                        <label
                                            class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                            for="backgroundColor"
                                        >
                                            Background Color
                                        </label>
                                        <select
                                            id="backgroundColor"
                                            name="backgroundColor"
                                            class="border-0 px-3 py-2 text-sm shadow focus:outline-none focus:ring w-full rounded"
                                            required
                                        >
                                            <option value="red">Red</option>
                                            <option value="green">Green</option>
                                            <option value="blue">Blue</option>
                                            <option value="yellow"
                                                >Yellow</option
                                            >
                                            <option value="orange"
                                                >Orange</option
                                            >
                                        </select>
                                        <div class="text-center mt-6">
                                            <button
                                                class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                on:click={closeEditWishModal}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                class="bg-red-400 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="submit"
                                            >
                                                Submit
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
        <Calendar bind:this={ec} {plugins} {options} />
    </div>
</div>
