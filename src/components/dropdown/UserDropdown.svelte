<script>
  import { createPopper } from "@popperjs/core";
  import { Link } from "svelte-routing";
  import { logoutAttempt } from "../../scripts/authentication";
  import { userData } from '../../stores/userStore'

  let dropdownPopoverShow = false;

  let btnDropdownRef;
  let popoverDropdownRef;
  let avatarUrl;

  const toggleDropdown = (event) => {
    event.preventDefault()
    if (dropdownPopoverShow) {
      dropdownPopoverShow = false;
    } else {
      dropdownPopoverShow = true;
      createPopper(btnDropdownRef, popoverDropdownRef, {
        placement: "bottom-start",
      });
    }
  };

  function handleLogout() {
    logoutAttempt()
  }

  $: userData.subscribe((value) => {
    avatarUrl = value.avatarUrl;
  });
</script>

<div id="UserDropdown">
  <a
    class="text-blueGray-500 block"
    href="#"
    bind:this={btnDropdownRef}
    on:click={toggleDropdown}
  >
    <div class="items-center flex">
      <span
        class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
      >
        <img
          alt="..."
          class="w-full rounded-full align-middle border-none shadow-lg"
          src={avatarUrl}
        />
      </span>
    </div>
  </a>
  <div
    bind:this={popoverDropdownRef}
    class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48 {dropdownPopoverShow
      ? 'block'
      : 'hidden'}"
  >
    <Link to={"/profile"}>
      <a
        href="#"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        <i
          class="text-blueGray-400 fas fa-user-circle text-lg leading-lg mr-2"
        />
        Profile
      </a>
    </Link>
    <Link to={"/settings"}>
      <a
        href="#"
        class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
      >
        <i class="text-blueGray-400 fas fa-tools text-lg leading-lg mr-2" />
        Settings
      </a>
    </Link>
    <div class="h-0 my-2 border border-solid border-blueGray-100" />
    <a
      href="#"
      on:click|preventDefault={handleLogout}
      class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
    >
      <i class="text-blueGray-400 fas fa-arrow-right text-lg leading-lg mr-2" />
      Logout
    </a>
  </div>
</div>
