<template>
  <el-container class="table-border">
    <el-header style="height: 20px;">
      <span style="color:green; font-size: 1.5em;">
        <i class="el-icon-money"></i>
        Transaction
      </span>
    </el-header>
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
</template>

<script>
import chainDiffrence from '../constant.js'
import axios from 'axios'
export default {
  props: {
    transactionHash: {
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
      const res = await axios.get(`https://${chainDiffrence[this.chainName].firstLink}.atomscan.com${chainDiffrence[this.chainName].secondLink}/cosmos/tx/v1beta1/txs/${this.transactionHash}`)
      this.apiData = res.data
    },
    convertToTableData() {
      // TO-DO
      this.tableData[0].data = this.apiData.tx_response.txhash
      this.tableData[1].data = this.convertdate(this.apiData.tx_response.timestamp)
      this.tableData[2].data = this.apiData.tx_response.code == 0 
        ? 'success' 
        : this.apiData.tx_response.raw_log
      this.tableData[3].data = this.apiData.tx_response.height
      this.tableData[4].data = this.convertGas(this.apiData.tx_response.gas_used,this.apiData.tx_response.gas_wanted)
      this.tableData[5].data = (this.apiData.tx.auth_info.fee.amount[0].amount/chainDiffrence[this.chainName].unitDivision).toFixed(6) + ' ' + chainDiffrence[this.chainName].secondUnit
      this.tableData[6].data = !!this.apiData.tx.body.memo ? this.apiData.tx.body.memo : 'No Memo' 
      this.tableData[7].data = this.getTotal() + ' ' + chainDiffrence[this.chainName].secondUnit
    },
    convertdate(data) {
      let temp = ''
      temp = data
      const date = temp.slice(0,9) + ' ' +temp.slice(11,19)
      return date
    },
    convertGas(used,wanted){
      const gasUsed = (used/chainDiffrence[this.chainName].unitDivision).toFixed(6)
      const gasWanted = (wanted/chainDiffrence[this.chainName].unitDivision).toFixed(6)
      return gasUsed + ` ${chainDiffrence[this.chainName].secondUnit} / ` + gasWanted + ` ${chainDiffrence[this.chainName].secondUnit} ` 
    },
    getTotal(){
      let amount = 0
      this.apiData.tx_response.logs.forEach((log) => {
        log.events.forEach((evnt) => {
          if(evnt.type === 'coin_received' || evnt.type === 'fungible_token_packet') {
            evnt.attributes.forEach((atrb) => {
              if(atrb.key === 'amount') {
                if(atrb.value.includes(chainDiffrence[this.chainName].unit))
                  amount += parseFloat(atrb.value.slice(0,atrb.value.length-5)/chainDiffrence[this.chainName].unitDivision)
                else 
                  amount += parseFloat(atrb.value.slice(0,atrb.value.length)/chainDiffrence[this.chainName].unitDivision)
              }
            })
          }
        })
      })
      return amount.toFixed(6)
    },
    redirectTransaction(){
      
    }
  },
  created() {
    let fetchApi = async () => {
      await this.fetchTransaction()
      this.convertToTableData()
      this.isFetched = true
    }
    fetchApi()
  },
}
</script>

<style scoped>
.table-border{
  width: calc(100%-60px);
  padding: 10px;
  margin: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
}
.el-table__header-wrapper{
  height: 0px;
}
</style>