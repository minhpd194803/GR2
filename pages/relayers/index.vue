<template>
  <div>
    <Navbar :active-index="'4'"/>
    <ChainInfo :chainName="getChainName" @change-chain="setChainName"/>
    {{ hehe }}
    <Relayers/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Navbar from '../../components/Navbar/Navbar.vue';
import ChainInfo from '../../components/home/ChainInfo.vue';
import Relayers from '../../components/relayers/Relayers.vue';
export default {
  components: {
    Relayers,
    ChainInfo,
    Navbar
  },
  data(){
    return{
      hehe: '',
    }
  },
  computed: {
    ...mapGetters(['getChainName']),
  },
  methods: {
    setChainName(name){
      this.$store.dispatch('setChainName', name)
    },
  },
  mounted(){
    // console.log(this.getChainName)
  },
}
</script>

<style scoped>

</style>