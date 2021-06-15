


<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
  components: {},
  mounted() {
    var LikedMovies = localStorage.getItem("LikedMovies");
    var FavorMovies = localStorage.getItem("FavorMovies");
    var MovieComments = localStorage.getItem("MovieComments");

    if (!LikedMovies) localStorage.setItem("LikedMovies", "[]");
    if (!FavorMovies) localStorage.setItem("FavorMovies", "[]");
    if (!MovieComments) localStorage.setItem("MovieComments", "[]");
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

