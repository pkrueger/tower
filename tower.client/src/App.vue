<template>
  <header>
    <Navbar />
  </header>
  <main>
    <router-view />
  </main>
  <footer></footer>
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  setup() {
    return {};
  },
  components: { Navbar },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
