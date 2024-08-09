<script>
  import { link } from "svelte-routing";
  import { logoutAttempt } from "../../scripts/authentication";

  import UserDropdown from "../dropdown/UserDropdown.svelte";

  let collapseShow = "hidden";

  function toggleCollapseShow(classes) {
    collapseShow = classes;
  }

  function handleLogout() {
    logoutAttempt();
  }
</script>

<nav
  class="md:left-0 md:block md:fixed md:top-0 md:bottom-0 md:overflow-y-auto md:flex-row md:flex-nowrap md:overflow-hidden shadow-xl bg-white flex flex-wrap items-center justify-between relative md:w-64 z-10 py-4 px-6"
>
  <div
    class="md:flex-col md:items-stretch md:min-h-full md:flex-nowrap px-0 flex flex-wrap items-center justify-between w-full mx-auto"
  >
    <button
      class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
      type="button"
      on:click={() => toggleCollapseShow("bg-white m-2 py-3 px-6")}
    >
      <i class="fas fa-bars"></i>
    </button>
    <a
      use:link
      class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-md uppercase font-bold p-4 px-0"
      href="/"
    >
      Cronio
    </a>
    <ul class="md:hidden items-center flex flex-wrap list-none">
      <li class="inline-block relative"></li>
      <li class="inline-block relative">
        <UserDropdown />
      </li>
    </ul>
    <div
      class="md:flex md:flex-col md:items-stretch md:opacity-100 md:relative md:mt-4 md:shadow-none shadow absolute top-0 left-0 right-0 z-40 overflow-y-auto overflow-x-hidden h-auto items-center flex-1 rounded {collapseShow}"
    >
      <div
        class="md:min-w-full md:hidden block pb-4 mb-4 border-b border-solid border-blueGray-200"
      >
        <div class="flex flex-wrap">
          <div class="w-6/12">
            <a
              use:link
              class="md:block text-left md:pb-2 text-blueGray-600 mr-0 inline-block whitespace-nowrap text-md uppercase font-bold p-4 px-0"
              href="/"
            >
              Cronio
            </a>
          </div>
          <div class="w-6/12 flex justify-end">
            <button
              type="button"
              class="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
              on:click={() => toggleCollapseShow("hidden")}
            >
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
      </div>
      <form class="mt-6 mb-4 md:hidden">
        <div class="mb-3 pt-0">
          <input
            type="text"
            placeholder="Search"
            class="border-0 px-3 py-2 h-12 border border-solid border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
          />
        </div>
      </form>
      <hr class="my-4 md:min-w-full" />
      <ul class="md:flex-col md:min-w-full flex flex-col list-none">
        <li class="items-center">
          <a
            use:link
            href="/dashboard"
            class="text-xs uppercase py-3 font-bold block 'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <i class="fas fa-tv mr-2 text-sm 'text-blueGray-300'}"></i>
            Dashboard
          </a>
        </li>
        <li class="items-center">
          <a
            use:link
            href="/attendance"
            class="text-xs uppercase py-3 font-bold block 'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <i class="fas fa-check mr-2 text-sm 'text-blueGray-300'}"></i>
            Attendance
          </a>
        </li>
        <li class="items-center">
          <a
            use:link
            href="/calendar"
            class="text-xs uppercase py-3 font-bold block 'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <i class="far fa-calendar mr-2 text-sm 'text-blueGray-300'}"></i>
            Calendar
          </a>
        </li>
        <li class="items-center">
          <a
            use:link
            href="/wishlist"
            class="text-xs uppercase py-3 font-bold block 'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <i class="far fa-star mr-2 text-sm 'text-blueGray-300'}"></i>
            Wish List
          </a>
        </li>
        <hr class="my-4 md:min-w-full" />
        <li class="items-center">
          <a
            use:link
            href="/team"
            class="text-xs uppercase py-3 font-bold block 'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <i class="fas fa-sitemap mr-2 text-sm 'text-blueGray-300'}"></i>
            Team
          </a>
        </li>
        <li class="items-center">
          <a
            use:link
            href="/chat"
            class="text-xs uppercase py-3 font-bold block 'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <i class="fas fa-users mr-2 text-sm 'text-blueGray-300'}"></i>
            Live Chat
          </a>
        </li>
        <hr class="my-4 md:min-w-full" />
        <li class="items-center">
          <a
            use:link
            href="/profile"
            class="text-xs uppercase py-3 font-bold block 'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <i class="fas fa-user-circle mr-2 text-sm 'text-blueGray-300'}"></i>
            Profile
          </a>
        </li>
        <li class="items-center">
          <a
            use:link
            href="/settings"
            class="text-xs uppercase py-3 font-bold block 'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <i class="fas fa-tools mr-2 text-sm 'text-blueGray-300'}"></i>
            Settings
          </a>
        </li>
        <hr class="my-4 md:min-w-full" />
        <li class="items-center">
          <a
            on:click|preventDefault={handleLogout}
            href="#"
            class="text-xs uppercase py-3 font-bold block 'text-blueGray-700 hover:text-blueGray-500'}"
          >
            <i class="fas fa-arrow-right mr-2 text-sm 'text-blueGray-300'}"></i>
            Logout
          </a>
        </li>
      </ul>
      <hr class="my-4 md:min-w-full" />
    </div>
  </div>
</nav>
