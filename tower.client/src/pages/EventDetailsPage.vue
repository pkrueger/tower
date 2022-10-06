<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12 mb-5"><EventDetailsComp class="elevation-1" /></div>
      <div class="col-12 mb-5">
        <h6 class="section-title">See who is attending</h6>
        <AttendeesComp class="elevation-1" />
      </div>
      <div class="col-lg-8">
        <h6 class="section-title">What people are saying</h6>
      </div>
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

<style lang="scss" scoped>
.section-title {
  color: var(--bs-darkLight);
  font-weight: 700;
  filter: brightness(150%);
}
</style>
