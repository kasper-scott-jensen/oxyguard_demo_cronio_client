<script>
    import { userData } from "../../stores/userStore";

    const env = import.meta.env;

    const ws = new WebSocket(env.VITE_SOCKET);

    let username;
    let messages = [];

    $: userData.subscribe((value) => {
        username = `${value.firstName} ${value.lastName}`;
    });

    function handleSendMessage(event) {
        const formDataEntries = new FormData(event.target).entries();
        const data = Object.fromEntries(formDataEntries);
        ws.send(username + '///' + data.text);
        document.getElementById('chat-input').value = null;
    }

    ws.onmessage = async (event) => {
        const receivedData = await event.data.text();
        const parts = receivedData.split('///');
        if (parts.length === 2) {
            const receivedUsername = parts[0];
            const receivedMessage = parts[1];
            const timestamp = new Date().toLocaleTimeString();
            messages = [
                ...messages,
                {
                    message: receivedMessage,
                    timestamp: timestamp,
                    displayName: receivedUsername
                }
            ];
            const element = document.getElementById('scroll-container');
            setTimeout(() => {
                element.scrollTop = element.scrollHeight;
            }, 50);
        }
    };
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
                    Communication
                </h6>
                <h2 class="text-white text-xl font-semibold">Team Chat</h2>
            </div>
        </div>
    </div>
    <div class="p-4 flex-auto h-full items-center">
        <div class="relative h-350-px items-center border-2 rounded border-blue-700 overflow-hidden">
            <div class="flex flex-wrap h-full items-end overflow-y-auto" id="scroll-container">
                <div class="relative w-full pr-4 max-w-full flex-grow flex-1 items-left text-left">
                    <div class="max-h-80">
                        {#each messages as message}
                            <div class="text-white flex flex-row">
                                <p class="px-4">{message.timestamp}</p>
                                <p class="px-4">{message.displayName}</p>
                                <p class="px-4">{message.message}</p>
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        </div>
        <div class="pt-6 flex w-full">
            <form
                class="md:flex hidden flex-row items-center lg:ml-auto w-full"
                on:submit|preventDefault={handleSendMessage}
            >
                <div class="relative flex w-full flex-row items-stretch">
                    <span
                        class="z-10 h-full leading-snug font-normal text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"
                    >
                        <i class="fas fa-pen"></i>
                    </span>
                    <input
                        id="chat-input"
                        type="text"
                        placeholder="Write here..."
                        class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
                        name="text"
                        required
                        />
                    <button
                        class="ml-3 bg-red-400 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                        type="submit"
                    >
                        Send
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>
