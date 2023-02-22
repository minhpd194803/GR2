<template>
  <div>
    <Navbar :active-index="'2'"/>
    <h1>{{ transactionHash }}</h1>
    <TransactionDetails :transactionHash="transactionHash" />
  </div>
</template>

<script>
import Navbar from '../../components/Navbar/Navbar.vue'
import TransactionDetails from '../../components/transactionsPage/TransactionDetails.vue'
export default {
  async asyncData({ params }) {
    console.log(params)
    const transactionHash = params.transaction 
    return { transactionHash }
  },
  name: 'Transactions',
  components: {
    Navbar,
    TransactionDetails,
  },
}
</script>
