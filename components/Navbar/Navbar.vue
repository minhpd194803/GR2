<template>  
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">Home</el-menu-item>
      <el-menu-item index="2">Transactions</el-menu-item>
      <el-menu-item index="3">Blocks</el-menu-item>
      <el-menu-item index="4">Relayers</el-menu-item>
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
      }
    }
  }
</script>

