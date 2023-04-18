<template>
  <div>
    <Navbar :activeIndex="'3'" />
    <BlockDetails :block="block" :chainName="chain"/>
    <BlockTransactions :block="block" :chainName="chain"/>
  </div>
</template>

<script>
import BlockDetails from '../../../components/blocksPage/BlockDetails.vue';
import Navbar from '../../../components/Navbar/Navbar.vue';
import BlockTransactions from '../../../components/blocksPage/BlockTransactions.vue';

export default {
  async asyncData({ params }) {
    const block = params.block 
    console.log(params.chain)
    const chain = params.chain
    return { block, chain }
  },
  name: 'Transactions',
  components: {
    BlockDetails,
    Navbar,
    BlockTransactions,
  },
}
</script>
