<template>
  <div class="bg-light d-flex flex-column p-2 m-2 rounded pb-3 card">
    <div class="d-flex flex-row text-truncate">
      <div class="flex-grow-1">{{ title }}</div>
      {{ date }}
    </div>
    <div class="breakline my-1" />
    {{ text }}
  </div>
</template>

<script>
export default {
  name: "projectCard",
  props: ["data"],
  data() {
    return {
      title: this.data.title,
      text: this.data.text,
    };
  },
  computed: {
    date() {
      return this.data.date.substring(0, 10);
    },
  },
};
</script>

<style scoped>
.breakline {
  background-color: rgba(119, 119, 119, 0.418);
  padding-top: 1px;
  margin-top: 1px;
}

.card:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 1);
}

.card {
  font-size: 10px;
  transition: box-shadow 0.2s;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}
</style>