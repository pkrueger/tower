<template>
  <router-link
    :to="{ name: 'Event Details', params: { eventId: event.id } }"
    :class="event.isCanceled ? 'disabled darken' : ''"
  >
    <div class="event-card square elevation-5">
      <img
        :src="event.coverImg"
        alt=""
        class="img-fluid"
        :title="event.name"
        @error="
          (event) => {
            event.target.src = 'src/assets/img/defaultImage.jpg';
          }
        "
      />
      <div class="event-text event-text-style">
        <h4 class="event-name pt-2 px-2">{{ event.name }}</h4>
        <div class="event-small-text mb-2 px-2">{{ event.location }}</div>
        <div class="event-small-text mb-2 px-2">
          {{
            new Date(event.startDate).toDateString() +
            " " +
            new Date(event.startDate).toLocaleTimeString()
          }}
        </div>
        <div
          v-if="event.isCanceled"
          class="w-100 bg-danger text-black text-center warning fs-5"
        >
          Canceled
        </div>
        <div
          class="text-end event-small-text text-white pb-2 px-2"
          v-else-if="event.capacity > 0"
        >
          <span class="text-primary bg-dark rounded p-1">{{
            event.capacity
          }}</span>
          spots left
        </div>
        <div
          v-else
          class="w-100 bg-warning text-black text-center warning fs-5"
        >
          At Capacity
        </div>
      </div>
    </div>
  </router-link>
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
  border: 0.2rem solid var(--bs-darkLight);
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  margin-bottom: 1.5rem;
  transition: transform 200ms ease-in-out;
}

.event-card:hover {
  transform: scale(1.025);
}

.event-text {
  position: absolute;
  height: auto;
  bottom: 0;
  left: 0;
  right: 0;
  margin-left: auto;
  margin-right: auto;
}

.event-text-style {
  text-shadow: 0 0 0.2rem black;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
}

.event-name {
  color: rgba(255, 255, 255, 0.97);
  font-weight: 600;
  letter-spacing: 0.1rem;
}

.event-small-text {
  color: var(--bs-info);
  opacity: 0.9;
  font-weight: 600;
  letter-spacing: 0.06rem;
}

.warning {
  text-shadow: 0 0 0 black;
  font-weight: 700;
  letter-spacing: 0.04rem;
}
</style>
