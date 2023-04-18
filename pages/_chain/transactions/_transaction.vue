<template>
  <div>
    <Navbar :active-index="'2'"/>
    <TransactionDetails :transactionHash="transactionHash" :chainName="chain" />
  </div>
</template>

<script>
import Navbar from '../../../components/Navbar/Navbar.vue'
import TransactionDetails from '../../../components/transactionsPage/TransactionDetails.vue'
export default {
  async asyncData({ params }) {
    const transactionHash = params.transaction 
    const chain = params.chain
    return { transactionHash, chain }
  },
  name: 'Transactions',
  components: {
    Navbar,
    TransactionDetails,
  },
}
</script>
