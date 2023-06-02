<template>
  <div>
    <Navbar :active-index="'1'"/>
    <div>
      <ChainInfo :chainName="getChainName" @change-chain="setChainName"/>
      <div class="table-border table-width-almost-full" v-if="getChainName === 'Cosmos'" >
        <LatestTransactions/>
      </div>
      <div class="flex">
        <div class="table-border table-width-full">
          <Validators :chainName="getChainName"/>
        </div>
        <div class="table-border table-width-full">
          <LatestBlock :chainName="getChainName"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from '../components/Navbar/Navbar.vue';
  import ChainInfo from '../components/home/ChainInfo.vue';
  import LatestTransactions from '../components/home/LatestTransactions.vue';
  import Validators from '../components/home/Validators.vue';
  import LatestBlock from '../components/home/LatestBlock.vue';
  import { mapGetters } from 'vuex';
  export default {
    name: 'IndexPage',
    components: {
      Navbar,
      ChainInfo,
      LatestTransactions,
      Validators,
      LatestBlock,
    },
    data(){
      return{

      }
    },
    computed: {
      ...mapGetters(['getChainName']),
    },
    methods: {
      setChainName(name){
        this.$store.dispatch('setChainName', name)
      }
    },
    mounted(){
      console.log(this.getChainName)
    },
  }
</script>

<style>
* {
  font-family: Verdana, sans-serif !important;
}
.table-border{
  padding-top: 10px;
  margin: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
}
.table-width-full{
  width: 100%
}
.table-width-almost-full{
  width: calc(100%-40px)
}
.flex{
  display: flex;
  flex-direction: row;
}
</style>
