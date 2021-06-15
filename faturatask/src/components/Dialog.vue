<template>
  <div v-if="false" class=" w-100" style="top: 0; height: 100%">
    <div
      class="
        w-100
        bg-secondary
        d-flex
        justify-content-center
        align-items-center
        position-fixed
      "
      style="top: 0; opacity: 0.3; height: 100%"
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
            v-on:click="openComment()
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
</template>

<script>

export default {
  name: "Dialog",
  data() {
    return {
        commentText:""
    };
  },
  methods:{
      openComment() {
      this.$emit("clicked", this.commentText);
    },
  },
  mounted() { 
  },
};
</script>