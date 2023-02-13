<template>
  <div>
    <div>
      GR2
    </div>
    <Navbar/>
    <div>
      <ChainInfo/>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Navbar from '../Navbar/Navbar.vue';
  import ChainInfo from './chainInfo/ChainInfo.vue';

  export default {
    components:{
      Navbar,
      ChainInfo
    },
    data(){
      return {

      }
    },  
    methods:{
      
    },
    mounted(){

    }
  }
</script>

<style scoped>

</style>
