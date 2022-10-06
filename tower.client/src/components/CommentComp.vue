<template>
  <div class="comment">
    <img src="" alt="" />
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { commentsService } from "../services/CommentsService.js";
import Pop from "../utils/Pop.js";

export default {
  setup() {
    const route = useRoute();

    async function getEventComments() {
      try {
        await commentsService.getEventComments(route.params.eventId);
      } catch (error) {
        Pop.error(error, "[GetEventComments]");
      }
    }

    onMounted(() => {
      getEventComments();
    });

    return {};
  },
};
</script>

<style lang="scss" scoped></style>
