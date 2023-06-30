<template>
  <div v-if="!isLoading">
    <el-collapse v-model="activeName" accordion v-for="chain in tableData">
      <el-container v-if="!!chainDifference[chain.chainName].iconLink">
        <el-main style="background-color: white;">
          <el-collapse-item :name="chain.chainName">
            <template slot="title">
              <img :src="getIcon(chainDifference[chain.chainName].iconLink)" class="icon">
              {{ chain.chainName }}
            </template>
            <el-table
              :data="chain.relayers"
              stripe
              style="width: 100%; cursor: pointer;"
              :default-sort = "{prop: 'transfer', order: 'descending'}"
            >
              <el-table-column prop="channelFrom">
                <template slot="header">
                  <div class="icon_center">
                    <img :src="getIcon(chainDifference[chainName].iconLink)" class="icon"/>
                    channel
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="stateFrom"
                label="state">
              </el-table-column>
              <el-table-column prop="channelTo">
                <template slot="header">
                  <div class="icon_center">
                    <img :src="getIcon(chainDifference[chain.chainName].iconLink)" class="icon"/>
                    channel
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="stateTo"
                label="state">
              </el-table-column>
              <el-table-column
                prop="operationTime"
                label="operationTime">
              </el-table-column>
              <el-table-column label="Tx last 24h">
                <el-table-column
                  prop="transfer"
                  label="Transfer">
                </el-table-column>
                <el-table-column
                  prop="receive"
                  label="Receive">
                </el-table-column>
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
    chainName(){
      return this.$store.state.chainName
    }
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
          if( chainDifference[chain].relayer == data.chain_id ){
            // if this chain's id is identicle to this api's chain_id then take all of its relayers
            data.paths.forEach(relayer => {
              // data preprocessing
              let tempRelayer = {}
              // api destructuring
              let {
                channel_id: channelFrom,
                channel_state: stateFrom,
                counter_party: {
                  channel_id: channelTo,
                  channel_state: stateTo,
                },
                created_at,
                stats: {
                  current: {
                    tx_num: {
                      receive,
                      transfer,
                    }
                  }
                }
              } = relayer

              tempRelayer.channelFrom = channelFrom
              tempRelayer.stateFrom = stateFrom
              tempRelayer.channelTo = channelTo
              tempRelayer.stateTo = stateTo
              tempRelayer.operationTime = this.processDate(created_at ?? '')
              tempRelayer.receive = Number(receive)
              tempRelayer.transfer = Number(transfer)
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
    processDate(created_at) {
      if (!created_at) return '--'
      const dateCreated = new Date(created_at.slice(0,10)).getTime()
      const dateCurrent = new Date().getTime()
      let timeDiffrence = ((dateCurrent - dateCreated) / 86400000).toFixed(0)
      if (timeDiffrence > 365) {
        return (timeDiffrence / 365).toFixed(0) + ' years ago'
      }
      else{
        return timeDiffrence + ' days ago'
      }
    },
    getIcon(iconLink) {
      return `https://atomscan.com/img/icons/chains/${iconLink}`
    },
  },
  watch: {
    chainName: {
      async handler(){
        this.isLoading = true
        this.tableData = []
        this.apiData = []
        await this.fetchData()
        await this.processData()
        this.isLoading = false
      },
      immediate: true
    }
  },

}
</script>

<style scoped>
.icon {
  margin: 2px;
  height: 24px;
  width: 24px;
}
.icon_center{
  display: flex;
  flex-direction: row;
  align-items: center;
}
</style>