/<template>
  <div>
    <div
      ref="card"
      class="bg-light d-flex flex-column rounded mx-2 my-2 p-2 card"
      @click="showMessage()"
    >
      <div class="d-flex flex-row justify-content-between">
        <div id="type">{{ username }}:</div>
        <div id="message">{{ date }}</div>
      </div>
      <div class="breakline my-2" />
      <div id="message">{{ message }}</div>
    </div>
    <div ref="container" class="container" @click="hideMessage()"></div>
  </div>
</template>

<script>
export default {
  props: ["commit"],
  data() {
    return {
      message: "",
      username: "",
      date: "",
    };
  },
  created() {
    this.message = this.commit.commit.message;
    this.username = this.commit.commit.author.name;
    this.date = this.commit.commit.author.date.substring(0, 10);
  },
  methods: {
    showMessage() {
      if (this.$refs.card.classList.contains("transition")) {
        this.hideMessage();
        return;
      }

      // container transition
      this.$refs.container.style.opacity = "1";
      this.$refs.container.style.visibility = "visible";
      this.$refs.container.style.zIndex = "2";
      // card transition
      this.$refs.card.classList.toggle("transition");
      this.$refs.card.style.fontSize = "20px";
    },
    hideMessage() {
      // container transition
      this.$refs.container.style.opacity = "0";
      this.$refs.container.style.visibility = "visible";
      setTimeout(() => {
        this.$refs.container.style.zIndex = "-1";
      }, 200);
      // card transition
      this.$refs.card.classList.toggle("transition");
      this.$refs.card.style.fontSize = "10px";
    },
  },
};
</script>

<style scoped>
.container {
  transition: visibility 0.2s linear, opacity 0.2s linear;
  position: fixed;
  visibility: hidden;
  margin: 0;
  left: 0;
  top: 0;
  bottom: 0;
  max-width: 100%;
  background-color: rgba(53, 53, 53, 0.5);
  opacity: 0;
}

.card:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 1);
}

.transition {
  position: fixed !important;
  top: 30% !important;
  left: 40% !important;
  width: 500px !important;
  z-index: 3 !important;
  transition: all 0.2 linear !important;
}

.card {
  z-index: 1;
  font-size: 10px;
  transition: box-shadow 0.2s !important;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}
.breakline {
  background-color: rgba(119, 119, 119, 0.418);
  padding-top: 1px;
  margin-top: 1px;
}
</style>