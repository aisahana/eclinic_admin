<template>
  <pre>
    {{ users }}
  </pre>
</template>

<script>
export default {
  name: 'UserList',
  props: {
    users: Array
  },
  data () {
    return {
      fields: []
    }
  },
  methods: {
    onSelect (user) {
      this.$emit('onSelect', user)
    },
    onDoubleClick (user) {
      this.$emit('onDoubleClick', user)
    },
    onDestroy (user) {
      this.$emit('onDestroy', user)
    }
  }
}
</script>
