<template>
  <div class="card">
    <div class="card-body">
      <h5 class="card-title mb-2">
        <slot name="title"></slot>
      </h5>
      <slot class="mb-2" name="content"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'CommonCard'
}
</script>

<style>

</style>
