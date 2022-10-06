<template>
  <form @submit.prevent="addComment" class="d-flex flex-column">
    <div class="mb-3 d-flex flex-column align-items-end">
      <label for="commentTextInput" class="form-label text-success mb-2"
        >Join the conversation</label
      >
      <textarea
        class="form-control elevation-2"
        id="commentTextInput"
        placeholder="Tell the people..."
        rows="4"
        maxlength="500"
        required
        v-model="editable.body"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-success ms-auto elevation-2">
      Post Comment
    </button>
  </form>
</template>

<script>
import { ref } from "vue";
import Pop from "../utils/Pop.js";
import { commentsService } from "../services/CommentsService.js";
import { useRoute } from "vue-router";

export default {
  setup() {
    const editable = ref({});
    const route = useRoute();

    async function addComment() {
      try {
        editable.value.eventId = route.params.eventId;
        await commentsService.addComment(editable.value);
        editable.value = {};
      } catch (error) {
        Pop.error(error, "[AddComment]");
      }
    }

    return { editable, addComment };
  },
};
</script>

<style lang="scss" scoped>
.form-label {
  text-shadow: 0 0 0.1rem black;
  letter-spacing: 0.05rem;
}
</style>
