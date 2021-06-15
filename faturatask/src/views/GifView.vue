<template>
  <p class="text-warning">gifView</p>
  <GifCard :gifData="gifData" :isGifView="true"></GifCard>
</template>
<script>
import GifCard from "../components/GifCard.vue";
import ApiService from "../core/services/api.service";

export default {
  name: "GifView",
  data() {
    return {
        gifData:{},
        id:undefined
    };
  },
   props: {
    // gifData: {
    //   type: Object,
    // },
  },
  components: {
    GifCard,
  },
  methods: {
       getGifData(id) {
      var c =  ApiService.get(
        "https://api.giphy.com/v1/gifs/"+id+"?api_key=3weDLpWtOkfjTUlkuk8WV4JPCehxBvNL&lang=en"
      )
        .then(({ data }) => {
          var x = data;
          this.gifData = Object.assign({}, x.data);
          console.log("df",this.gifData);
        })
        .catch(() => {
          console.log("error");
        });
      console.log("c", c,this.gifData);
    },
  },
  mounted() {
       if (this.$route.params.id != undefined) {
      this.id = this.$route.params.id;
      this.getGifData(this.id);
    } 
  },
};
</script>
