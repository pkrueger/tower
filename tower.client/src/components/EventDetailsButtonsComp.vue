<template>
  <button
    class="btn btn-danger py-3 px-5 fs-5 elevation-2"
    disabled
    v-if="state.eventDetails?.isCanceled"
  >
    Event is Canceled <i class="fa-solid fa-person-walking ms-2"></i>
  </button>
  <button
    class="btn btn-primary py-3 px-5 fs-5 elevation-2"
    disabled
    v-else-if="state.attendees?.find((a) => a.profile.id == state.account.id)"
  >
    You're Attending <i class="fa-solid fa-person ms-2"></i>
  </button>
  <button
    class="btn btn-danger py-3 px-5 fs-5 elevation-2"
    disabled
    v-else-if="!state.eventDetails?.capacity"
  >
    No Spots Left <i class="fa-solid fa-person-walking ms-2"></i>
  </button>
  <button
    class="btn btn-warning py-3 px-5 fs-5 elevation-2"
    @click="becomeAttendee"
    v-else
  >
    Attend <i class="fa-solid fa-person ms-2"></i>
  </button>
</template>

<script>
import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { attendeesService } from "../services/AttendeesService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const state = reactive({
      eventDetails: computed(() => AppState.activeEvent),
      attendees: computed(() => AppState.attendees),
      account: computed(() => AppState.account),
    });
    const route = useRoute();

    async function becomeAttendee() {
      try {
        await attendeesService.becomeAttendee(route.params.eventId);
      } catch (error) {
        Pop.error(error, "[AttendEvent]");
      }
    }

    return { state, becomeAttendee };
  },
};
</script>

<style lang="scss" scoped></style>
