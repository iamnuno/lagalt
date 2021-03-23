<template>
  <div class="bg-light d-flex flex-column p-2 m-2 rounded shadow pb-3">
    <div class="d-flex flex-row">
      <div class="flex-grow-1">{{ title }}</div>
      {{ date }}
    </div>
    <div class="breakline" />
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
      date: this.data.date,
    };
  },
};
</script>

<style scoped>
.breakline {
  background-color: rgba(119, 119, 119, 0.418);
  padding-top: 1px;
  margin-top: 1px;
}
</style>