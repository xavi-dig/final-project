<template>
  <div
    id="authView"
    class="flex flex-col flex-wrap items-center -mx-4 mt-24 md:bg-[url('../assets/2152177.png')] bg-no-repeat bg-auth pb-40 sm:bg-none"
  >
    <a href="/" class="flex items-center mb-12"
      ><img
        src="https://flowbite.com/docs/images/logo.svg"
        class="mr-3 h-6 sm:h-9"
        alt="TaskApp Logo"
      />
      <span class="self-center text-xl font-semibold whitespace-nowrap"
        >TaskApp</span
      ></a
    >
    <router-view></router-view>
  </div>
</template>

<script setup></script>

<style>
.bg-auth {
  background-size: 35%;
  background-position: 0% 120%;
}
</style>

<!-- 
**noHints**
-->
