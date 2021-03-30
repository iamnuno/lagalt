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
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "register",
  data() {
    return {
      username: "",
      password: "",
      repeatedPassword: "",
    };
  },
  methods: {
    async register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.username, this.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          // ...
          console.log(user);

          try {
            const user1 = firebase
              .auth()
              .createUserWithEmailAndPassword(this.username, this.password);
            //        this.$router.replace({ name: "Home" });
            console.log(user1);

            firebase
              .auth()
              .currentUser.getIdToken(true)
              .then(function (idToken) {
                // Send token to your backend via HTTPS
                // ...
                console.log(idToken);
              })
              .catch(function (error) {
                console.log(error);

                // Handle error
              });
          } catch (err) {
            console.log(err);
          }
          //authenticate
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode + "  " + errorMessage);

          // ..
        });
    },
  },
  computed: {
    disabled() {
      return (
        this.username.replace(/\s/g, "").length === 0 ||
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