<template>
  <label class="container">
    {{ tag.name }}
    <input type="checkbox" @change="tagUpdate" />
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  props: ["tag"],
  methods: {
    tagUpdate() {
      this.$props.tag.hasTag = !this.$props.tag.hasTag;
      this.$emit("updateUserTags", this.$props.tag);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  user-select: none;
}

.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  position: absolute;
  top: 5px;
  left: 5px;
  height: 15px;
  width: 15px;
  background-color: #eee;
}

.container:hover input ~ .checkmark {
  background-color: #ccc;
}

.container input:checked ~ .checkmark {
  background-color: #2196f3;
}

.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

.container input:checked ~ .checkmark:after {
  display: block;
}

.container .checkmark:after {
  left: 6px;
  top: 2px;
  width: 5px;
  height: 10px;
  border: solid white;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>