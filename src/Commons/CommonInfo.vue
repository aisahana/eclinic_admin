<template>
  <div class="row">
    <div class="col-md-12">
      <b-table stacked :fields="fields" :items="[obj]"></b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommonInfo',
  props: {
    obj: Object,
    fields: Array
  }
}
</script>

<style>

</style>
