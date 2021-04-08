<template>
  <div
    class="flex-grow-1 d-flex flex-column justify-content-center algin-items-center"
  >
    <div
      class="shadow d-flex flex-column mx-5 justify-content-center align-items-center rounded"
    >
      <div class="h2 text-center">Register</div>
      <div id="register" class="d-flex flex-column mx-5">
        <input
          v-model="username"
          class="my-2 rounded form-control"
          placeholder="Username"
          type="text"
          required
        />
        <input
          v-model="email"
          class="my-2 rounded form-control"
          placeholder="Email"
          type="email"
          required
        />
        <input
          class="my-2 rounded form-control"
          v-model="password"
          placeholder="Password"
          type="password"
          required
        />
        <input
          class="my-2 rounded form-control"
          v-model="repeatedPassword"
          placeholder="Confirm password"
          type="password"
          required
        />
        <div class="error text-danger text-center mb-2"></div>
      </div>
      <button
        :disabled="disabled"
        @click="register"
        class="my-4 py-3 w-50 bg-success text-white btn"
      >
        Register
      </button>
    </div>
  </div>
</template>

<script>
import * as firebase from "../utils/firebase";

export default {
  name: "register",
  data() {
    return {
      username: "",
      email: "",
      password: "",
      repeatedPassword: "",
    };
  },
  methods: {
    async register() {
      if (await firebase.register(this.username, this.email, this.password)) {
        // TODO: REPLACE WITH A BETTER SOLUTION
        setTimeout(() => {
          this.$router.push({ name: "home" });
        }, 250);
      }
    },
  },
  computed: {
    /**
     * disables the register button if the fields are empty
     */
    disabled() {
      return (
        this.username.replace(/\s/g, "").length === 0 ||
        this.email.replace(/\s/g, "").length === 0 ||
        this.password.replace(/\s/g, "").length === 0 ||
        this.repeatedPassword.replace(/\s/g, "").length === 0 ||
        this.repeatedPassword !== this.password
      );
    },
  },
};
</script>