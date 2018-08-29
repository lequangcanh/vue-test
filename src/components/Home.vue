<template>
  <div>
    <div>
      <ul class="collection">
        <task v-for="task in unfinishedTasks" :key="task.id" :task="task"/>
      </ul>
    </div>
    <div class="btn">Display finished tasks</div>
    <div id="finished-tasks" class="display_none">
      <ul class="collection">
        <task v-for="task in finishedTasks" :key="task.id" :task="task"/>
      </ul>
    </div>
  </div>
</template>

<script>
import Task from '../components/tasks/Task'
import {mapActions, mapState, mapGetters} from 'vuex'

export default {
  mounted: function () {
    this.fetchTasks()
  },

  components: {
    Task
  },

  computed: {
    ...mapState(['tasks']),
    ...mapGetters(['finishedTasks', 'unfinishedTasks'])
  },

  methods: {
    ...mapActions(['fetchTasks'])
  }
}
</script>

<style>
  li {list-style-type: none;}
</style>
