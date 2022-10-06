<template>
  <div class="container-fluid scrollable-y">
    <div class="row">
      <div class="col-12 col-lg-10 mb-5 mx-auto">
        <EventDetailsComp class="elevation-1" />
      </div>
      <div
        class="col-12 col-lg-10 mb-5 mx-auto"
        v-if="!state.event?.isCanceled"
      >
        <h6 class="section-title">See who is attending</h6>
        <AttendeesComp class="elevation-1" />
      </div>
      <div class="col-lg-8 mx-auto" v-if="!state.event?.isCanceled">
        <h6 class="section-title">What people are saying</h6>
        <div class="bg-darkLight px-5 py-4 elevation-1">
          <CommentForm class="mb-3" v-if="state.account.id" />
          <CommentComp />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventDetailsComp from "../components/EventDetailsComp.vue";
import AttendeesComp from "../components/AttendeesComp.vue";
import CommentForm from "../components/CommentForm.vue";
import CommentComp from "../components/CommentComp.vue";
import { reactive } from "vue";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
export default {
  setup() {
    const state = reactive({
      account: computed(() => AppState.account),
      event: computed(() => AppState.activeEvent),
    });
    return { state };
  },
  components: { EventDetailsComp, AttendeesComp, CommentForm, CommentComp },
};
</script>

<style lang="scss" scoped>
.section-title {
  color: var(--bs-darkLight);
  font-weight: 700;
  filter: brightness(150%);
}
</style>
