<template>
  <nav class="bg-white px-2 py-4">
    <div class="container flex flex-wrap justify-between items-center mx-auto">
      <a href="/" class="flex items-center">
        <img
          class="mr-3 h-6 sm:h-9"
          src="https://res.cloudinary.com/dnsnkrcru/image/upload/v1648481844/taskApp/imgs/logo-small_bh8xj2.svg"
          alt="Task App"
        />
      </a>

      <button
        data-collapse-toggle="mobile-menu"
        type="button"
        class="inline-flex items-center p-2 ml-3 text-sm text-green-800 rounded-lg md:hidden hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-800"
        aria-controls="mobile-menu"
        aria-expanded="false"
      >
        <svg
          class="w-6 h-6"
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

      <div id="mobile-menu" class="hidden w-full md:block md:w-auto">
        <ul
          class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium"
        >
          <li class="flex items-center justify-center">
            <p class="text-center py-2 pr-4 pl-3 text-gray-700 md:p-0">
              Welcome Back
              <span class="font-bold">xromero82</span>
            </p>
          </li>
          <li class="flex justify-center pt-4 md:pt-0">
            <button
              type="submit"
              class="ml-8 py-2 px-4 text-sm text-green-50 bg-green-800 hover:bg-green-700 font-medium focus:ring-2 focus:ring-green-800 focus:ring-opacity-50 rounded-md"
            >
              Log Out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div>Nav Component</div>
</template>

<script setup>
//constant to save a variable that will hold the use router method

// constant to save a variable that will get the user from store with a computed function imported from vue

// constant that calls user email from the useUSerStore

// constant that saves the user email and cleans out the @client from the user

// async function that calls the signOut method from the useUserStore and pushes the user back to the Auth view.
</script>

<style></style>
