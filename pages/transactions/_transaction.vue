<template>
  <div>
    <Navbar :active-index="2"/>
    <h1>{{ transactionHash }}</h1>
  </div>
</template>

<script>
import Navbar from '../../components/Navbar/Navbar.vue'

export default {
  async asyncData({ params }) {
    console.log(params)
    const transactionHash = params.transactionHash 
    return { transactionHash }
  },
  name: 'Transactions',
  components: {
    Navbar,
  },
}
</script>
