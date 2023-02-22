<template>
  <div>
    <NavBar :activeIndex="3"/>
    <h1>{{ block }}</h1>
    <BlockDetails :block="block"/>
  </div>
</template>

<script>
import BlockDetails from '../../components/blocksPage/BlockDetails.vue'
import Navbar from '../../components/Navbar/Navbar.vue'
export default {
  async asyncData({ params }) {
    console.log(params)
    const block = params.block 
    return { block }
  },
  name: 'Transactions',
  components: {
    BlockDetails,
    NavBar,
  },
}
</script>
