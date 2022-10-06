<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12"><EventDetailsComp /></div>
      <div class="col-12"><AttendeesComp /></div>
      <div class="col-lg-8"></div>
    </div>
  </div>
</template>

<script>
import EventDetailsComp from "../components/EventDetailsComp.vue";
import AttendeesComp from "../components/AttendeesComp.vue";
export default {
  setup() {
    return {};
  },
  components: { EventDetailsComp, AttendeesComp },
};
</script>

<style lang="scss" scoped></style>
