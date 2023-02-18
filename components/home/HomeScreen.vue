<template>
  <div>
    <div>
      GR2
    </div>
    <Navbar/>
    <ChainInfo/>
    <LatestTransactions/>
    <Validators/>
    <LatestBlock/>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../Navbar/Navbar.vue';
import ChainInfo from './chainInfo/ChainInfo.vue';
import LatestTransactions from './latestTransactions/LatestTransactions.vue';
import Validators from './validators/Validators.vue';
import LatestBlock from './latestBlock/LatestBlock.vue';

export default {
  components:{
    Navbar,
    ChainInfo,
    LatestTransactions,
    Validators,
    LatestBlock
  },
}
</script>

<style scoped>

</style>
