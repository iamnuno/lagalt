<template>
  <div
    class="text-center shadow bg-light rounded mx-2 my-1 d-flex flex-row justify-content-between"
  >
    <div class="bg-dark p-1 rounded-left">
      <div class="rounded-circle bg-warning text-white p-1">
        {{ name.substring(0, 2).toUpperCase() }}
      </div>
    </div>
    <div
      class="d-flex flex-column justify-content-center text-capitalize mr-5 text-truncate"
    >
      {{ name }}
    </div>
  </div>
</template>

<script>
export default {
  name: "user-card",
  props: ["name"],
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
</style>