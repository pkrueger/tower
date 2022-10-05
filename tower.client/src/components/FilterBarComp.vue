<template>
  <div class="filter-bar d-flex flex-wrap justify-content-around bg-darkLight">
    <button
      @click="getEventsByType('')"
      :class="`p-3 btn ${
        state.typeActivated == '' ? 'btn-primary' : 'text-light'
      }`"
      :disabled="state.typeActivated == ''"
    >
      All
    </button>
    <button
      @click="getEventsByType('concert')"
      :class="`p-3 btn ${
        state.typeActivated == 'concert' ? 'btn-primary' : 'text-light'
      }`"
      :disabled="state.typeActivated == 'concert'"
    >
      Concerts
    </button>
    <button
      @click="getEventsByType('convention')"
      :class="`p-3 btn ${
        state.typeActivated == 'convention' ? 'btn-primary' : 'text-light'
      }`"
      :disabled="state.typeActivated == 'convention'"
    >
      Conventions
    </button>
    <button
      @click="getEventsByType('sport')"
      :class="`p-3 btn ${
        state.typeActivated == 'sport' ? 'btn-primary' : 'text-light'
      }`"
      :disabled="state.typeActivated == 'sport'"
    >
      Sports
    </button>
    <button
      @click="getEventsByType('digital')"
      :class="`p-3 btn ${
        state.typeActivated == 'digital' ? 'btn-primary' : 'text-light'
      }`"
      :disabled="state.typeActivated == 'digital'"
    >
      Digital
    </button>
  </div>
</template>

<script>
import { reactive } from "vue";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const state = reactive({
      typeActivated: "",
    });

    async function getEventsByType(type) {
      try {
        await eventsService.getEvents(type);
        state.typeActivated = type;
      } catch (error) {
        Pop.error(error, "[GetEventsByType]");
      }
    }
    return { state, getEventsByType };
  },
};
</script>

<style lang="scss" scoped>
button {
  width: 20%;
  min-width: fit-content;
}

button:disabled {
  opacity: 1;
}
</style>
