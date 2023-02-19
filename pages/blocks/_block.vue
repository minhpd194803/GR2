<template>
  <div>
    <h1>{{ block }}</h1>
    <BlockDetails :block="block"/>
  </div>
</template>

<script>
import BlockDetails from '../../components/blocksPage/BlockDetails.vue'

export default {
  async asyncData({ params }) {
    console.log(params)
    const block = params.block 
    return { block }
  },
  name: 'Transactions',
  components: {
    BlockDetails,
  },
}
</script>
