<template>
  <div class="attendee-ticket bg-darkLight d-flex">
    <div class="img-container">
      <img :src="ticket.event.coverImg" alt="" class="" />
    </div>
    <div class="py-3 ps-3 d-flex flex-column justify-content-between w-100">
      <div class="text-stuff me-3">
        <h5 class="ticket-text mb-3">{{ ticket.event.name }}</h5>
        <h5 class="ticket-text text-info mb-1">{{ ticket.event.location }}</h5>
        <h5 class="ticket-text text-info">
          {{ new Date(ticket.event.startDate).toDateString() }}
        </h5>
      </div>
      <div class="return-ticket-button text-end">
        <button class="btn btn-danger">Not Going</button>
      </div>
    </div>
    <div class="cut-out"></div>
  </div>
</template>

<script>
import { Attendee } from "../models/Attendee.js";

export default {
  props: {
    ticket: { type: Attendee, required: true },
  },
  setup() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.attendee-ticket {
  min-height: 15rem;
  min-width: 50vw;
  position: relative;

  .img-container {
    max-height: 15rem;
    max-width: 15rem;
    object-fit: contain;
    img {
      max-height: 15rem;
    }
  }
  .return-ticket-button {
    width: 90%;
  }
  .cut-out {
    position: absolute;
    right: -3%;
    top: 25%;
    height: 7.5rem;
    width: 3.75rem;
    background-color: var(--bs-dark);
    border-radius: 7.5rem 0 0 7.5rem;
  }
}
@media screen and (max-width: 992px) {
  .attendee-ticket {
    .cut-out {
      height: 0;
      width: 0;
    }
  }
}
</style>
