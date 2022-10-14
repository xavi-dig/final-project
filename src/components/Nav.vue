<template>
  <nav
    class="flex justify-between bg-white border-blue-200 px-2 sm:px-4 py-2.5 rounded"
  >
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <a href="/" class="flex items-center">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          class="mr-3 h-6 sm:h-9"
          alt="TaskApp Logo"
        />
        <span class="self-center text-xl font-semibold whitespace-nowrap"
          >TaskApp</span
        >
      </a>

      <div class="hidden w-full md:block md:w-auto">
        <ul
          class="flex flex-col items-center p-4 mt-4 bg-blue-50 rounded-lg border border-blue-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:border-blue-700"
        >
          <li>
            <p class="text-center py-2 pr-4 pl-3 text-gray-700 md:p-0">
              Bienvenido 🫶
              <span class="font-bold text-blue-500">{{ userSingIn }}</span>
            </p>
          </li>

          <li>
            <a
              href="#"
              class="block py-2 pr-4 pl-3 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
              ><button
                type="submit"
                @click.prevent="signOut"
                class="ml-8 py-2 px-4 text-sm text-blue-50 bg-blue-800 hover:bg-blue-700 font-medium focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50 rounded-md"
              >
                Log Out
              </button></a
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="md:hidden" @click="changeClickBurger">
      <button
        class="text-blue-500 w-10 h-10 relative focus:outline-none bg-white"
      >
        <div
          class="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <span
            aria-hidden="true"
            class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
            :class="{
              'rotate-45': clickBurger,
              ' -translate-y-1.5': !clickBurger,
            }"
          ></span>
          <span
            aria-hidden="true"
            class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
            :class="{ 'opacity-0': clickBurger }"
          ></span>
          <span
            aria-hidden="true"
            class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
            :class="{
              '-rotate-45': clickBurger,
              ' translate-y-1.5': !clickBurger,
            }"
          ></span>
        </div>
      </button>
    </div>
  </nav>
  <nav
    v-if="weAreMobile"
    class="rounded-lg bg-blue-50 border border-blue-100"
    :class="
      clickBurger
        ? 'transition-all ease-out duration-500 h-24'
        : 'transition-all ease-in duration-500 h-0 border-0'
    "
  >
    <ul
      class="duration-300 ease-out"
      :class="clickBurger ? 'transition-all ease-out duration-500' : 'hidden'"
    >
      <li>
        <p class="text-center py-2 pr-4 pl-3 text-gray-700 md:p-0">
          Bienvenido 🫶
          <span class="font-bold text-blue-500">{{ userSingIn }}</span>
        </p>
      </li>
      <li>
        <a
          href="#"
          class="block py-2 pr-4 pl-3 text-center text-gray-700 rounded md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0"
          ><button
            type="submit"
            @click.prevent="signOut"
            class="py-2 px-4 text-sm text-blue-50 bg-blue-800 hover:bg-blue-700 font-medium focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50 rounded-md"
          >
            Log Out
          </button></a
        >
      </li>
    </ul>
  </nav>
</template>

<script setup>
import router from "../router";
import { useUserStore } from "../stores/user";
import { ref, watchEffect } from "vue";

const userStore = useUserStore();

const getUser = userStore.user.email;
const userSingIn = getUser.substring(0, getUser.indexOf("@"));

async function signOut() {
  router.push({ path: "/auth/login" });
  await userStore.signOut();
}

const clickBurger = ref(false);

function changeClickBurger() {
  clickBurger.value = !clickBurger.value;
}

const weAreMobile = ref(true);

function areWeMobile() {
  //console.log(window.screen.width);
  //console.log(window.innerWidth);
  if (window.innerWidth < 768) {
    //console.log("Soy móvil");
    weAreMobile.value = true;
  } else {
    //console.log("No soy móvil");
    weAreMobile.value = false;
  }
  //console.log(weAreMobile);
}

window.addEventListener("resize", () => {
  areWeMobile();
});

//constant to save a variable that will hold the use router method

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
</script>

<style></style>
