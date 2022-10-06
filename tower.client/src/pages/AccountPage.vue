<template>
  <div class="container-fluid scrollable-y">
    <div class="row mb-5">
      <h4 class="text-success mb-4">My Events</h4>
      <div
        class="col-xl-3 col-lg-4 col-md-6 col-sm-12"
        v-for="e in state.events"
      >
        <EventComp :eventDetails="e" :key="e.id" class="elevation-1" />
      </div>
    </div>
    <div class="d-flex flex-column">
      <h4 class="text-success upcoming">Upcoming Events</h4>
      <div
        class="ticket d-flex justify-content-center"
        v-for="a in state.attendees"
      >
        <AttendeeTicketComp :ticket="a" :key="a.id" class="elevation-1" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted, onUnmounted, reactive } from "vue";
import { AppState } from "../AppState.js";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import EventComp from "../components/EventComp.vue";
import AttendeeTicketComp from "../components/AttendeeTicketComp.vue";
import { attendeesService } from "../services/AttendeesService.js";

export default {
  setup() {
    const state = reactive({
      events: computed(() => AppState.events),
      account: computed(() => AppState.account),
      attendees: computed(() => AppState.attendees),
    });
    async function getEventsByCreatorId() {
      try {
        await eventsService.getEventsByCreatorId(state.account.id);
      } catch (error) {
        Pop.error(error, "[GetEventsByCreatorId]");
      }
    }
    async function getAttendeesByAccountId() {
      try {
        // accountId is added in backend
        await attendeesService.getAttendeesByAccountId();
      } catch (error) {
        Pop.error(error, "[GetAttendeesByAccountId]");
      }
    }
    onMounted(() => {
      getEventsByCreatorId();
      getAttendeesByAccountId();
    });
    onUnmounted(() => {
      AppState.events = [];
      AppState.attendees = [];
    });
    return { state };
  },
  components: { EventComp, AttendeeTicketComp },
};
</script>

<style scoped lang="scss">
.ticket,
.upcoming {
  margin-bottom: 4.5rem;
}
</style>
