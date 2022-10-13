<template>
  <nav class="bg-white border-blue-200 px-2 sm:px-4 py-2.5 rounded">
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
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center p-2 ml-3 text-sm text-blue-500 rounded-lg md:hidden hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-200 dark:text-blue-400 dark:hover:bg-blue-700 dark:focus:ring-blue-600"
        aria-controls="navbar-default"
        aria-expanded="false"
      >
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
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
  </nav>
</template>

<script setup>
import router from "../router";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();

const getUser = userStore.user.email;
const userSingIn = getUser.substring(0, getUser.indexOf("@"));

async function signOut() {
  await userStore.signOut();
  router.push({ path: "/auth/login" });
}
//constant to save a variable that will hold the use router method

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
</script>

<style></style>
