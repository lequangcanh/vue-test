import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tasks: []
  },

  mutations: {
    fetchTasks (state, tasks) {
      state.tasks = tasks
    },
    updateTask (state, updatedTask) {
      const taskUpdate = state.tasks.find(task => task.id === updatedTask.id)
      taskUpdate.is_done = updatedTask.is_done
    }
  },

  getters: {
    finishedTasks (state) {
      return state.tasks.filter(task => task.is_done)
    },
    unfinishedTasks (state) {
      return state.tasks.filter(task => !task.is_done)
    }
  },

  actions: {
    fetchTasks (context) {
      axios.get('http://localhost:3000/api/tasks').then(
        response => { context.commit('fetchTasks', response.data.tasks) },
        error => alert(error)
      )
    },

    updateTask (context, taskParams) {
      const data = {task: {is_done: taskParams.value}}
      axios.put(`http://localhost:3000/api/tasks/${taskParams.task_id}`, data).then(
        response => { context.commit('updateTask', response.data.task) },
        error => alert(error)
      )
    }
  }
})
