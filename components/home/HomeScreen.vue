<template>
  <div>
    <div>
      GR2
    </div>
    <Navbar/>
    <ChainInfo/>
    <LatestTransactions/>
  </div>
</template>

<script>
  import axios from 'axios';
  import Navbar from '../Navbar/Navbar.vue';
  import ChainInfo from './chainInfo/ChainInfo.vue';
  import LatestTransactions from '../latestTransactions/LatestTransactions.vue';

  export default {
    components:{
      Navbar,
      ChainInfo,
      LatestTransactions,
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
