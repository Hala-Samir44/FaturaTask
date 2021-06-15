
<template>
  <div class="m-3">
    <div
      class="text-light m-5"
      style="
        border-radius: 20px;
        overflow: hidden;
        box-shadow: 5px 10px 25px rgb(202, 200, 200);
      "
      v-bind:style="{ width: isGifView ? '' : '300px' }"
    >
      <router-link v-bind:to="'/GifView/' + gifData.id">
        <div>
          <img
            :src="'https://media2.giphy.com/media/' + gifData.id + '/giphy.gif'"
            alt=""
            style="width: 100%"
            v-bind:style="{ height: isGifView ? '350px' : '215px' }"
          />
        </div>
        <div class="p-2">
          <h5 class="mb-0">{{ gifData.title }}</h5>
          <h6 class="d-flex justify-content-start">
            username:
            <span class="text-danger">
              {{
                gifData.username == null || gifData.username == ""
                  ? " - - "
                  : gifData.username
              }}</span
            >
          </h6>
          <h6 class="d-flex justify-content-start">
            Released:
            <span class="text-danger">
              {{ convertDate(gifData.import_datetime) }}</span
            >
          </h6>
          <h6 class="d-flex justify-content-start">
            Rating: <span class="text-danger"> {{ gifData.rating }}</span>
          </h6>
        </div>
      </router-link>

      <div class="d-flex justify-content-end p-2 align-items-center">
        <span> {{ noOfComment }} </span>
        <span class="text-white m-1" v-on:click="openComment()">
          <i class="fas fa-comment-dots"></i>
        </span>
        &nbsp;
        <span class="text-primary m-1">
          <i
            v-bind:class="{
              'text-primary fas': isLike,
              'text-white far': !isLike,
            }"
            class="fa-thumbs-up"
            v-on:click="LikedOrNo(gifData.id)"
          ></i>
        </span>

        <span class="text-primary m-1">
          <i
            v-bind:class="{
              'text-danger fas': isfavor,
              'text-white far': !isfavor,
            }"
            class="fa-heart"
            v-on:click="FavorOrNo()"
          ></i>
        </span>
      </div>

      <div v-if="isGifView" class="m-3">
        <hr />
        <h5>Comments</h5>
        <div v-for="com of MovieComments" :key="com.id">
          <div
            class="
              p-3
              m-2
              mt-3
              d-flex
              justify-content-between
              align-items-center
            "
            style="background-color: rgb(202, 221, 255); border-radius: 20px"
          >
            <div class="text-dark">{{ com.text }}</div>
            <div
              class="d-flex justify-content-between align-items-center"
              style="cursor: pointer"
            >
              <span
                style="cursor: pointer !important"
                title="Reply"
                id="com.id"
                class="text-secondary mr-1"
                v-on:click="
                  openReply = true;
                  isReply = true;
                  commentId = com.id;
                "
              >
                <i class="fas fa-reply"></i>
              </span>
            </div>
          </div>
          <div
            v-for="reply of com.replies"
            :key="reply.id"
            class="p-2 mb-2 text-start"
            style="
              background-color: rgb(116, 148, 204);
              border-radius: 20px;
              padding-left: 1.5rem !important;
              margin-left: 6rem !important;
            "
          >
            {{ reply }}
          </div>
          <div
            v-if="openReply && com.id == commentId"
            class="m-3 ml-1 d-flex align-items-center"
            style="
              background-color: #6c757d;
              border-radius: 20px;
              padding-left: 1rem;
            "
          >
            Reply
            <input
              class="form-control p-2"
              type="text"
              name=""
              placeholder="Reply"
              id=""
              v-model="newReply"
              v-on:keyup.enter="
                addComment(newReply, true);
                newReply = '';
              "
              style="
                background-color: rgb(181, 186, 196);
                border-radius: 20px;
                border: 1px solid red !importent;
                margin-left: 1rem;
              "
            />
          </div>
        </div>

        <div
          class="m-2 d-flex justify-content-between align-items-center"
          style="background-color: rgb(202, 221, 255); border-radius: 20px"
        >
          <input
            style="
              background-color: white;
              border-radius: 20px;
              border: white !importent;
            "
            class="form-control p-3"
            type="text"
            name=""
            placeholder="New Comment"
            id=""
            v-model="newComment"
            v-on:keyup.enter="
              addComment(newComment, false);
              newComment = '';
            "
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  name: "GifCard",
  data() {
    return {
      cardData: null,
      data: {},
      isLike: undefined,
      isfavor: undefined,
      noOfComment: undefined,
      MovieComments: [],
      openReply: false,
      newComment: "",
      newReply: "",
      commentId: undefined,
      outerReply: "",
      outerGifId: undefined,
    };
  },
  // props:['gifData'],
  props: {
    gifData: {
      type: Object,
    },
    isGifView: Boolean,
  },
  watch: {
    gifData(val) {
      this.cardData = val;
      this.isLike = !this.isLike;
      this.isfavor = !this.isfavor;
      this.noOfComment = !this.noOfComment;
      this.data.import_datetime = moment(
        String(this.data.import_datetime)
      ).format("DD/MM/YYYY");
    },
    isLike() {
      var LikedMovies = JSON.parse(localStorage.getItem("LikedMovies") ?? "");
      this.isLike = LikedMovies?.includes(this.gifData.id);
    },
    isfavor() {
      var FavorMovies = JSON.parse(localStorage.getItem("FavorMovies") ?? "");
      this.isfavor = FavorMovies?.includes(this.gifData.id);
    },
    noOfComment() {
      var comments = JSON.parse(localStorage.getItem("MovieComments") ?? "");
      this.MovieComments = comments.filter((i) => i.movieId == this.gifData.id);
      this.noOfComment = this.MovieComments?.length;
    },
  },
  methods: {
    openComment() {
      this.$emit("clicked", { isOpen: true, id: this.gifData.id });
      console.log("ff");
      // this.$refs.btna.click();
    },
    PressComment(commentText, isReply, gifId) {
      (this.outerReply = commentText), (this.outerGifId = gifId);
      // console.log("kj", document.querySelector("#comment"));
      // this.$refs.comm.click();
      this.addComment(commentText, isReply, gifId);
      // this.$refs.btna.click();
    },
    convertDate(dte) {
      return moment(String(dte)).format("DD/MM/YYYY");
    },
    LikedOrNo(movId) {
      var LikedMovies = JSON.parse(localStorage.getItem("LikedMovies") ?? "");
      var like = LikedMovies.includes(movId);
      if (like) {
        LikedMovies = LikedMovies.filter((i) => i != movId);
      } else {
        LikedMovies.push(movId);
      }
      localStorage.setItem("LikedMovies", JSON.stringify(LikedMovies));
      this.isLike = !this.isLike;
    },
    FavorOrNo() {
      var FavorMovies = JSON.parse(localStorage.getItem("FavorMovies") ?? "");
      var favor = FavorMovies.includes(this.gifData.id);
      if (favor) {
        FavorMovies = FavorMovies.filter((i) => i != this.gifData.id);
      } else {
        FavorMovies.push(this.gifData.id);
      }
      localStorage.setItem("FavorMovies", JSON.stringify(FavorMovies));
      this.isfavor = !this.isfavor;
    },
    addComment(commentText, isReply, gifId = this.gifData.id) {
      var comments = JSON.parse(localStorage.getItem("MovieComments") ?? "");
      var oldcomments = comments.filter((i) => i.movieId == gifId);

      if (isReply) {
        var oldcomment = oldcomments.find((i) => i.id == this.commentId);
        oldcomment.replies?.push(commentText);
      } else {
        var newComment = {
          id: oldcomments.length,
          text: commentText,
          movieId: gifId,
          replies: [],
        };
        comments.push(newComment);
      }
      localStorage.setItem("MovieComments", JSON.stringify(comments));
      this.noOfComment = !this.noOfComment;
    },
  },
  mounted() {
    console.log("Dds", this.gifData.id);
    this.isLike = false;
    this.isfavor = false;
    this.noOfComment = 0;
  },
};
</script>
<style scoped>
.overview {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 5px 10px;
}
.form-control:focus {
  border-color: inherit;
  -webkit-box-shadow: none;
  box-shadow: none;
}
</style>