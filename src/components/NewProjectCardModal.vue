<template>
  <div>
    <b-button v-b-modal.modal-prevent-closing class="p-1 shadow mr-2">
      Create a new card
    </b-button>

    <b-modal
      id="modal-prevent-closing"
      ref="modal"
      title="Create a new card"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Title"
          label-for="title-input"
          invalid-feedback="Title is required"
          :state="titleState"
        >
          <b-form-input
            id="title-input"
            v-model="title"
            :state="titleState"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Message"
          label-for="message-input"
          invalid-feedback="Message is required"
          :state="messageState"
        >
          <b-form-input
            id="message-input"
            v-model="message"
            :state="messageState"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
import { newProjectCard } from "../utils/apiService";

export default {
  props: ["projectId"],
  data() {
    return {
      message: "",
      title: "",
      messageState: null,
      titleState: null,
      submittedNames: [],
    };
  },
  methods: {
    checkFormValidity() {
      let valid = this.$refs.form.checkValidity();
      this.messageState = valid;
      this.titleState = valid;

      if (this.message.replaceAll(/\s/g, "").length == 0) {
        this.messageState = false;
        valid = false;
      } else {
        this.messageState = true;
      }

      if (this.title.replaceAll(/\s/g, "").length == 0) {
        this.titleState = false;
        valid = false;
      } else {
        this.titleState = true;
      }

      return valid;
    },
    resetModal() {
      this.title = "";
      this.message = "";
      this.titleState = null;
      this.messageState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    async handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      const card = await newProjectCard(
        this.title,
        this.message,
        this.projectId
      );

      this.$emit("updateProjectCards", card);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
};
</script>
