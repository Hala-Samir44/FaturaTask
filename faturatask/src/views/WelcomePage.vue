<template>
  <div id="main">
    <img src="../assets/welcome.gif" alt="" />
    <p class="welcometext">in Our small Gifs App</p>
    <router-link class="startBtn btn p-3 w-25" to="/Home"
      >Get Started</router-link
    >
  </div>
</template>
<style scoped>
.welcometext {
  color: #faf172;
  font-weight: bold;
  font-size: 50px;
}
.startBtn {
  background-image: linear-gradient(to right, white, #2ed8d8);
  font-weight: bold !important;
  font-size: 25px !important;
  color: #011f37;
  box-shadow: 5px 5px 8px white;
}
</style>
<script>
export default {
  name: 'WelcomePage',
  components: {
  },mounted(){
  }
}
</script>