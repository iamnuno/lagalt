<template>
  <div
    class="flex-grow-1 d-flex flex-column justify-content-center algin-items-center"
  >
    <div class="shadow d-flex flex-column mx-5 rounded">
      <div class="h2 text-center">Register</div>
      <input
        v-model="username"
        class="my-2 mx-5"
        placeholder="Username"
        type="text"
        required
      />
      <input
        v-model="email"
        class="my-2 mx-5"
        placeholder="Email"
        type="email"
        required
      />
      <input
        class="my-2 mx-5"
        v-model="password"
        placeholder="Password"
        type="password"
        required
      />
      <input
        class="my-2 mx-5"
        v-model="repeatedPassword"
        placeholder="Confirm password"
        type="password"
        required
      />
      <button :disabled="disabled" @click="register" class="my-2 mx-5">
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
      await firebase.register(this.username, this.email, this.password);
      // TODO: REPLACE WITH A BETTER SOLUTION
      setTimeout(() => {
        this.$router.push({ name: "home" });
      }, 250);
    },
  },
  computed: {
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

<style>
</style>