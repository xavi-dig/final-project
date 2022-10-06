<template>
  <div
    class="flex flex-col flex-wrap items-center -mx-4 mt-24 md:bg-[url('../assets/2152177.png')] bg-no-repeat bg-auth pb-40 sm:bg-none"
  >
    <a href="/" class="flex items-center mb-12"
      ><img
        class="mr-3 h-6 sm:h-9"
        src="https://res.cloudinary.com/dnsnkrcru/image/upload/v1648481844/taskApp/imgs/logo-small_bh8xj2.svg"
        alt="Task App"
    /></a>
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
