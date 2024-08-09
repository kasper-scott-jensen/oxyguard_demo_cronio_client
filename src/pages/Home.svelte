<script>
  import IndexNavbar from "../components/navbar/IndexNavbar.svelte";
  import IndexFooter from "../components/footer/IndexFooter.svelte";

  import { scrollToAnchor } from "../scripts/utility";

  const patternVue = "src/assets/images/pattern_svelte.png";
  const performanceStock = "src/assets/images/performance.jpg";
  const productCard1 = "src/assets/images/product_card_1.png";
  const productCard2 = "src/assets/images/product_card_2.png";
  const productCard3 = "src/assets/images/product_card_3.png";
  const schedulingStock = "src/assets/images/scheduling_stock.jpg";
</script>

<IndexNavbar />
<section id="top"></section>
<section class="header relative pt-16 items-center flex h-screen max-h-860-px">
  <div class="container mx-auto items-center flex flex-wrap">
    <div class="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
      <div class="pt-32 sm:pt-0">
        <h2 class="font-semibold text-4xl text-blueGray-600">
          Cronio - Prepare for anything.
        </h2>
        <p class="mt-4 text-lg leading-relaxed text-blueGray-500">
          Cronio is a scheduling application that can be customized to suit any
          and all of your needs. Join today and experience a fast and easy tool
          to optimize your everyday life.
        </p>
        <div class="mt-12">
            <a
              on:click={scrollToAnchor}
              href="#contact"
              target="_blank"
              class="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-red-400 active:bg-red-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
            >
              Get started
            </a>
          <a
            on:click={scrollToAnchor}
            href="#features"
            class="github-star ml-1 text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
            target="_blank"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  </div>
  <img
    class="absolute top-0 b-auto right-0 pt-16 sm:w-6/12 -mt-48 sm:mt-0 w-10/12 max-h-860-px"
    src={patternVue}
    alt="..."
  />
