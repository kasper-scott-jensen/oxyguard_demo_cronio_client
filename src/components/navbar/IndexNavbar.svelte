<script>
  import { link, Link } from "svelte-routing";

  import { scrollToAnchor } from "../../scripts/utility";

  let navbarOpen = false;

  function setNavbarOpen() {
    navbarOpen = !navbarOpen;
  }
</script>

<nav
  class="top-0 fixed z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-white shadow"
>
  <div
    class="container px-4 mx-auto flex flex-wrap items-center justify-between"
  >
    <div
      class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start"
    >
      <a
        use:link
        class="text-blueGray-700 text-lg font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
        href="/"
      >
        Cronio
      </a>
      <button
        class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
        type="button"
        on:click={setNavbarOpen}
      >
        <i class="fas fa-bars"></i>
      </button>
    </div>
    <div
      class="lg:flex flex-grow items-center {navbarOpen ? 'block' : 'hidden'}"
      id="example-navbar-warning"
    >
      <ul class="flex flex-col lg:flex-row list-none mr-auto">
        <li class="flex items-center">
          <a
            class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
            href="#features"
            on:click={scrollToAnchor}
          >
            <i
              class="text-blueGray-400 far fa-chart-bar text-lg leading-lg mr-2"
            />
            Features
          </a>
        </li>
        <li class="flex items-center">
          <a
            class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
            href="#pricing"
            on:click={scrollToAnchor}
          >
            <i
              class="text-blueGray-400 far fa-credit-card text-lg leading-lg mr-2"
            />
            Pricing
          </a>
        </li>
        <li class="flex items-center">
          <a
            class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
            href="#about"
            on:click={scrollToAnchor}
          >
            <i
              class="text-blueGray-400 far fa-address-book text-lg leading-lg mr-2"
            />
            About
          </a>
        </li>
        <li class="flex items-center">
          <a
            class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
            href="#contact"
            on:click={scrollToAnchor}
          >
            <i
              class="text-blueGray-400 far fa-address-book text-lg leading-lg mr-2"
            />
            Contact
          </a>
        </li>
      </ul>
      <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
        <li class="flex items-center">
        </li>
        <li class="flex items-center">
          <a
            class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
            href="https://www.facebook.com/"
            target="_blank"
          >
            <i class="text-blueGray-400 fab fa-facebook text-lg leading-lg" />
          </a>
        </li>

        <li class="flex items-center">
          <a
            class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
            href="https://x.com/"
            target="_blank"
          >
            <i class="text-blueGray-400 fab fa-twitter text-lg leading-lg" />
          </a>
        </li>

        <li class="flex items-center">
          <a
            class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
            href="https://instagram.com/"
            target="_blank"
          >
            <i class="text-blueGray-400 fab fa-instagram-square text-lg leading-lg" />
          </a>
        </li>

        <li class="flex items-center">
          <a
            class="hover:text-blueGray-500 text-blueGray-700 px-3 py-2 flex items-center text-xs uppercase font-bold"
            href="https://github.com/"
            target="_blank"
          >
            <i class="text-blueGray-400 fab fa-github text-lg leading-lg" />
          </a>
        </li>
        <li class="flex items-center">
          <Link to={"/login"}>
            <button
              class="bg-red-400 text-white active:bg-red-500 text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3 ease-linear transition-all duration-150"
              type="button"
            >
              <i class="fas fa-user-circle pr-1"></i> LOGIN
            </button>
          </Link>
        </li>
      </ul>
    </div>
  </div>
</nav>
