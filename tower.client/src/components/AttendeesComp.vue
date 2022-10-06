<template>
  <div class="attendees-container bg-darkLight p-3 d-flex flex-wrap gap-1">
    <div v-for="a in state.attendees" class="attendee-image">
      <img
        :src="a.profile?.picture"
        :alt="a.profile?.name"
        :title="a.profile?.name"
        class="img-fluid elevation-2"
      />
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { attendeesService } from "../services/AttendeesService.js";

export default {
  setup() {
    const route = useRoute();
    const state = reactive({
      attendees: computed(() => AppState.attendees),
    });

    async function getAttendeesByEventId() {
      try {
        await attendeesService.getAttendeesByEventId(route.params.eventId);
      } catch (error) {
        Pop.error(error, "[GetAttendeesByEventId]");
      }
    }

    onMounted(() => {
      getAttendeesByEventId();
    });

    return { state };
  },
};
</script>

<style lang="scss" scoped>
.attendees-container {
  min-height: 5rem;
}
.attendee-image {
  height: 3rem;
  width: 3rem;
  img {
    border-radius: 50%;
    object-fit: cover;
  }
}
</style>