</section>
<section id="features"></section>
<section class="mt-48 md:mt-40 pb-40 relative bg-blueGray-100">
  <div
    class="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
    style="transform: translateZ(0);"
  >
    <svg
      class="absolute bottom-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      version="1.1"
      viewBox="0 0 2560 100"
      x="0"
      y="0"
    >
      <polygon
        class="text-blueGray-100 fill-current"
        points="2560 0 2560 100 0 100"
      ></polygon>
    </svg>
  </div>
  <div class="container mx-auto">
    <div class="flex flex-wrap items-center">
      <div
        class="w-10/12 md:w-6/12 lg:w-4/12 px-12 md:px-4 mr-auto ml-auto -mt-32"
      >
        <div
          class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg bg-red-400"
        >
          <img
            alt="..."
            src={schedulingStock}
            class="w-full align-middle rounded-t-lg object-contain"
          />
          <blockquote class="relative p-8 mb-4">
            <svg
              preserveAspectRatio="none"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 583 95"
              class="absolute left-0 w-full block h-95-px -top-94-px"
            >
              <polygon
                points="-30,95 583,95 583,65"
                class="text-red-400 fill-current"
              ></polygon>
            </svg>
            <h4 class="text-xl font-bold text-white">
              Great for every project
            </h4>
            <p class="text-md font-light mt-2 text-white">
              Putting together a schedule has never been easier than with
              Cronio. Everything from check-in to check-out in one place.<br />
              Happy planning!
            </p>
          </blockquote>
        </div>
      </div>
      <div class="w-full md:w-6/12 px-4">
        <div class="flex flex-wrap">
          <div class="w-full md:w-6/12 px-4">
            <div class="relative flex flex-col mt-4">
              <div class="px-4 py-5 flex-auto">
                <div
                  class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white"
                >
                  <i class="fas fa-newspaper"></i>
                </div>
                <h6 class="text-xl mb-1 font-semibold">Scheduling</h6>
                <p class="mb-4 text-blueGray-500">
                  Pretty and easy-to-understand overviews of your employees'
                  schedules.
                </p>
              </div>
            </div>
            <div class="relative flex flex-col min-w-0">
              <div class="px-4 py-5 flex-auto">
                <div
                  class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white"
                >
                  <i class="fas fa-comments"></i>
                </div>
                <h6 class="text-xl mb-1 font-semibold">Communication</h6>
                <p class="mb-4 text-blueGray-500">
                  We feature an internal communcations system. Get chatting!
                </p>
              </div>
            </div>
          </div>
          <div class="w-full md:w-6/12 px-4">
            <div class="relative flex flex-col min-w-0 mt-4">
              <div class="px-4 py-5 flex-auto">
                <div
                  class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white"
                >
                  <i class="fas fa-credit-card"></i>
                </div>
                <h6 class="text-xl mb-1 font-semibold">Payment</h6>
                <p class="mb-4 text-blueGray-500">
                  View and control payments directly from the application. No
                  more scattered wages.
                </p>
              </div>
            </div>
            <div class="relative flex flex-col min-w-0">
              <div class="px-4 py-5 flex-auto">
                <div
                  class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-white"
                >
                  <i class="fas fa-chart-bar"></i>
                </div>
                <h6 class="text-xl mb-1 font-semibold">Statistics</h6>
                <p class="mb-4 text-blueGray-500">
                  Keep a close eye on every nook and cranny. Noone escapes the
                  Eye of Sauron.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto px-4 pb-32 pt-48">
      <div class="items-center flex flex-wrap">
        <div class="w-full md:w-5/12 ml-auto px-12 md:px-4">
          <div class="md:pr-12">
            <div
              class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white"
            >
              <i class="fas fa-signal text-xl"></i>
            </div>
            <h3 class="text-3xl font-semibold">Unparalleled Performance</h3>
            <p class="mt-4 text-lg leading-relaxed text-blueGray-500">
              Cronio is powered by Node.js, Svelte and Tailwind. Due to its
              modular nature, it is incredibly fast and reliable. Never again
              will you be met with a loading screen and frustration. You WILL be
              impressed - or have your money returned.
            </p>
            <ul class="list-none mt-6">
              <li class="py-2">
                <div class="flex items-center">
                  <div>
                    <span
                      class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3"
                    >
                      <i class="fas fa-fingerprint"></i>
                    </span>
                  </div>
                  <div>
                    <h4 class="text-blueGray-500">
                      Built by workers for workers
                    </h4>
                  </div>
                </div>
              </li>
              <li class="py-2">
                <div class="flex items-center">
                  <div>
                    <span
                      class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3"
                    >
                      <i class="fab fa-html5"></i>
                    </span>
                  </div>
                  <div>
                    <h4 class="text-blueGray-500">
                      Carefully crafted for performance
                    </h4>
                  </div>
                </div>
              </li>
              <li class="py-2">
                <div class="flex items-center">
                  <div>
                    <span
                      class="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blueGray-500 bg-blueGray-50 mr-3"
                    >
                      <i class="far fa-paper-plane"></i>
                    </span>
                  </div>
                  <div>
                    <h4 class="text-blueGray-500">
                      Full customizability and life-long guarantee
                    </h4>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="w-full md:w-6/12 mr-auto px-4 pt-24 md:pt-0">
          <img
            alt="..."
            class="max-w-full rounded-lg shadow-xl"
            style="
              transform: scale(1) perspective(1040px) rotateY(-11deg)
                rotateX(2deg) rotate(2deg);
            "
            src={performanceStock}
          />
        </div>
      </div>
    </div>
    <section id="pricing"></section>
    <div class="justify-center text-center flex flex-wrap mt-24">
      <div class="w-full md:w-6/12 px-12 md:px-4">
        <h2 class="font-semibold text-4xl">Choose Your Plan</h2>
        <p class="text-lg leading-relaxed mt-4 mb-4 text-blueGray-500">
          Cronio is built with modularity in mind. Choose a plan that perfectly
          suits your needs - it could not be easier!
        </p>
      </div>
    </div>
  </div>
