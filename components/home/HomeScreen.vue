<template>
  <div>
    <div>
      GR2
    </div>
    <Navbar/>
    <ChainInfo/>
    <LatestTransactions/>
    <Validators/>
  </div>
</template>

<script>
import axios from 'axios';
import Navbar from '../Navbar/Navbar.vue';
import ChainInfo from './chainInfo/ChainInfo.vue';
import LatestTransactions from './latestTransactions/LatestTransactions.vue';
import Validators from './validators/Validators.vue';

export default {
  components:{
    Navbar,
    ChainInfo,
    LatestTransactions,
    Validators
  },
}
</script>

<style scoped>

</style>
