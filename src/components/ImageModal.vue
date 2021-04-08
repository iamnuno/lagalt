<template>
  <div class="d-inline-block">
    <img
      ref="photo"
      :src="photo"
      alt="picture"
      class="rounded shadow"
      @error="imageLoadError(photo)"
      @click="showModal()"
    />
    <!-- TODO: FIX IMAGE MODAL -->
    <!-- <div ref="modal" class="modal"></div> -->
  </div>
</template>

<script>
export default {
  name: "image-modal",
  props: ["photo"],
  methods: {
    showModal() {},
    imageLoadError(photo) {
      photo.src = "https://bitsofco.de/content/images/2018/12/broken-1.png";
    },
  },
};
</script>

<style scoped>
img {
  max-width: 200px;
  background-size: cover;
  transition: opacity 0.1s linear;
  animation: zoom;
}

img:hover {
  opacity: 0.5;
}

.modal {
  display: block;
  background-color: rgba(61, 61, 61, 0.801);
  position: fixed;
  max-width: 100%;
  margin: 0;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 10;
}
</style>