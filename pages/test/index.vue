<template>
  <div class="layout">
    <div class="wrapper">

    </div>
    <div class="wrapper">
      Nothing to Display
    </div>
  </div>
</template>

<script>
export default {
  components:{

  },
  data(){
    return{

    }
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: rgb(248, 226, 230);
  height: 100vh;
  width: 100vw;
  position: absolute;
  left: 0px;
  top: 0px;
}

.reset-body {
  margin: 0;
}
.overall-wrapper {
  background-color: rgba(242, 238, 234, 0.5);
}
.wrapper {
  margin-top: 5vh;
  display: flex;
  width: 45vw;
  height: 90vh;
  border-radius: 3vh;
  background-color: white;
}
</style>