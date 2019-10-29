<template>
  <div class="wrapper">
    <common-sidebar />
    <div class="main-panel">
      <common-nav :title="title" />
      <div class="content">
        <div class="container-fluid">
          <slot></slot>
        </div>
      </div>
      <common-footer />
    </div>
  </div>
</template>

<script>
import CommonSidebar from '@/Commons/CommonSidebar'
import CommonNav from '@/Commons/CommonNav'
import CommonFooter from '@/Commons/CommonFooter'

export default {
  name: 'CommonLayout',
  props: {
    title: String
  },
  components: {
    'common-sidebar': CommonSidebar,
    'common-nav': CommonNav,
    'common-footer': CommonFooter
  }
}
</script>

<style>

</style>
