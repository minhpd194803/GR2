<template>
  <div class="table-border">
    <el-container>
      <el-header style="height:20px;">
        <span style="color:gold; font-size: 1.5em;">
          <i class="el-icon-files"></i>
          Block Details
        </span>
      </el-header>
      <div class="line"></div>
      <el-main>
        <transition name="el-zoom-in-top">
          <el-table
            v-show="this.isFetched"
            :data="tableData"
            stripe
            style="width: 100%"
          >
            <el-table-column
              prop="category"
              width="300">
            </el-table-column>
            <el-table-column
              prop="data">
            </el-table-column>
          </el-table>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import chainDiffrence from '../constant.js'
import axios from 'axios'
export default {
  props: {
    block: {
      type: String,
    },
    chainName: {
      type: String,
    }
  },
  data() {
    return {
      tableData: [
        {
          category: 'Time',
          data: '',
        },
        {
          category: 'Height',
          data: '',
        },
        {
          category: 'Number of Transactions',
          data: '',
        },
        {
          category: 'Block hash',
          data: '',
        },
        {
          category: 'Proposer',
          data: '',
        }
      ],
      apiData: {},
      isFetched: false,
    }
  },
  methods: {
    async fetchBlock() {
      const res = await axios.get(`https://${chainDiffrence[this.chainName].firstLink}.atomscan.com${chainDiffrence[this.chainName].secondLink}/cosmos/base/tendermint/v1beta1/blocks/${this.block}`)
      this.apiData = res.data
    },
    async convertToTableData() {
      this.tableData[0].data = this.convertdate(this.apiData.block.header.time)
      this.tableData[1].data = this.block
      let temp = []
      temp = this.apiData.block.data.txs
      this.tableData[2].data = temp.length
      this.tableData[3].data = await this.sha256(this.apiData.block_id.hash)
      this.tableData[4].data = await this.sha256(this.apiData.block.header.validators_hash)   
    },
    convertdate(data) {
      let temp = ''
      temp = data
      const date = temp.slice(0,10) + ' ' +temp.slice(11,19)
      return date
    },
    async sha256(message) {
      // encode as UTF-8
      const msgBuffer = new TextEncoder().encode(message);                    

      // hash the message
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

      // convert ArrayBuffer to Array
      const hashArray = Array.from(new Uint8Array(hashBuffer));

      // convert bytes to hex string                  
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    }
  },
  created() {
    let fetchApi = async () => {
      await this.fetchBlock()
      await this.convertToTableData()
      this.isFetched = true
    }
    fetchApi()
  }
}
</script>

<style scoped>
.table-border{
  width: calc(100%-60px);
  padding: 10px;
  margin: 20px;
  margin-top: 80px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
    background-color: white;
}
.el-table__header-wrapper{
  height: 0px;
}
</style>