<template>
  <div class="d-flex flex-row bg-dark">
    <div class="w-100">
      <section class="site-title px-3 py-4">
        <img src="./assets/img/logo.svg" alt="Tower Logo" title="Tower" />
      </section>
      <main class="px-4 py-2">
        <router-view />
      </main>
    </div>
    <section class="right-nav d-flex flex-column">
      <Navbar />
    </section>
  </div>
</template>

<script>
import { computed } from "@vue/reactivity";
import { AppState } from "./AppState.js";
import Navbar from "./components/Navbar.vue";

export default {
  setup() {
    return { AppState: computed(() => AppState) };
  },
  components: { Navbar },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
.right-nav {
  width: 9rem;
  height: 100vh;
}

.site-title img {
  height: 4rem;
}
</style>
