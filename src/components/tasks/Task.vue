<template>
  <li>
    <input type="checkbox" :id="`task-${task.id}`" :checked="task.is_done" @change="handleTask" />
    <label :for="`task-${task.id}`" class="line-through">{{task.title}}</label>
  </li>
</template>

<script>
export default {
  props: ['task'],

  methods: {
    handleTask: function (e) {
      const taskParams = {
        task_id: this.task.id,
        value: e.target.checked
      }
      this.$store.dispatch('updateTask', taskParams)
    }
  }
}
</script>
