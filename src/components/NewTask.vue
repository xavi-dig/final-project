<template>
  <section class="pt-4">
    <div class="container px-4 mx-auto">
      <div
        class="max-w-4xl mx-auto text-center animate__animated animate__fadeIn"
      >
        <span
          class="inline-block py-px px-2 mb-4 text-xs leading-5 text-blue-500 bg-blue-100 font-medium rounded-full shadow-sm"
          >TASK</span
        >
        <h2
          class="mb-4 text-4xl md:text-5xl leading-tight text-coolGray-900 font-bold tracking-tighter"
        >
          Añade una nueva Tarea
        </h2>
        <p class="text-lg md:text-xl text-coolGray-500 font-medium">
          Organiza tu día. ¡Aumenta tu productividad desde Ya!
        </p>
        <p class="mb-10 text-lg text-coolGray-900 font-medium">
          Hoy es {{ hoy }}
        </p>
        <div class="mb-6">
          <div class="flex flex-col px-4">
            <input
              class="inputField-nr mb-4 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-transparent"
              placeholder="Añade un Título a tu tarea - Leer el mito de la caverna de Platón"
              type="text"
              name="newTodo"
              id="name"
              v-model="taskTitle"
            />
            <!-- v-model, almacena el input en una variable pre-definida (vacía, sino lo está, lo sobre-escribe) -->
            <input
              class="inputField-nr mb-4 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-transparent"
              placeholder="Añade una Descripción de tu Tarea - Comprar el libro 'La República' de Platón y buscar Cap.VII"
              type="text"
              name="newDescription"
              id="description"
              v-model="taskDesc"
            />

            <button
              @click.prevent="onInput"
              class="inline-block py-2 px-4text-sm leading-5 text-blue-50 bg-sky-600 hover:bg-sky-500 font-medium focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 rounded-md"
              type="submit"
            >
              Añadir
            </button>
          </div>
        </div>
        <div>
          <h3 v-if="errorBool">{{ emptyString }}</h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
// importamos moment.js y definimos idioma
import moment from "moment";
import "moment/locale/es";
import { supabase } from "../supabase";
import { useTaskStore } from "../stores/task.js";
const emit = defineEmits(["childNewTask"]);
let taskTitle = ref("");
let taskDesc = ref("");
let errorBool = ref(false);
const emptyString = ref("");
function onInput() {
  if (taskTitle.value === "") {
    errorBool.value = true;
    emptyString.value = "Title is required.";
    setTimeout(() => {
      errorBool.value = false;
    }, 2000);
  } else {
    emit("childNewTask", taskTitle.value, taskDesc.value);
    taskTitle.value = "";
    taskDesc.value = "";
    console.log(taskTitle.value);
  }
}

//mostramos fecha pero no conseguimos ponerla en ESP
moment.locale("es");

const fecha = Date.now(); // obtenemos la fecha actual
const hoy = moment(fecha).format("D MMMM YYYY"); // 16 Febrero 2021

// async function uploadTask() {
//   const { data, error } = await supabase.from("tasks").insert([
//     {
//       user_id: "5fa3d22c-892b-44fc-a3a6-efc7e5503032",
//       title: taskTitle.value,
//       description: taskDesc.value,
//       is_complete: false,
//     },
//   ]);
// }

// constant to save a variable that define the custom event that will be emitted to the homeView

// constant to save a variable that holds the value of the title input field of the new task

// constant to save a variable that holds the value of the description input field of the new task

// constant to save a variable that holds an initial false boolean value for the errorMessage container that is conditionally displayed depending if the input field is empty

// const constant to save a variable that holds the value of the error message

// arrow function to call the form holding the task title and task description that uses a conditional to first checks if the task title is empty, if true the error message is displayed through the errorMessage container and sets a timeOut method that hides the error after some time. Else, its emmits a custom event to the home view with the task title and task description; clears the task title and task description input fields.
</script>

<style></style>
