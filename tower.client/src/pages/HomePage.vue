<template>
  <div class="container-fluid scrollable-y">
    <div class="row">
      <div class="col-12">
        <img src="../assets/img/homePageBanner.png" alt="" class="w-100" />
      </div>
      <div class="col-12"></div>
      <div class="col-md-3 col-sm-4 col-xs-6" v-for="e in state.events">
        <EventComp :event="e" :key="e.id" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted, reactive } from "vue";
import { AppState } from "../AppState.js";
import EventComp from "../components/EventComp.vue";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const state = reactive({
      events: computed(() => AppState.events),
    });

    async function getAllEvents() {
      try {
        await eventsService.getAllEvents();
      } catch (error) {
        Pop.error(error, "[GetAllEvents]");
      }
    }

    onMounted(() => {
      getAllEvents();
    });

    return { state };
  },
  components: { EventComp },
};
</script>

<style scoped lang="scss"></style>
