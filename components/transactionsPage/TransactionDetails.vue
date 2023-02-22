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
    'transactionHash',
  ],
  data() {
    return {
      tableData: [
        {
          category: 'Hash',
          data: '',
        },
        {
          category: 'Time',
          data: '',
        },
        {
          category: 'Status',
          data: '',
        },
        {
          category: 'Block',
          data: '',
        },
        {
          category: 'Gas(used/wanted)',
          data: '',
        },
        {
          category: 'Fee',
          data: '',
        },
        {
          category: 'Memo',
          data: '',
        },
        {
          category: 'Total',
          data: '',
        },
      ],
      apiData: {},
      isFetched: false,
    }
  },
  methods: {
    async fetchTransaction() {
      const res = await axios.get('https://cosmos.lcd.atomscan.com/cosmos/tx/v1beta1/txs/' + this.transactionHash)
      this.apiData = res.data
      console.log(this.apiData)
    },
    convertToTableData() {
      // TO-DO
      this.tableData[0].data = this.apiData.tx_response.txhash
      this.tableData[1].data = this.convertdate(this.apiData.timestamp)
      this.tableData[2].data = this.apiData.tx_response.code == 0 
        ? 'success' 
        : this.apiData.tx_response.raw_log
      this.tableData[3].data = this.apiData.tx_response.height
      this.tableData[4].data = this.convertGas(this.apiData.tx_response.gas_used,this.apiData.tx_response.gas_wanted)
      this.tableData[5].data = (this.apiData.tx.auth_info.fee.amount[0].amount/1000000).toFixed(6) + ' ATOM'
      this.tableData[6].data = !!this.apiData.tx.body.memo ? this.apiData.tx.body.memo : 'No Memo' 
      this.tableData[7].data = this.getTotal() + ' ATOM'
    },
    convertdate(data) {
      let temp = ''
      temp = data
      const date = temp.slice(0,9) + ' ' +temp.slice(11,19)
      return date
    },
    convertGas(used,wanted){
      const gasUsed = (used/1000000).toFixed(6)
      const gasWanted = (wanted/1000000).toFixed(6)
      return gasUsed + ' ATOM/ ' + gasWanted + ' ATOM'
    },
    getTotal(){
      let amount = 0
      this.apiData.tx_response.logs.forEach((log) => {
        log.forEach((evnt) => {
          if(evnt.type === 'coin_received') 
            amount += parseFloat(evnt.attributes[1].value.slice(0,5))
        })
      })
      return amount
    }
  },
  created() {
    let fetchApi = async () => {
      await this.fetchTransaction()
      this.convertToTableData()
      this.isFetched = true
    }
    fetchApi()
  }
}
</script>

<style scoped>

</style>