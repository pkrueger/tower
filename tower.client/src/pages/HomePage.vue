<template>
  <div class="container-fluid scrollable-y">
    <div class="row">
      <div class="col-12">
        <img
          src="../assets/img/homePageBanner.png"
          alt="Site welcome banner"
          class="w-100"
          title="Welcome to the site"
        />
      </div>
      <div class="col-12 my-4">
        <FilterBarComp class="elevation-1" />
      </div>
      <div
        class="col-xl-3 col-lg-4 col-md-6 col-sm-12"
        v-for="e in state.events"
      >
        <EventComp :eventDetails="e" :key="e.id" class="elevation-1" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted, onUnmounted, reactive } from "vue";
import { AppState } from "../AppState.js";
import EventComp from "../components/EventComp.vue";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import FilterBarComp from "../components/FilterBarComp.vue";

export default {
  setup() {
    const state = reactive({
      events: computed(() => AppState.events),
    });

    async function getAllEvents() {
      try {
        await eventsService.getEvents();
      } catch (error) {
        Pop.error(error, "[GetAllEvents]");
      }
    }

    onMounted(() => {
      getAllEvents();
    });

    onUnmounted(() => {
      AppState.events = [];
    });

    return { state };
  },
  components: { EventComp, FilterBarComp },
};
</script>

<style scoped lang="scss"></style>
