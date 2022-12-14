<template>
  <div class="attendee-ticket bg-darkLight d-flex">
    <div class="row w-100">
      <div class="col-lg-3 text-center">
        <img
          :src="ticket.event?.coverImg"
          :alt="ticket.event?.name"
          class="img-fluid"
        />
      </div>
      <div class="col-lg-9">
        <div
          class="py-3 ps-3 d-flex flex-column justify-content-between w-100 h-100"
        >
          <div class="text-stuff">
            <div>
              <div class="d-flex gap-3" v-if="ticket.event?.isCanceled">
                <h5 class="ticket-text mb-3">
                  {{ ticket.event?.name }}
                </h5>
                <h5 class="text-white px-3 rounded canceled-text mb-3">
                  Event was canceled
                </h5>
              </div>
              <router-link
                :to="{
                  name: 'Event Details',
                  params: { eventId: ticket?.eventId },
                }"
                class="text-white"
                v-else
              >
                <h5 class="ticket-text mb-3">
                  {{ ticket.event?.name }}
                </h5>
              </router-link>
            </div>
            <h5 class="ticket-text text-info mb-1">
              {{ ticket.event?.location }}
            </h5>
            <h5 class="ticket-text text-info">
              {{ new Date(ticket.event?.startDate).toDateString() }}
            </h5>
          </div>
          <div class="return-ticket-button text-end">
            <button
              class="btn btn-danger"
              aria-label="Return Ticket"
              @click="returnTicket(ticket?.id)"
            >
              Not Going
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="cut-out"></div>
  </div>
</template>

<script>
import { Attendee } from "../models/Attendee.js";
import { attendeesService } from "../services/AttendeesService.js";
import Pop from "../utils/Pop.js";

export default {
  props: {
    ticket: { type: Attendee, required: true },
  },
  setup() {
    async function returnTicket(ticketId) {
      try {
        if (await Pop.confirm("Are you sure you don't want to attend?")) {
          await attendeesService.returnTicket(ticketId);
        }
      } catch (error) {
        Pop.error(error, "[ReturnTicket]");
      }
    }
    return { returnTicket };
  },
};
</script>

<style lang="scss" scoped>
.canceled-text {
  background-color: #ca475f;
}
.attendee-ticket {
  max-height: 15rem;
  max-width: 60rem;
  width: 100%;
  position: relative;

  .return-ticket-button {
    width: 90%;
  }
  .cut-out {
    position: absolute;
    right: -2%;
    top: 22.5%;
    height: 7.5rem;
    width: 3.75rem;
    background-color: var(--bs-dark);
    border-radius: 7.5rem 0 0 7.5rem;
  }
}
@media screen and (max-width: 991px) {
  .attendee-ticket {
    max-height: 1000rem;
    .cut-out {
      height: 0;
      width: 0;
    }
  }
}
</style>
