<template>
  <div>
    <el-collapse v-model="activeName" accordion v-for="(chain, key) in chainDiffrence">
      <el-container>
        <el-header>
          <img :src="getIcon(chain.iconLink)" class="icon">
          {{ key }}
        </el-header>
        <el-main v-if="!isLoading">
          <el-collapse-item :title="key" :name="key">
            <el-table>

            </el-table>
          </el-collapse-item>
        </el-main>
      </el-container>
    </el-collapse>
  </div>
</template>

<script>
  import mapGetters from 'vuex'
  import chainDiffrence from '../constant.js'
  export default {
    data(){
      return{
        chainDiffrence: chainDiffrence,
        activeName: '',
        isLoading: '',
        apiData: [],
      }
    },
    computed: {
      ...mapGetters([getChainName]),
    },
    methods: {
      fetchData(){
        const res = axios.get(`https://api.mintscan.io/v2/relayer/${chainDiffrence[getChainName].relayers}/paths`)
        this.apiData = res.sendable
      },
      getIcon(iconLink){
        return `https://atomscan.com/img/icons/chains/${iconLink}`
      },
    },
    created(){

    },

  }
</script>

<style scoped>
  .icon{
    margin: 2px;
    height: 24px;
    width: 24px;
  }
</style>