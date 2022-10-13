<template>
  <div class="bg-blue-50 rounded px-12 py-6 shadow-md">
    <p class="my-4 font-bold text-center">Inicia sesión en TaskApp</p>
    <p v-if="errorMsg" class="">
      {{ errorMsg }}
    </p>
    <form @submit.prevent="signIn">
      <div class="">
        <!-- <label class="" for="">Email</label> -->
        <input
          class="inputField mb-4"
          type="email"
          placeholder="Introduce tu e-mail"
          v-model="email"
          id="email"
        />
      </div>
      <div class="mb-4">
        <!-- <label class="" for="">Password</label> -->

        <div class="relative flex w-full flex-wrap items-stretch mb-3">
          <input
            class="inputField mb-4"
            :type="passwordFieldType"
            onpaste="return false"
            placeholder="Introduce tu contraseña"
            v-model="password"
            id="password"
          />
          <span class="z-10 h-full absolute w-8 right-0 bottom-1 pr-3 py-4">
            <EyeIcon @click.prevent="hidePassword = !hidePassword" />
          </span>
        </div>
      </div>

      <button
        class="w-full py-2 px-4 text-sm leading-5 text-blue-50 bg-blue-800 hover:bg-blue-700 font-medium focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50 rounded-md"
        type="submit"
      >
        Iniciar Sesión
      </button>
      <p class="my-4 font-medium text-center">
        <PersonalRouter :route="route" :buttonText="buttonText" />
        <span class=""> para crear tu cuenta</span>
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import PersonalRouter from "./PersonalRouter.vue";
import { supabase } from "../supabase";
import { useRouter } from "vue-router";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import { BeakerIcon, EyeIcon } from "@heroicons/vue/24/solid";

// Route Variables
const route = "/auth/sign-up";
const buttonText = "Registrate";

// Input Fields
const email = ref("");
const password = ref("");

// Error Message
const errorMsg = ref("");

//Show hide password variables
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);
const hidePassword = ref(true);

// Router to push user once SignedIn to the HomeView
const redirect = useRouter();

// Arrow function to Signin user to supaBase
const signIn = async () => {
  try {
    // calls the user store and send the users info to backend to logIn
    await useUserStore().signIn(email.value, password.value);
    // redirects user to the homeView
    redirect.push({ path: "/" });
  } catch (error) {
    // displays error message
    errorMsg.value = `Error: ${error.message}`;
    // hides error message
    setTimeout(() => {
      errorMsg.value = null;
    }, 5000);
  }
};
</script>

<style>
.wu-text {
  color: black;
}

.form {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;
}
.input {
  color: black;
  margin-bottom: 1rem;
}
.button {
  background-color: rgb(30 64 175);
  border: none;
  color: white;
  padding: 10px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
