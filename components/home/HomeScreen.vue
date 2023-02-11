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
      printApi(){
        axios('https://api.mintscan.io/v2/utils/market/prices?currency=usd', {
          method: 'get', 
          // headers: {
          //   'Access-Control-Allow-Origin': 'http://localhost:3000/',
          //   'Content-Type': 'application/json',
          // },
        })
          .then((response) => {
            console.log(response)
          })
          .catch((response) => {
            console.log(response)
          }
        )
      },
    },
    mounted(){
      this.printApi()
    }
  }
</script>

<style scoped>

</style>
