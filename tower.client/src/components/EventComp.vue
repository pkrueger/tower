<template>
  <div class="event-card square elevation-5">
    <img :src="event.coverImg" alt="" class="img-fluid" />
    <div class="event-text event-text-style p-2">
      {{ event.name }}
    </div>
  </div>
</template>

<script>
import { Event } from "../models/Event.js";

export default {
  props: {
    event: { type: Event, required: true },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.event-card {
  outline: 0.2rem solid var(--bs-darkLight);
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  margin-bottom: 1.5rem;
}

.event-text {
  position: absolute;
  height: 45%;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.event-text-style {
  color: rgba(255, 255, 255, 0.97);
  text-shadow: 0 0 0.2rem black;
  font-weight: 600;
  letter-spacing: 0.075rem;
  background-color: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(5px);
}
</style>
