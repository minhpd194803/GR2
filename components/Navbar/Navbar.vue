<template>  
  <div>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">Home</el-menu-item>
      <el-menu-item index="2">Transactions</el-menu-item>
      <el-menu-item index="3">Blocks</el-menu-item>
      <el-submenu index="4">
        <template slot="title">Relayers</template>
          <el-menu-item index="4-1">Cosmos</el-menu-item>
          <el-menu-item index="4-2">Injective</el-menu-item>
          <el-menu-item index="4-3">Band</el-menu-item>
          <el-menu-item index="4-4">Juno</el-menu-item>
          <el-menu-item index="4-5">Kava</el-menu-item>
      </el-submenu>
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

