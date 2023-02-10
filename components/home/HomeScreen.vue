<template>
  <div>
    <div>
      GR2
    </div>
  </div>
</template>

<script>
  import ElementUI from 'element-ui';
  import axios from 'axios';

  export default {
    data(){
      return {

      }
    },  
    methods:{
      printApi(){
        axios('https://api.cosmos.network/blocks/latest', {
          method: 'get', 
          mode: 'no-cors',
          headers: {
            'Access-Control-Allow-Origin': 'http://localhost:3000/',
          //   'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            console.log(response)
          })
          .catch((response) => {
            console.log(response)
          })
      },
    },
    mounted(){
      this.printApi()
    }
  }
</script>

<style scoped>

</style>
