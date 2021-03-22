<template>
  <div id="app">
    <Header />
    <router-view />
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
