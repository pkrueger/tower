<template>
  <form @submit.prevent="handleSubmit" class="text-light">
    <div class="mb-3">
      <label for="eventNameInput" class="form-label">Event Name</label>
      <input
        type="text"
        class="form-control"
        id="eventNameInput"
        placeholder="name..."
        minlength="1"
        maxlength="100"
        aria-label="event name"
        required
        v-model="editable.name"
      />
    </div>

    <div class="mb-3">
      <label for="eventCoverImgInput" class="form-label">Cover Image</label>
      <input
        type="url"
        class="form-control"
        id="eventCoverImgInput"
        placeholder="url..."
        minlength="1"
        maxlength="500"
        aria-label="event cover image"
        required
        v-model="editable.coverImg"
      />
    </div>

    <div class="mb-3">
      <label for="eventLocationInput" class="form-label">Event Location</label>
      <input
        type="text"
        class="form-control"
        id="eventLocationInput"
        placeholder="location..."
        minlength="1"
        maxlength="70"
        aria-label="event location"
        required
        v-model="editable.location"
      />
    </div>

    <div class="row">
      <div class="col">
        <div class="mb-3">
          <label for="eventCapacityInput" class="form-label"
            >Event Capacity</label
          >
          <input
            type="number"
            class="form-control"
            id="eventCapacityInput"
            placeholder="capacity..."
            min="1"
            required
            v-model="editable.capacity"
          />
        </div>
      </div>
      <div class="col">
        <div class="mb-3">
          <label for="eventTypeInput" class="form-label">Event Type</label>
          <select
            id="eventTypeInput"
            class="form-select"
            aria-label="Type Select"
            v-model="editable.type"
            required
          >
            <option value="concert">Concert</option>
            <option value="convention">Convention</option>
            <option value="sport">Sport</option>
            <option value="digital">Digital</option>
          </select>
        </div>
      </div>
    </div>

    <div class="mb-3">
      <label for="eventStartTimeInput" class="form-label"
        >Event Start Date & Time</label
      >
      <input
        type="datetime-local"
        class="form-control"
        id="eventStartTimeInput"
        aria-label="event start date and time"
        required
        v-model="editable.startDate"
      />
    </div>

    <div class="mb-3">
      <label for="descriptionInput" class="form-label">Description</label>
      <textarea
        class="form-control"
        id="descriptionInput"
        placeholder="Tell us about your event..."
        rows="4"
        required
        v-model="editable.description"
      ></textarea>
    </div>

    <div class="text-end">
      <button
        type="submit"
        class="btn btn-primary"
        aria-label="Create Event"
        data-bs-dismiss="modal"
      >
        Create Event
      </button>
    </div>
  </form>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const editable = ref({});
    const router = useRouter();

    async function handleSubmit() {
      try {
        const event = await eventsService.createEvent(editable.value);
        editable.value = {};
        router.push({
          name: "Event Details",
          params: { eventId: event.id },
        });
      } catch (error) {
        Pop.error(error, "[HandleSubmit]");
      }
    }

    return { editable, handleSubmit };
  },
};
</script>

<style lang="scss" scoped></style>
