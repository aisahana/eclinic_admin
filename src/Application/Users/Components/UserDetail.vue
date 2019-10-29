<template>
  
</template>

<script>
export default {
  name: 'UserDetail',
  props: {
    user: Object
  },
  data () {
    return {
      myUser: undefined
    }
  },
  methods: {
    onUpdate () {
      this.$emit('onUpdate', this.myUser)
    }
  },
  watch: {
    user (n, o) {
      this.myUser = n
    }
  },
  mounted () {
    this.myUser = this.user
  }
}
</script>
