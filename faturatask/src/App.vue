


<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {
    var LikedGifs = localStorage.getItem("LikedGifs");
    var FavorGifs = localStorage.getItem("FavorGifs");
    var GifComments = localStorage.getItem("GifComments");

    if (!LikedGifs) localStorage.setItem("LikedGifs", "[]");
    if (!FavorGifs) localStorage.setItem("FavorGifs", "[]");
    if (!GifComments) localStorage.setItem("GifComments", "[]");
  },
};
</script>

<style >
@import "~@fortawesome/fontawesome-free/css/all.css";
*{
  box-sizing: border-box !important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
  height: 100%;
  /* display: flex; */
  justify-content: center;
  align-items: center;
}

html,
body {
  height: 100%;
  background-color: #011f37 !important;
  padding: 0;
  margin: 0;
}
i{
  cursor: pointer!important;

}
a{
  text-decoration-line: none !important;
}
</style>

