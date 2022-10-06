<template>
  <nav
    class="navbar px-3 h-100 d-flex flex-column align-items-center justify-content-start"
  >
    <div class="my-4">
      <!-- LOGIN COMPONENT HERE -->
      <Login />
    </div>
    <ul class="navbar-nav text-center">
      <li class="nav-item">
        <router-link class="nav-link text-light p-0" :to="{ name: 'Home' }">
          <div>Home</div>
        </router-link>
      </li>
      <li v-if="state.user.isAuthenticated">
        <router-link class="nav-link text-light p-0" :to="{ name: 'Account' }">
          <div>Account</div>
        </router-link>
      </li>
      <li v-if="state.user.isAuthenticated">
        <button class="btn btn-success p-2 elevation-2">New Event</button>
      </li>
      <li v-if="state.user.isAuthenticated">
        <button class="btn btn-danger elevation-2" @click="logout">
          Logout
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import { computed } from "@vue/reactivity";
import { reactive } from "vue";
import { AppState } from "../AppState.js";
import { AuthService } from "../services/AuthService.js";
import Login from "./Login.vue";

export default {
  setup() {
    const state = reactive({
      user: computed(() => AppState.user),
    });
    return {
      state,
      async logout() {
        AuthService.logout({ returnTo: window.location.origin });
      },
    };
  },
  components: { Login },
};
</script>

<style scoped>
a:hover {
  text-decoration: none;
}

.navbar {
  background: rgb(71, 76, 97);
  background: linear-gradient(
    180deg,
    rgba(71, 76, 97, 1) 0%,
    rgba(71, 76, 97, 0) 90%
  );
}

.nav-link {
  transition: border 100ms linear;
  border-bottom: 0.2rem solid #00f86700;
}

.nav-link:hover {
  filter: brightness(200%);
  border-bottom: 0.2rem solid var(--bs-success);
}

li {
  padding-bottom: 1.5rem;
}
</style>
