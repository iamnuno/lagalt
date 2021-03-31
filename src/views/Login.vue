/<template>
  <div
    class="flex-grow-1 d-flex flex-column justify-content-center align-items-center"
  >
    <div
      class="shadow d-flex flex-column justify-content-center align-items-center w-50 py-4 rounded"
    >
      <div class="h2 text-center">Login</div>
      <div class="d-flex flex-column overflow-hidden">
        <input
          v-model="username"
          class="my-2 rounded form-control"
          placeholder="Username"
          type="text"
          required
        />
        <input
          class="my-2 rounded form-control"
          v-model="password"
          placeholder="Password"
          type="password"
          required
        />
        <button
          :disabled="disabled"
          @click="login()"
          class="bg-success my-2 btn text-white"
        >
          Login
        </button>
      </div>
      <div v-if="error" class="text-center text-danger f-w-400">
        Failed to log in. Check your passowrd and username.
      </div>
      <router-link to="register" class="text-info text-center pointer">
        dont have an account? register here.
      </router-link>
    </div>
  </div>
</template>

<script>
import * as firebase from "../utils/firebase";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: false,
    };
  },
  methods: {
    async login() {
      if (await firebase.login(this.getEmail, this.password)) {
        this.$router.push({ name: "home" });
      } else {
        this.error = true;
      }
    },
  },
  computed: {
    disabled() {
      return (
        this.username.replace(/\s/g, "").length === 0 ||
        this.password.replace(/\s/g, "").length === 0
      );
    },
    getEmail() {
      return this.username.replace(/\s/g, "");
    },
  },
};
</script>

<style>
</style>+
