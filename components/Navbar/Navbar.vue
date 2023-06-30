<template>  
  <div>
    <el-menu 
      :default-active="activeIndex" 
      class="el-menu-demo sticky"
      mode="horizontal" 
      @select="handleSelect"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">Home</el-menu-item>
      <el-menu-item index="2">Transactions</el-menu-item>
      <el-menu-item index="3">Blocks</el-menu-item>
      <el-menu-item index="4">Relayers</el-menu-item>
      <el-menu-item index="5">IBC map</el-menu-item>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
  import chainDifference from '../constant.js'
  export default {
    props:[
      'activeIndex'
    ],
    computed: {
      chains(){
        const hehe = chainDifference.map(chain => chain)
        console.log(hehe)
        return hehe
      }
    },
    methods: {
      handleSelect(key) {
        if(key == 1) location.replace("http://localhost:3000")
        if(key == 4) location.replace("http://localhost:3000/relayers")
        if(key == 5) location.replace("http://localhost:3000/map")
      }
    },
    head: {
      bodyAttrs: {
        class: 'head'
      }
    }
  }
</script>

<style scoped>
.sticky {
  position: fixed;
  width: 100%;
  z-index: 1;
  top: 0px;
}

.head{
  margin: 0px;
  margin-top: 60px;
}
</style>
