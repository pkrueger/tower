<template>
  <div
    class="event-details-card w-100"
    :style="`background-image: url(${state.eventDetails?.coverImg})`"
  >
    <div class="event-details-content d-flex flex-wrap">
      <img
        :src="state.eventDetails?.coverImg"
        :alt="state.eventDetails?.name"
        :title="state.eventDetails?.name"
        class="elevation-2"
      />
      <div class="text-stuff ps-4 d-flex flex-column w-100">
        <div class="d-flex flex-wrap justify-content-between mb-2">
          <h4>{{ state.eventDetails?.name }}</h4>
          <h5 class="text-info">
            {{ new Date(state.eventDetails?.startDate).toDateString() }}
          </h5>
        </div>
        <div class="d-flex flex-wrap justify-content-between mb-3">
          <h5 class="text-info">{{ state.eventDetails?.location }}</h5>
          <h6 class="text-info">
            {{ new Date(state.eventDetails?.startDate).toLocaleTimeString() }}
          </h6>
        </div>
        <p class="mb-3 text-white">{{ state.eventDetails?.description }}</p>
        <div
          class="d-flex flex-wrap justify-content-between mt-auto align-items-end"
        >
          <h5 class="capacity-display">
            <span
              class="text-primary fs-4 me-2"
              v-if="state.eventDetails?.capacity > 0"
              >{{ state.eventDetails?.capacity }}</span
            >
            <span class="text-danger fs-4 me-2" v-else>0</span>
            spots left
          </h5>
          <!-- TODO ABSTRACT BUTTONS TO SEPARATE COMPONENT -->
          <EventDetailsButtonsComp />
        </div>
      </div>
      <button
        class="btn cancel-button text-white"
        title="Cancel Event"
        aria-label="Cancel Event"
        @click="cancelEvent()"
        v-if="
          state.eventDetails?.creatorId == state.account.id &&
          !state.eventDetails?.isCanceled
        "
      >
        <i class="fa-solid fa-x"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState.js";
import { useRoute } from "vue-router";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import EventDetailsButtonsComp from "./EventDetailsButtonsComp.vue";

export default {
  setup() {
    const route = useRoute();
    const state = reactive({
      eventDetails: computed(() => AppState.activeEvent),
      account: computed(() => AppState.account),
    });
    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId);
      } catch (error) {
        Pop.error(error, "[GetEventById]");
      }
    }
    async function cancelEvent() {
      try {
        if (await Pop.confirm("Cancel Event?")) {
          await eventsService.cancelEvent(route.params.eventId);
        }
      } catch (error) {
        Pop.error(error, "[CancelEvent]");
      }
    }
    onMounted(() => {
      getEventById();
    });
    return { state, cancelEvent };
  },
  components: { EventDetailsButtonsComp },
};
</script>

<style lang="scss" scoped>
.event-details-card {
  border: 0.1rem solid var(--bs-darkLight);
  text-shadow: 0 0 0.25rem black;
  background-size: cover;
  background-position: center;
}
.event-details-content {
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(15px);
  padding: 3rem;
  position: relative;
  width: 100%;

  .cancel-button {
    position: absolute;
    top: 0%;
    right: 0%;
  }

  img {
    max-width: 30%;
    height: fit-content;
    border: 0.2rem solid var(--bs-darkLight);
    border-radius: 0.2rem;
  }

  .text-stuff {
    max-width: 70%;

    div h4 {
      letter-spacing: 0.08rem;
    }

    p {
      line-height: 250%;
      letter-spacing: 0.01rem;
    }

    button:disabled {
      opacity: 1;
    }
  }
}

@media screen and (max-width: 991px) {
  .event-details-content {
    padding: 2rem;
    img {
      max-width: 100%;
      margin-bottom: 1.5rem;
    }
    .text-stuff {
      max-width: 100%;
    }
  }
  .capacity-display {
    margin-bottom: 1.5rem;
  }
}
</style>
