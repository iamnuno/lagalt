<template>
  <div id="app">
    <Header />
    <div class="flex-grow-1 d-flex flex-column">
      <router-view />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "app",
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
html,
body,
#app {
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
