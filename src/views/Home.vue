<template>
  <Nav />
  <NewTask @childNewTask="createNewTask" />

  <!-- -->
  <div class="flex flex-row justify-around mt-10">
    <div>
      <span class="text-white bg-indigo-500 px-4 py-2 rounded"
        >Total Tareas: {{ tasks.length }}</span
      >
    </div>
    <div>
      <span class="text-white bg-green-500 px-4 py-2 rounded"
        >Finalizadas : {{ completedTasks.length }}</span
      >
    </div>
    <div>
      <span class="text-white bg-rose-500 px-4 py-2 rounded"
        >Pendientes : {{ incompletedTasks.length }}</span
      >
    </div>
  </div>
  <div class="flex flex-wrap -mx-4 mt-24">
    <TaskItem
      v-for="task in tasks"
      :key="task"
      v-bind:taskData="task"
      @childDelete="deleteTask"
      @childUpdate="updateTask"
      @childEdit="editFather"
      @completeItem="changeComplete"
      @incompleteItem="changeIncomplete"
    />
  </div>
  <Footer />
</template>

<script setup>
import { ref } from "vue";

import Nav from "../components/Nav.vue";
import Footer from "../components/Footer.vue";
import NewTask from "../components/NewTask.vue";
import TaskItem from "../components/TaskItem.vue";
// importamos la función de las tareas en SupaBase desde la store
import { useTaskStore } from "../stores/task";

//Declaramos una variable en formato Array para guardar tareas
let tasks = ref([]);

//
let completedTasks = ref([]);
let incompletedTasks = ref([]);

//Definimos la tienda de tareas dentro de una variablepara poder utilizarla en este archivo de forma más limpia
let taskStore = useTaskStore();

//Creamos una función para conseguir las tareas de SupaBase
async function getTasksFromSupabase() {
  //Aquí es dónde nos traemos la tienda
  tasks.value = await taskStore.fetchTasks();
  //Aquí nos dice cuantas tareas tenemos completadas/incompletadas
  completedTasks.value = tasks.value.filter((task) => task.is_complete);
  incompletedTasks.value = tasks.value.filter((task) => !task.is_complete);

  // Aquí otra manera de solucionar el contador de tareas completadas e incompletadas con filter y arrow function
  // completedTasks.value = tasks.value.filter((task) => {
  //   if (task.is_complete === true) return task;
  // });
  // incompletedTasks.value = tasks.value.filter((task) => {
  //   if (task.is_complete === false) return task;
  // });

  console.log(tasks.value);
}
getTasksFromSupabase();

//Creamos función para crear nuevas tareas
async function createNewTask(title, description) {
  await taskStore.addTask(title, description);
  getTasksFromSupabase();
}

//Creamos una función async para borrar la tarea
async function deleteTask(task) {
  await taskStore.deleteTask(task.id);
  getTasksFromSupabase();
}

//Creamos una función async para actualizar la tarea
async function updateTask(task) {
  await taskStore.updateTask(task.title, task.description, task.id);
  getTasksFromSupabase();
}

async function changeComplete(task) {
  await taskStore.completeTask(task.id);
  console.log(task.id);
  console.log(task.is_complete);
  getTasksFromSupabase();
}

async function changeIncomplete(task) {
  // let booleanChange = !task.is_complete;
  let taskID = task.id;
  await taskStore.incompleteTask(taskID);
  getTasksFromSupabase();
  //console.log(booleanChange);
}

async function editFather(task) {
  let newTitle = task.title;
  let newDescription = task.description;
  let id = task.id;
  await taskStore.editTask(newTitle, newDescription, id);
  getTasksFromSupabase();
}
</script>

<style></style>

<!-- 
**Hints**
1. ref() is used here!
2. (NewTask, TaskItem, Footer, Nav) components are used here! 
3. Tasks are going to be contained in an array here!
4. An async function is needed to get all of the tasks stored within the supabase database, this async function's body will contain the tasks value which be use to store the fetchTasks method which lives inside the userTaskStore. This function needs to be called within the setUp script in order to run within the first instance of this component lifecycle.
5. NewTask component will receive a customEvent on this instance of the homeView that will fire the add-to-do function
6. add-to-do function will receive 2 params/arguments that will tak a taskTitle and a taskDescription and the body of this async function will call the taskStore that calls the addTask function from the store that pushes the info of the task to the backEnd. This is possible by passing the 2 param/arguments that will be passed by the user from the inputs within the NewTask Component. 
7. TaskItem component will loop through the tasks-array that will print an individual instance of an individual TaskItem component. TaskItem will receive 3 customEvents on this instance of the homeView. 1 customEvent for toggling the task to show either a text or an icon to display if the task is completed or not completed. 1 customEevent for removing/deleting the task out of the array. 1 customEvent for editing the task title and description. This function needs to call the function mentioned on hint4.
7.1-customEvent will fire an async function that will take in 1 param/argument. On the body of this function the param/argument will be used to define 2 constants. 1 of this constants will take care of setting the boolean value to the opposite of the value that checks wether this task is_complete. 1 of this constants will take of calling the id of this specific task in order to call the right id. 
7.2-customEvent will fire an asynf function that will take in 1 param/argument. This async function's body will be used to call the deleteTaskmethod which will take the param/argument's id in order to delete the task. This function needs to call the function mentioned on hint4. 
7.3-customEvent will fire an async function that will take in 1 param/argument. this async function's body will be used to take in 2 constants. 1 constant will take in the param/argument newValue. 1 constant will be used to get the param/argument oldValue id. These 2 constants will be sent to the backend via the useTaskStore which holds an editTask method. This function needs to call the function mentioned on hint4.
-->
