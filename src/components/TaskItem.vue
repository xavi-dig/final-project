<template>
  <div
    class="w-full md:w-1/2 lg:w-1/3 px-4 mb-16 animate__animated animate__fadeInUp"
  >
    <div class="group h-full">
      <div
        class="group relative h-full px-8 pt-16 pb-8 bg-blue-200 rounded-md shadow-md hover:shadow-xl transition duration-200"
      >
        <div
          class="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 inline-flex h-16 w-16 items-center justify-center bg-white rounded-full transition duration-200"
        >
          <div
            class="inline-flex items-center justify-center w-12 h-12 text-white bg-green-500 rounded-full p-3"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              ></path>
            </svg>
          </div>
        </div>

        <input
          v-if="editInput"
          :placeholder="errorMessage"
          type="text"
          class="inputField mb-4"
          v-model="editTitle"
        />
        <h3
          v-else
          class="mb-4 text-xl leading-7 text-coolGray-900 font-bold max-w-xs"
        >
          {{ taskData.title }}
        </h3>
        <p v-if="editInput">
          <input
            type="text"
            class="inputField mb-4"
            v-model="editDescription"
          />
          <button
            @click="edit"
            class="w-full py-2 px-4 text-sm leading-5 text-blue-50 bg-blue-800 hover:bg-blue-700 font-medium focus:ring-2 focus:ring-blue-800 focus:ring-opacity-50 rounded-md"
            type="submit"
          >
            Apply
          </button>
        </p>

        <p
          v-else
          class="text-coolGray-500 group-hover:text-coolGray-600 font-medium transition duration-200"
        >
          {{ taskData.description }}
        </p>
        <div class="flex justify-between pt-4">
          <button
            v-if="!completeBooleanValue"
            title="Marcar Tarea como Completada"
            @click="completeItem"
            class="text-white p-2 rounded bg-green-600 hover:bg-green-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </button>

          <button
            v-if="completeBooleanValue"
            title="Marcar Tarea como No Completada"
            @click="incompleteItem"
            class="text-white p-2 rounded bg-red-600 hover:bg-red-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </button>

          <button
            title="Editar Tarea"
            @click="toggleEdit"
            class="text-white p-2 rounded bg-yellow-400 hover:bg-yellow-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              ></path>
            </svg>
          </button>
          <button
            title="Eliminar Tarea"
            @click="childDelete"
            class="text-white p-2 rounded bg-rose-500 hover:bg-rose-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              aria-hidden="true"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useTaskStore } from "../stores/task";

//Creamos una variable booleana para monstrar u ocultar edit
let editInput = ref(false);

// Creamos otra variabale vacia para editar el input
let editTitle = ref("");
let editDescription = ref("");
//función que toogles la visibilidad del input
function toggleEdit() {
  editInput.value = !editInput.value;
  editTitle.value = props.taskData.title;
  editDescription.value = props.taskData.description;
}

//Creamos función
let errorMessage = ref("");
let errorContainer = ref(false);

function errorhandling() {
  //Tengo que probar si cambiando el orden funciona igual
  errorContainer.value = !errorContainer.value;
  errorMessage.value = "No puede estar vacio";
}

function edit() {
  if (editTitle.value === "") {
    errorhandling();
  } else {
    editInput.value = !editInput.value;
    errorContainer.value = !errorContainer.value;
    let oldToNew = {
      id: props.taskData.id,
      title: editTitle.value,
      description: editDescription.value,
    };
    emit("childEdit", oldToNew);
  }
}

const emit = defineEmits([
  "childDelete",
  "childUpdate",
  "childEdit",
  "completeItem",
  "incompleteItem",
]);

const props = defineProps(["taskData"]);

//Creamos una función para pasarle nuestro evento particular (custom) al padre para poder habilitar la eliminación (delete) de una tarea en particular. Esto se hace mediante un Emit.

function childUpdate() {
  emit("childUpdate", props.taskData);
}
// Reference for future
// function childDelete() {
//   emit("le pasaremos el nombre del emit que queremos usar" , los valores del prop, o lo que queremos enviar )
// }

function childDelete() {
  emit("childDelete", props.taskData);
}

const completeBooleanValue = ref(false);

function completeItem() {
  emit("completeItem", props.taskData);
  completeBooleanValue.value = !completeBooleanValue.value;
}

function incompleteItem() {
  emit("incompleteItem", props.taskData);
  completeBooleanValue.value = !completeBooleanValue.value;
}

async function checkStatus() {
  let status = await useTaskStore().checkStatus(props.taskData.id);
  if (status) {
    completeBooleanValue.value = true;
  } else {
    completeBooleanValue.value = false;
  }
  // console.log("find checkStatus");
}
checkStatus();
</script>

<style></style>

<!-- 
**Hints**
1. ref() or reactive() can be used here to store the following, think if you want to store them either individually or like an object, up to you.
2. Data properties need here are the following: a boolean to store a false**Important variable, a string to store an error, a string to store the value of the task that the user can edit, an initial false boolean to hide the inputFIeld used to edit the new task detail or details[this is in reference of the task title and the task description].
3. Store the custom emit events that will be used to call the functions of the homeView for editing, deleting and toggling the status[completed, not complted] of the taskItem.
4. Function to handle the error with the data properties used to control the error and the the boolean controlling the boolean empty variable.
5. Function to handle the edit dialogue where the inputField is displayed and the string used to store the value of the inputField will be used here to save the value as a prop on this function.
6. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the toggle completion of the task on the homeview.
7. Function to edit the task information that you decided that the user can edit. This function's body takes in a conditional that first checks if the value of the task [either title and description or just title] is empty which if true it runs the function used to handle the error on hint4. Else, the conditional sets the first mentioned boolean data property on hint2 back to its inital boolean value to hide the error message and repeat the same for the data property mentioned 4th on hint2; a constant that stores an object that holds the oldValue from the prop item and the value of the task coming from the data property mentioned 3rd on hint2; a custom event emit() that takes 2 parameters a name for the custom event and the value from the object used on this part of the conditional and lastly this part of the conditional sets the value of input field to an empty string to clear it from the ui. 
8. Function to emmit a custom event emit() that takes 2 parameters a name for the custom event and the value that will be send via the prop to the parent component. This function can control the removal of  the task on the homeview.
-->
