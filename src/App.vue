<template>
  <div id="app">
    <Header />
    <Footer />
  </div>
</template>

<script>
import Header from './componenets/Header'
import Footer from './componenets/Footer'

export default {
  name: "app",
  components: {
    Header,
    Footer,
  }
}

</script>

<style>
html, body, #app{
  margin: 0;
  display: flex;
  flex-direction: column;
  height: 100%;
}
</style>
