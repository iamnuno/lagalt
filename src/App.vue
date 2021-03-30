<template>
  <div id="app">
    <Header />
    <router-view />
    <Chat />
    <Footer />
  </div>
</template>

<script>
import Header from "./components/Header";
import Footer from "./components/Footer";
import Chat from "./components/Chat.vue";

export default {
  name: "app",
  components: {
    Header,
    Footer,
    Chat,
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
