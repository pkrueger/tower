<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12"><EventDetailsComp /></div>
      <div class="col-12"></div>
      <div class="col-lg-8"></div>
    </div>
  </div>
</template>

<script>
import EventDetailsComp from "../components/EventDetailsComp.vue";
export default {
  setup() {
    return {};
  },
  components: { EventDetailsComp },
};
</script>

<style lang="scss" scoped></style>
