<template>
  <div
    class="event-details-card w-100"
    :style="`background-image: url(${state.event?.coverImg})`"
  >
    <div class="event-details-content d-flex flex-wrap">
      <img
        :src="state.event?.coverImg"
        :alt="state.event?.name"
        :title="state.event?.name"
        class="elevation-2"
      />
      <div class="text-stuff ps-4 d-flex flex-column w-100">
        <div class="d-flex flex-wrap justify-content-between mb-2">
          <h4>{{ state.event?.name }}</h4>
          <h5 class="text-info">
            {{ new Date(state.event?.startDate).toDateString() }}
          </h5>
        </div>
        <div class="d-flex flex-wrap justify-content-between mb-3">
          <h5 class="text-info">{{ state.event?.location }}</h5>
          <h6 class="text-info">
            {{ new Date(state.event?.startDate).toLocaleTimeString() }}
          </h6>
        </div>
        <p class="mb-3 text-white">{{ state.event?.description }}</p>
        <div
          class="d-flex flex-wrap justify-content-between mt-auto align-items-end"
        >
          <h5 class="capacity-display">
            <span
              class="text-primary fs-4 me-2"
              v-if="state.event?.capacity > 0"
              >{{ state.event?.capacity }}</span
            >
            <span class="text-danger fs-4 me-2" v-else>0</span>
            spots left
          </h5>
          <!-- TODO Make it so only one button shows up -->
          <button
            class="btn btn-danger py-3 px-5 fs-5 elevation-2"
            disabled
            v-if="state.event?.isCanceled"
          >
            Event is Canceled <i class="fa-solid fa-person-walking ms-2"></i>
          </button>
          <button
            class="btn btn-primary py-3 px-5 fs-5 elevation-2"
            disabled
            v-else-if="
              state.attendees?.find((a) => a.profile.id == state.account.id)
            "
          >
            You're Attending <i class="fa-solid fa-person ms-2"></i>
          </button>
          <button
            class="btn btn-danger py-3 px-5 fs-5 elevation-2"
            disabled
            v-else-if="!state.event?.capacity"
          >
            No Spots Left <i class="fa-solid fa-person-walking ms-2"></i>
          </button>
          <button
            class="btn btn-warning py-3 px-5 fs-5 elevation-2"
            @click="becomeAttendee"
            v-else
          >
            Attend <i class="fa-solid fa-person ms-2"></i>
          </button>
        </div>
      </div>
      <button
        class="btn cancel-button text-white"
        @click="cancelEvent()"
        v-if="
          state.event?.creatorId == state.account.id && !state.event?.isCanceled
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
import { attendeesService } from "../services/AttendeesService.js";

export default {
  setup() {
    const route = useRoute();
    const state = reactive({
      event: computed(() => AppState.activeEvent),
      attendees: computed(() => AppState.attendees),
      account: computed(() => AppState.account),
    });

    async function getEventById() {
      try {
        await eventsService.getEventById(route.params.eventId);
      } catch (error) {
        Pop.error(error, "[GetEventById]");
      }
    }

    async function becomeAttendee() {
      try {
        await attendeesService.becomeAttendee(route.params.eventId);
      } catch (error) {
        Pop.error(error, "[AttendEvent]");
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

    return { state, becomeAttendee, cancelEvent };
  },
};
</script>

<style lang="scss" scoped>
.event-details-card {
  border: 0.1rem solid var(--bs-darkLight);
  text-shadow: 0 0 0.25rem black;
  background-size: cover;
  background-position: fixed;
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

@media screen and (max-width: 992px) {
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
