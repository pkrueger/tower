<template>
  <div
    class="modal fade"
    id="NewEventModal"
    tabindex="-1"
    aria-labelledby="NewEventModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark">
          <h5 class="modal-title text-light" id="NewEventModalLabel">
            Create New Event
          </h5>
          <button
            type="button"
            class="text-light btn"
            data-bs-dismiss="modal"
            title="Close"
            aria-label="Close"
          >
            <i class="fa-solid fa-x"></i>
          </button>
        </div>
        <div class="modal-body bg-darkLight rounded-bottom">
          <NewEventForm />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NewEventForm from "./NewEventForm.vue";
export default {
  setup() {
    return {};
  },
  components: { NewEventForm },
};
</script>

<style lang="scss" scoped>
.modal-header {
  border: 0;
}
</style>
