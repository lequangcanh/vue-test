<template>
  <div>
    <div>
      <ul class="collection">
        <task v-for="task in unfinishedTasks" :key="task.id" :task="task" @handleTask="update_task"/>
      </ul>
    </div>
    <div class="btn">Display finished tasks</div>
    <div id="finished-tasks" class="display_none">
      <ul class="collection">
        <task v-for="task in finishedTasks" :key="task.id" :task="task" @handleTask="update_task"/>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Task from '../components/tasks/Task'

export default {
  data: function () {
    return {
      tasks: []
    }
  },

  mounted: function () {
    this.fetchTasks()
  },

  components: {
    Task
  },

  computed: {
    finishedTasks: function () {
      return this.tasks.filter(task => task.is_done)
    },
    unfinishedTasks: function () {
      return this.tasks.filter(task => !task.is_done)
    }
  },

  methods: {
    fetchTasks: function () {
      axios.get('http://localhost:3000/api/tasks').then(
        response => { this.tasks = response.data.tasks },
        error => alert(error)
      )
    },

    update_task: function ({task, value}) {
      const data = {task: {is_done: value}}
      axios.put(`http://localhost:3000/api/tasks/${task.id}`, data).then(
        response => {
          const index = this.tasks.indexOf(task)
          this.tasks.splice(index, 1, response.data.task)
        },
        error => alert(error)
      )
    }
  }
}
</script>

<style>
  li {list-style-type: none;}
</style>
