/<template>
  <div
    class="flex-grow-1 d-flex flex-column justify-content-center algin-items-center"
  >
    <div class="shadow d-flex flex-column mx-5 rounded">
      <div class="h2 text-center">Login</div>
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
      <button :disabled="disabled" @click="login()" class="my-2 mx-5">
        Login
      </button>
      <div class="text-success text-center pointer" @click="toRegister">
        dont have an account? register here.
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const user = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.username, this.password);
        //        this.$router.replace({ name: "Home" });
        console.log(user);

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
    },
    toRegister() {
      this.$router.replace({ name: "register" });
    },
  },
  computed: {
    disabled() {
      return (
        this.username.replace(/\s/g, "").length === 0 ||
        this.password.replace(/\s/g, "").length === 0
      );
    },
  },
};
</script>

<style>
</style>+
