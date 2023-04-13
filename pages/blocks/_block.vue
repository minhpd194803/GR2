<template>
  <div>
    <Navbar :activeIndex="'3'" />
    <BlockDetails :block="block"/>
    <BlockTransactions :block="block"/>
  </div>
</template>

<script>
import BlockDetails from '../../components/blocksPage/BlockDetails.vue';
import Navbar from '../../components/Navbar/Navbar.vue';
import BlockTransactions from '../../components/blocksPage/BlockTransactions.vue';

export default {
  async asyncData({ params }) {
    const block = params.block 
    return { block }
  },
  name: 'Transactions',
  components: {
    BlockDetails,
    Navbar,
    BlockTransactions,
  },
}
</script>
