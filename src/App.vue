<template>
<div id="app">
  <Navbar></Navbar>
  <router-view />
  <Footer></Footer>
</div>
</template>

<script>
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default {
  name: 'App',
  components: {
    'Navbar': Navbar,
    'Footer': Footer
  }
}
</script>

<style>
* {
  font-family: 'Roboto';
  text-decoration: none;
}

body,
html {
  background-image: url('./images/pattern.jpg');
  background-color: #ccc;
  background-blend-mode: multiply;
  height: 100%;
  margin: 0px auto;
  padding: 0px auto;
}

#main-wrapper {
  padding-bottom: 54px;
}

#app {
  position: relative;
  min-height: 100%;
}

.select-radio {
  align-items: center;
  background-color: #444;
  box-shadow: -1px 2px 2px #666;
  color: #fff;
  display: flex;
  justify-content: space-evenly;
  margin-top: 8px;
  padding: 6px;
  width: 100vw;
}
</style>
