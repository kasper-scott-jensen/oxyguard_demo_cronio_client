<script>
  import { userData } from "../../stores/userStore";
  import { updateUserData, updateUserAvatar, updateUserBanner } from "../../scripts/user";

  let firstName;
  let lastName;
  let department;
  let title;
  let bio;
  let email;
  let phone;
  let avatarUrl;
  let bannerUrl;

  $: userData.subscribe((value) => {
    firstName = value.firstName;
    lastName = value.lastName;
    department = value.department;
    title = value.title;
    bio = value.bio;
    email = value.email;
    phone = value.phone;
  });

  const handleSubmit = (event) => {
    const formDataEntries = new FormData(event.target).entries();
    const data = Object.fromEntries(formDataEntries);
    updateUserData(data);
    if (data.avatarFile && data.avatarFile.name) {
      updateUserAvatar(data.avatarFile)
    }
    if (data.bannerFile && data.bannerFile.name) {
      updateUserBanner(data.bannerFile)
    }
  };
</script>

<div
  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0"
>
  <div class="rounded-t bg-white mb-0 px-6 py-6">
    <div class="text-center flex justify-between">
      <h6 class="text-blueGray-700 text-xl font-bold">My Profile</h6>
    </div>
  </div>
  <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
    <form id="settings-form" on:submit|preventDefault={handleSubmit}>
      <div class="flex justify-end">
        <button
          class="mt-4 bg-red-400 text-white active:bg-red-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
          type="submit"
        >
          Save Changes
        </button>
      </div>
      <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
        User Information
      </h6>
      <div class="flex flex-wrap">
        <div class="w-full lg:w-6/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-username"
            >
              First Name
            </label>
            <input
              id="grid-username"
              type="text"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              bind:value={firstName}
              name="firstName"
              required
            />
          </div>
        </div>
        <div class="w-full lg:w-6/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-email"
            >
              Last Name
            </label>
            <input
              id="grid-email"
              type="text"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              bind:value={lastName}
              name="lastName"
              required
            />
          </div>
        </div>
        <div class="w-full lg:w-6/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-first-name"
            >
              Title
            </label>
            <input
              id="grid-first-name"
              type="text"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              bind:value={title}
              name="title"
              required
            />
          </div>
        </div>
        <div class="w-full lg:w-6/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-last-name"
            >
              Department
            </label>
            <input
              id="grid-last-name"
              type="text"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              bind:value={department}
              name="department"
              required
            />
          </div>
        </div>
      </div>

      <hr class="mt-6 border-b-1 border-blueGray-300" />

      <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
        Contact Information
      </h6>
      <div class="flex flex-wrap">
        <div class="w-full lg:w-6/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-city"
            >
              Email
            </label>
            <input
              id="grid-city"
              type="email"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-300 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              bind:value={email}
              name="email"
              required
              readonly
            />
          </div>
        </div>
        <div class="w-full lg:w-6/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-country"
            >
              Phone
            </label>
            <input
              id="grid-country"
              type="tel"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              bind:value={phone}
              name="phone"
              required
            />
          </div>
        </div>
      </div>

      <hr class="mt-6 border-b-1 border-blueGray-300" />

      <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
        About Me
      </h6>
      <div class="flex flex-wrap">
        <div class="w-full lg:w-12/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-about-me"
            >
              Bio
            </label>
            <textarea
              id="grid-about-me"
              type="text"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              rows="4"
              bind:value={bio}
              name="bio"
              required
            />
          </div>
        </div>
      </div>

      <hr class="mt-6 border-b-1 border-blueGray-300" />

      <h6 class="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
        Pictures
      </h6>
      <div class="flex flex-wrap">
        <div class="w-full lg:w-6/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-avatar"
            >
              Avatar
            </label>
            <input
              id="grid-avatar"
              type="file"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              bind:value={avatarUrl}
              name="avatarFile"
            />
          </div>
        </div>
        <div class="w-full lg:w-6/12 px-4">
          <div class="relative w-full mb-3">
            <label
              class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              for="grid-country"
            >
              Banner
            </label>
            <input
              id="grid-banner"
              type="file"
              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
              bind:value={bannerUrl}
              name="bannerFile"
            />
          </div>
        </div>
      </div>
    </form>
  </div>
</div>
