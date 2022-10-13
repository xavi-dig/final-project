<template>
  <div class="bg-blue-50 rounded px-12 py-6 shadow-md">
    <p class="my-4 font-bold text-center">Crea tu cuenta en TaskApp</p>
    <p v-if="errorMsg" class="">
      {{ errorMsg }}
    </p>

    <form @submit.prevent="signUp">
      <div class="">
        <!-- <label class="" for="">Email</label> -->
        <input
          class="inputField inputFieldShadow mb-4"
          type="email"
          placeholder="Introduce tu e-mail"
          v-model="email"
          id="email"
        />
      </div>
      <div class="mb-4">
        <!-- <label class="" for="">Password</label> -->
        <input
          class="inputField inputFieldShadow mb-4"
          type="password"
          placeholder="Introduce tu contraseña"
          v-model="password"
          id="password"
        />
      </div>
      <div class="mb-4">
        <div class="relative flex w-full flex-wrap items-stretch mb-3">
          <!-- <label class="" for="">Confirm Password</label> -->
          <input
            class="inputField inputFieldShadow mb-4"
            type="password"
            placeholder="Confirma tu contraseña"
            v-model="confirmPassword"
            id="confirmPassword"
          />
          <span class="z-10 h-full absolute w-8 right-0 bottom-1 pr-3 py-4">
            <EyeIcon
              v-if="hidePassword"
              @click.prevent="hidePassword = false"
            />
            <EyeSlashIcon v-else @click.prevent="hidePassword = true" />
          </span>
        </div>
      </div>
      <button
        class="w-full py-2 px-4 text-sm leading-5 text-blue-50 bg-blue-800 hover:bg-blue-700 font-medium focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50 rounded-md"
        type="submit"
      >
        Registrate
      </button>
      <p class="my-4 font-medium text-center">
        <span class="">¿Tienes una cuenta? </span>
        <PersonalRouter :route="route" :buttonText="buttonText" />
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import PersonalRouter from "./PersonalRouter.vue";
import { useUserStore } from "../stores/user";
import { EyeIcon, EyeSlashIcon } from "@heroicons/vue/24/solid";
// Route Variables
const route = "/auth/login";
const buttonText = "Inicia Sesión";
// Input Fields
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const errorMsg = ref(null);

const hidePassword = ref(true);
const passwordFieldType = computed(() =>
  hidePassword.value ? "password" : "text"
);

// Error Message
// Show hide password variable
// Show hide confrimPassword variable
// Router to push user once SignedUp to Log In
const redirect = useRouter();
// function to SignUp user to supaBase with a timeOut() method for showing the error
async function signUp() {
  if (password.value === confirmPassword.value) {
    try {
      await useUserStore().signUp(email.value, password.value);
      // if (error) throw error;
      redirect.push({ path: "/auth/login" });
    } catch (error) {
      errorMsg.value = error.message;
      setTimeout(() => {
        errorMsg.value = null;
      }, 5000);
    }
    return;
  }
  errorMsg.value = "Las contraseñas no coinciden";
  setTimeout(() => {
    errorMsg.value = null;
  }, 5000);
}
</script>

<style></style>
