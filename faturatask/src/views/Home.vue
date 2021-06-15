<template>
  <div v-if="commentDialogOpen">
    <div
      class="
        w-100
        bg-secondary
        d-flex
        justify-content-center
        align-items-center
        position-fixed
      "
      style="top: 0; opacity: 0.5; height: 100%"
    ></div>
    <div
      class="
        w-100
        d-flex
        justify-content-center
        align-items-center
        position-fixed
      "
      style="height: 100%"
    >
      <div class="w-50 bg-white text-center p-3" style="height: 50%">
        <h3 class="text-primary">Add New Comment</h3>
        <textarea
          v-model="commentText"
          name=""
          id=""
          rows="7"
          class="form-control"
        ></textarea>
        <div class="d-flex justify-content-end mt-3">
          <button
            class="btn btn-primary m-2"
            v-on:click="
              $refs.gif.PressComment(commentText, false, currentMovieId),
                (commentDialogOpen = false),
                (commentText = ''),
                $refs.gif.pp('12')
            "
          >
            Add
          </button>
          <button
            class="btn btn-secondary m-2"
            v-on:click="commentDialogOpen = false"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>

  <div class="">
    <div id="header" class="p-2 d-flex justify-content-center"  style=" background-color: #6c757d;">
      <div><router-link to="/">Welcome Page</router-link></div>
      <div v-on:click="getGifsList">Home</div>
      <div v-on:click="getFavGif">
        Favorite GIF
      </div>
      <div v-on:click="getLikeGif">Like's GIF</div>
    </div>
  </div>

  <div class="mt-5">
    <h1>Hello in the Home Page</h1>
    <div class="d-flex justify-content-center">
      <div class="d-flex w-50 m-5">
        <input
        placeholder="Search about GIF"
          type="text"
          class="form-control"
          v-model="searchWord"
          v-on:keyup.enter="searchGifs()"
        /><Button class="btn bg-white" v-on:click="searchGifs()">Q</Button>
      </div>
    </div>

    <div class="d-flex justify-content-around flex-wrap">
      <GifCard
        v-for="data of objs"
        :key="data.id"
        ref="gif"
        :gifData="data"
        @clicked="OpencommentDialog"
      ></GifCard>
    </div>
  </div>
</template>

<script>
import ApiService from "../core/services/api.service";

import GifCard from "../components/GifCard.vue";
export default {
  name: "Home",
  data() {
    return {
      searchWord: "",
      objs: {},
      commentDialogOpen: false,
      commentText: "",
      currentMovieId: 0,
    };
  },
  components: {
    GifCard,
  },
  methods: {
    OpencommentDialog(value) {
      console.log(value);
      this.currentMovieId = value.id;
      this.commentDialogOpen = value.isOpen;
    },
    async getGifsList() {
      var c = await ApiService.get(
        "https://api.giphy.com/v1/gifs/trending?api_key=3weDLpWtOkfjTUlkuk8WV4JPCehxBvNL&offset=0&limit=6&lang=en"
      )
        .then(({ data }) => {
          var x = data;
          this.objs = Object.assign({}, x.data);
          console.log("lknb", this.objs);
        })
        .catch(() => {
          console.log("error");
        });

      console.log("c", c);
      // this.obj= c["data"]["data"][0].id
      // this.obj= c.data.data[0].id
    },
    async getFavGif() {
      var FavorGifIDs = JSON.parse(localStorage.getItem("FavorMovies") ?? "");

      var c = await ApiService.get(
        "https://api.giphy.com/v1/gifs?api_key=3weDLpWtOkfjTUlkuk8WV4JPCehxBvNL&ids=" +
          FavorGifIDs.toString() +
          "&limit=6&offset=0&lang=en"
      )
        .then(({ data }) => {
          console.log("kjh", data);
          var x = data;
          this.objs = Object.assign({}, x.data);
        })
        .catch(() => {
          console.log("error");
        });

      console.log("cn", c, this.objs);
      // this.obj= c["data"]["data"][0].id
      // this.obj= c.data.data[0].id
    },
    async getLikeGif() {
      var LikedGifIDs = JSON.parse(localStorage.getItem("LikedMovies") ?? "");

      var c = await ApiService.get(
        "https://api.giphy.com/v1/gifs?api_key=3weDLpWtOkfjTUlkuk8WV4JPCehxBvNL&ids=" +
          LikedGifIDs.toString() +
          "&limit=6&offset=0&lang=en"
      )
        .then(({ data }) => {
          console.log("kjh", data);
          var x = data;
          this.objs = Object.assign({}, x.data);
        })
        .catch(() => {
          console.log("error");
        });

      console.log("cn", c, this.objs);
      // this.obj= c["data"]["data"][0].id
      // this.obj= c.data.data[0].id
    },

    searchGifs() {
      if (this.searchWord) {
        console.log("jhj");
        ApiService.get(
          "https://api.giphy.com/v1/gifs/search?api_key=3weDLpWtOkfjTUlkuk8WV4JPCehxBvNL&q=" +
            this.searchWord +
            "&limit=6&offset=0&lang=en"
        )
          .then(({ data }) => {
            var x = data;
            this.objs = Object.assign({}, x.data);
          })
          .catch(() => {
            console.log("error");
          });
      }
    },
  },
  mounted() {
      this.getGifsList();
  },
};
</script>
<style scoped>
#header,
a {
  color: white !important;
  font-size: 20px;
}
#header > div {
  cursor: pointer;
  margin: 0 15px;
}
</style>