<template>
  <div
    class="comment mb-3 d-flex align-items-center gap-3"
    v-for="c in state.comments"
  >
    <div class="comment-image">
      <img
        :src="c.creator.picture"
        :alt="c.creator.name"
        :title="c.creator.name"
        class="img-fluid elevation-2"
      />
    </div>
    <div class="comment-body text-dark px-3 py-2 elevation-2">
      <h6>{{ c.creator.name }}</h6>
      <p>{{ c.body }}</p>
      <button class="btn delete-button" @click="deleteComment(c.id)">
        <i class="fa-solid fa-x"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { onMounted, reactive } from "vue";
import { useRoute } from "vue-router";
import { AppState } from "../AppState.js";
import { commentsService } from "../services/CommentsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const state = reactive({
      comments: computed(() => AppState.comments),
    });
    const route = useRoute();

    async function getEventComments() {
      try {
        await commentsService.getEventComments(route.params.eventId);
      } catch (error) {
        Pop.error(error, "[GetEventComments]");
      }
    }

    async function deleteComment(commentId) {
      try {
      } catch (error) {
        Pop.error(error);
      }
    }

    onMounted(() => {
      getEventComments();
    });

    return { state };
  },
};
</script>

<style lang="scss" scoped>
.comment-image {
  height: 5rem;
  width: 5rem;
  img {
    border-radius: 50%;
    object-fit: cover;
  }
}

.comment-body {
  min-height: 4.5rem;
  width: 100%;
  background-color: #e2f9ff;
  border-radius: 0.2rem;
  overflow-wrap: anywhere;
  position: relative;
}

.delete-button {
  position: absolute;
  top: 0%;
  right: 0;
}
</style>
