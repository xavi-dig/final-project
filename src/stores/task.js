import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
        .from("tasks")
        .select("*")
        .order("id", { ascending: false });
      this.tasks = tasks;
      return this.tasks;
    },
    // New code
    async addTask(title, description) {
      //console.log(useUserStore().user.id);
      const { data, error } = await supabase.from("tasks").insert([
        {
          user_id: useUserStore().user.id,
          title: title,
          is_complete: false,
          description: description,
        },
      ]);
    },

    // Función para borrar tarea de SupaBase
    // nos conectamos a supabase mediante una llamada de espera con el "await" y basicamente apuntamos a 3 metodos nativos de supabase.from() delete() match().
    //   from - es el nombre de la tabla en supabase que viene siendo nuestras tareas.
    //   delete - selfExplanotory
    // match - match se encarga de conectar el tipo de dato que queremos apuntar, en nuestro caso particular es el ID de la tarea que usamos para borrar dicha tarea
    async deleteTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .delete()
        .match({ id: id });
    },
    // Función para actualizar tarea de SupaBase
    async updateTask(title, description, id) {
      // console.log(title);
      // console.log(description);
      // console.log(id);

      const { data, error } = await supabase
        .from("tasks")
        .update({ title: title, description: description })
        .match({ id: id });
    },

    async editTask(title, description, id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ title: title, description: description })
        .match({ id: id });
    },

    // Cambiar nombre función toggle para eliminar una (son iguales)

    async completeTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: true })
        .match({ id: id });
      console.log("completeTask");
    },

    async incompleteTask(id) {
      const { data, error } = await supabase
        .from("tasks")
        .update({ is_complete: false })
        .match({ id: id });
      console.log("aquí estoy");
    },

    async checkStatus(id) {
      const { data, error } = await supabase
        .from("tasks")
        .select("is_complete")
        .match({ id: id });
      //console.log(data);
      return data[0].is_complete;
    },

    // async deleteAllTasks() {
    //   const { data, error } = await supabase
    //     .from("tasks")
    //     .delete()
    //     .eq("is_complete", false);
    // },
  },
});

//Hint
