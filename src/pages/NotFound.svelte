<script>
    import AuthFooter from "../components/footer/AuthFooter.svelte";

    const registerBg2 = "src/assets/images/register_bg_2.png";
</script>

<div>
    <main>
      <section class="relative w-full h-full py-40 min-h-screen">
        <div
          class="absolute top-0 w-full h-full bg-blueGray-800 bg-no-repeat bg-full"
          style="background-image: url({registerBg2});"
        ></div>
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full h-full lg:w-6/12 px-4">
              <div
                class="relative flex flex-col min-w-0 break-words w-full h-full mb-6 rounded-lg border-0 text-center items-center"
              >
              <h2 class="font-semibold text-4xl text-blueGray-300 mt-24">
                Woops!
              </h2>
              <p class="mt-4 text-lg leading-relaxed text-blueGray-400">
                It looks like that you tried to reach a site that does not exist.
              </p>
              </div>
            </div>
          </div>
        </div>
        <AuthFooter absolute={true} />
      </section>
    </main>
  </div>
  
