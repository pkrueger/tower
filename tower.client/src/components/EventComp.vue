<template>
  <router-link
    :to="{ name: 'Event Details', params: { eventId: eventDetails.id } }"
    :class="eventDetails.isCanceled ? 'disabled darken' : ''"
  >
    <div class="event-card elevation-5">
      <img
        :src="eventDetails.coverImg"
        :alt="eventDetails.name"
        class="img-fluid"
        :title="eventDetails.name"
        @error="
          (event) => {
            event.target.src = 'src/assets/img/defaultImage.jpg';
          }
        "
      />
      <div class="event-text event-text-style">
        <h4 class="event-name pt-2 px-2">{{ eventDetails.name }}</h4>
        <div class="event-small-text mb-2 px-2">
          {{ eventDetails.location }}
        </div>
        <div class="event-small-text mb-2 px-2">
          {{
            new Date(eventDetails.startDate).toDateString() +
            " " +
            new Date(eventDetails.startDate).toLocaleTimeString()
          }}
        </div>
        <div
          v-if="eventDetails.isCanceled"
          class="w-100 bg-danger text-black text-center warning fs-5"
        >
          Canceled
        </div>
        <div
          class="text-end event-small-text text-white pb-2 px-2"
          v-else-if="eventDetails.capacity > 0"
        >
          <span class="text-primary bg-dark rounded p-1">{{
            eventDetails.capacity
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
import { EventDetails } from "../models/EventDetails.js";

export default {
  props: {
    eventDetails: { type: EventDetails, required: true },
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
  border-radius: 0.1rem;
  img {
    border-radius: 0.1rem;
  }
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
  border-bottom-left-radius: 0.1rem;
  border-bottom-right-radius: 0.1rem;
}
</style>
