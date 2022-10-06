<template>
  <div
    class="filter-bar d-flex flex-wrap justify-content-around bg-darkLight rounded"
  >
    <button
      @click="getEventsByType('')"
      :class="`p-3 btn ${
        state.typeActivated == '' ? 'btn-primary' : 'text-light'
      }`"
      :disabled="state.typeActivated == ''"
      aria-label="See all events"
    >
      All
    </button>
    <button
      @click="getEventsByType('concert')"
      :class="`p-3 btn ${
        state.typeActivated == 'concert' ? 'btn-primary' : 'text-light'
      }`"
      :disabled="state.typeActivated == 'concert'"
      aria-label="Concerts Filter"
    >
      Concerts
    </button>
    <button
      @click="getEventsByType('convention')"
      :class="`p-3 btn ${
        state.typeActivated == 'convention' ? 'btn-primary' : 'text-light'
      }`"
      :disabled="state.typeActivated == 'convention'"
      aria-label="Conventions Filter"
    >
      Conventions
    </button>
    <button
      @click="getEventsByType('sport')"
      :class="`p-3 btn ${
        state.typeActivated == 'sport' ? 'btn-primary' : 'text-light'
      }`"
      :disabled="state.typeActivated == 'sport'"
      aria-label="Sports Filter"
    >
      Sports
    </button>
    <button
      @click="getEventsByType('digital')"
      :class="`p-3 btn ${
        state.typeActivated == 'digital' ? 'btn-primary' : 'text-light'
      }`"
      :disabled="state.typeActivated == 'digital'"
      aria-label="Digitals Filter"
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
