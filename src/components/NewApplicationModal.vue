<template>
  <div>
    <b-button
      v-b-modal.modal-new-application
      class="p-1 bg-dark text-white shadow mr-2"
      >Apply for this project
    </b-button>

    <b-modal
      id="modal-new-application"
      ref="modal"
      title="New Application"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOk"
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="motivation"
          label-for="motivation-input"
          invalid-feedback="motivation is required"
          :state="motivationState"
        >
          <b-form-textarea
            id="motivation-input"
            v-model="motivation"
            :state="motivationState"
            no-resize
            rows="4"
            required
          ></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "new-application-modal",
  data() {
    return {
      motivation: "",
      motivationState: null,
    };
  },
  methods: {
    checkFormValidity() {
      let valid = this.$refs.form.checkValidity();
      this.motivationState = valid;

      return valid;
    },
    resetModal() {
      this.motivation = "";
      this.motivationState = null;
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      // TODO: SAVE THE NEW CARD
      console.log("motivation: " + this.motivation);
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-new-application");
      });
    },
  },
};
</script>
