<template>
  <div>
    <el-container>
      <el-header>Block Details</el-header>
      <el-main>
        <el-table
          v-if="this.isFetched"
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
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: [
    'block',
  ],
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
      const res = await axios.get('https://cosmos.lcd.atomscan.com/cosmos/base/tendermint/v1beta1/blocks/' + this.block)
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
      const date = temp.slice(0,9) + ' ' +temp.slice(11,19)
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

</style>