</section>
<section class="block relative z-1 bg-blueGray-600">
  <div class="container mx-auto">
    <div class="justify-center flex flex-wrap">
      <div class="w-full lg:w-12/12 px-4 -mt-24">
        <div class="flex flex-wrap">
          <div class="w-full lg:w-4/12 px-4">
            <h5 class="text-xl font-semibold pb-4 text-center">"Free"</h5>
            <div
              class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150"
            >
              <img
                alt="..."
                class="align-middle border-none max-w-full h-auto rounded-lg"
                src={productCard1}
              />
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4">
            <h5 class="text-xl font-semibold pb-4 text-center">Premium</h5>
            <div
              class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150"
            >
              <img
                alt="..."
                class="align-middle border-none max-w-full h-auto rounded-lg"
                src={productCard2}
              />
            </div>
          </div>
          <div class="w-full lg:w-4/12 px-4">
            <h5 class="text-xl font-semibold pb-4 text-center">Enterprise</h5>
            <div
              class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150"
            >
              <img
                alt="..."
                class="align-middle border-none max-w-full h-auto rounded-lg"
                src={productCard3}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
<section id="about"></section>
<section class="py-20 bg-blueGray-600 overflow-hidden">
  <div class="container mx-auto pb-64">
    <div class="flex flex-wrap justify-center">
      <div class="w-full md:w-5/12 px-12 md:px-4 ml-auto mr-auto md:mt-64">
        <div
          class="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white"
        >
          <i class="fas fa-code-branch text-xl"></i>
        </div>
        <h3 class="text-3xl mb-2 font-semibold leading-normal text-white">
          Cronio & Me
        </h3>
        <p
          class="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-400"
        >
          Cronio is a scheduling application made for the final exam of my
          education. It is a project i feel strongly about and will continue to
          develop post-exam. Feel free to bring any good ideas to my attention.
        </p>
        <p
          class="text-lg font-light leading-relaxed mt-0 mb-4 text-blueGray-400"
        >
          The source code can be downloaded from GitHub upon request.
        </p>
        <a
          href="https://github.com/kasperscottjensen"
          target="_blank"
          class="github-star mt-4 inline-block text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-700 active:bg-blueGray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
        >
          Github Repository
        </a>
      </div>

      <div class="w-full md:w-4/12 px-4 mr-auto ml-auto mt-32 relative">
        <i
          class="fab fa-github text-blueGray-700 text-55 absolute -top-150-px -right-100 left-auto opacity-80"
        ></i>
      </div>
    </div>
  </div>
</section>
<section class="pb-16 bg-blueGray-200 relative pt-32">
  <div
    class="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20"
    style="transform: translateZ(0);"
  >
    <svg
      class="absolute bottom-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      version="1.1"
      viewBox="0 0 2560 100"
      x="0"
      y="0"
    >
      <polygon
        class="text-blueGray-200 fill-current"
        points="2560 0 2560 100 0 100"
      ></polygon>
    </svg>
  </div>
  <section id="contact"></section>
  <div class="container mx-auto">
    <div
      class="flex flex-wrap justify-center bg-white shadow-xl rounded-lg -mt-64 py-16 px-12 relative z-10"
    >
      <div class="w-full text-center lg:w-8/12">
        <p class="text-4xl text-center">
          <span role="img" aria-label="love"> 😍 </span>
        </p>
        <h3 class="font-semibold text-3xl">Do you love this application?</h3>
        <p class="text-blueGray-500 text-lg leading-relaxed mt-4 mb-4">
          Cause if you do, it can be yours now. Hit the button below to navigate
          to get started straight away! If you snooze, you loose!
        </p>
        <div class="sm:block flex flex-col mt-10">
          <a
            href="mailto:cronioofficial@gmail.com"
            target="_blank"
            class="get-started text-white font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-2 bg-red-400 active:bg-red-500 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
          >
            Contact Us Now
          </a>
        </div>
        <div class="text-center mt-16"></div>
      </div>
    </div>
  </div>
</section>
<IndexFooter />
