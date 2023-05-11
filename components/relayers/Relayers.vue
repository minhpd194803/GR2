<template>
  <div v-if="!isLoading">
    <el-collapse v-model="activeName" accordion v-for="chain in tableData">
      <el-container v-if="!!chainDifference[chain.chainName].iconLink">
        <el-main>
          <el-collapse-item :name="chain.chainName">
            <template slot="title">
              <img :src="getIcon(chainDifference[chain.chainName].iconLink)" class="icon">
              {{ chain.chainName }}
            </template>
            <el-table
              :data="chain.relayers"
              stripe
              style="width: 100%; cursor: pointer;"
            >
              <el-table-column
                prop="channelFrom"
                label="channel">
              </el-table-column>
              <el-table-column
                prop="stateFrom"
                label="state">
              </el-table-column>
              <el-table-column
                prop="channelTo"
                label="channel">
              </el-table-column>
              <el-table-column
                prop="stateTo"
                label="state">
              </el-table-column>
              <el-table-column
                prop="operationTime"
                label="operationTime">
              </el-table-column>
              <el-table-column
                prop="txs"
                label="Tx last 24h">
              </el-table-column>
            </el-table>
          </el-collapse-item>
        </el-main>
      </el-container>
    </el-collapse>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import chainDifference from '../constant.js';
import axios from 'axios';
export default {
  data() {
    return {
      chainDifference: chainDifference,
      activeName: '',
      isLoading: true,
      apiData: [],
      tableData: [],
    }
  },
  computed: {
    ...mapGetters(['getChainName']),
  },
  methods: {
    async fetchData() {
      const res = await axios.get(`https://api.mintscan.io/v2/relayer/${chainDifference[this.getChainName].relayer}/paths`)
      this.apiData = res.data.sendable
    },
    async processData() {
      for(let chain in chainDifference){
        let tempChain = {
          chainName: '',
          relayers: [],
        }
        this.apiData.forEach(data => {
          let tempRelayer = {}
          if( chainDifference[chain].relayer == data.chain_id ){
            // if this chain's id is identicle to this api's chain_id then take all of its relayers
            console.log(data)
            data.paths.forEach(relayer => {
              // data preprocessing
              tempRelayer.channelFrom = this.getChainName
              tempRelayer.stateFrom = relayer.channel_state
              tempRelayer.channelTo = chain
              tempRelayer.stateTo = relayer.counter_party.channel_state
              tempRelayer.operationTime = this.processDate(relayer.created_at ?? '')
              let {receive, transfer} = relayer.stats.current.tx_num
              tempRelayer.txs = Number(receive) + Number(transfer)
              // include this relayer in the tempchain.relayers
              tempChain.relayers.push(tempRelayer)
            })
            tempChain.chainName = chain
          }
        })
        if(tempChain.chainName){
          this.tableData.push(tempChain)
        }
      }
    },
    processDate(created_at = '2022-01-20') {
      if (created_at) return '--'
      const dateCreated = new Date(created_at.slice(0,9)).getTime()
      const dateCurrent = new Date().getTime()
      let timeDiffrence = (dateCurrent - dateCreated) / 31536000
      if (timeDiffrence > 1) {
        return timeDiffrence + 'days ago'
      }
      else{
        return (dateCurrent - dateCreated) / 86400 + 'years ago'
      }
    },
    getIcon(iconLink) {
      return `https://atomscan.com/img/icons/chains/${iconLink}`
    },
  },
  async created() {
    this.isLoading = true
    await this.fetchData()
    await this.processData()
    this.isLoading = false
  },

}
</script>

<style scoped>
.icon {
  margin: 2px;
  height: 24px;
  width: 24px;
}
</style>