<template>  
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">Home</el-menu-item>
      <el-menu-item index="2">Transactions</el-menu-item>
      <el-menu-item index="3">Blocks</el-menu-item>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
  export default {
    props:[
      'activeIndex'
    ],
    methods: {
      handleSelect(key) {
        if(key == 1) location.replace("http://localhost:3000")
      }
    }
  }
</script>

