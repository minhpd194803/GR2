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
  import Navbar from '../components/Navbar/Navbar.vue';
  import ChainInfo from '../components/home/chainInfo/ChainInfo.vue';
  import LatestTransactions from '../components/home/latestTransactions/LatestTransactions.vue';
  import Validators from '../components/home/validators/Validators.vue';
  import LatestBlock from '../components/home/latestBlock/LatestBlock.vue';
  export default {
    name: 'IndexPage',
    components: {
      Navbar,
      ChainInfo,
      LatestTransactions,
      Validators,
      LatestBlock,
    },
  }
</script>
