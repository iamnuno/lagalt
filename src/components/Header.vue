<template>
  <div class="d-flex flex-row p-3 bg-info text-white shadow">
    <div>
      <h3>{{ title }}</h3>
    </div>
    <div class="d-flex flex-column justify-content-center flex-grow-1 ml-4">
      <!-- navbar buttons -->
      <div class="d-flex flex-row">
        <router-link class="button text-white" :to="{ name: 'home' }"
          >Home</router-link
        >
      </div>
    </div>
    <div class="d-flex flex-column justify-content-center">
      <router-link
        :to="{ name: 'login' }"
        class="button text-white"
        v-if="!isAuthorized"
        >Login</router-link
      >

      <!-- profile -->
      <div
        v-if="isAuthorized"
        id="profile-container"
        class="d-flex flex-row profile-container"
      >
        <div class="d-flex flex-column">
          <div
            class="bg-light text-dark my-1 px-2 rounded-pill username shadow"
          >
            {{ user.userName }}
          </div>
        </div>
        <div class="d-flex flex-column icon shadow-sm rounded-circle">
          <font-awesome-icon :icon="['fas', 'user-circle']" size="2x" />
        </div>

        <div
          class="dropdown-container d-none flex-column position-absolute bg-white rounded shadow"
        >
          <router-link
            class="d-block dropdown-item text-dark rounded text-center mb-1"
            :to="{ name: 'profile' }"
          >
            Profile
          </router-link>
          <router-link
            class="d-block dropdown-item text-dark rounded text-center mb-1"
            :to="{ name: 'addProject' }"
          >
            New project
          </router-link>
          <div
            class="d-block dropdown-item text-dark rounded text-center mb-1"
            @click="logout"
          >
            Log Out
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as firebase from "../utils/firebase";
import { mapState } from "vuex";

export default {
  name: "Header",
  data() {
    return {
      title: "Lagalt",
    };
  },
  computed: mapState(["isAuthorized", "user"]),
  methods: {
    async logout() {
      if (await firebase.logout()) {
        this.$router.push({ name: "login" });
      } else {
        console.log("something went wrong! try again.");
      }
    },
  },
};
</script>

<style scoped>
.button:hover,
.profile-container:hover,
.dropdown-item:hover {
  cursor: pointer;
}
.button:hover {
  color: rgb(0, 0, 0) !important;
  text-decoration: none;
}
.username {
  right: -9px;
  position: relative;
}
.icon {
  z-index: 1;
}
.profile-container:hover .dropdown-container {
  display: flex !important;
}
.dropdown-container .dropdown-item:hover {
  background-color: #ddd;
}
.dropdown-container {
  right: 15px;
  margin-top: 33px;
  font-size: 12px;
  padding: 9px 5px 5px;
  min-width: 100px;
  z-index: 1;
}
.dropdown-item {
  background-color: lightgray;
  text-decoration: none;
}
li {
  text-decoration: none;
}
</style>
