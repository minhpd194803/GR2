<template>
<div>
    <el-table
      v-if="this.isFetched"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="hash"
        label="Hash"
        width="180">
      </el-table-column>
      <el-table-column
        prop="type"
        label="Type"
        width="180">
      </el-table-column>
      <el-table-column
        prop="from"
        label="From">
      </el-table-column>
      <el-table-column
        prop="to"
        label="To">
      </el-table-column>
      <el-table-column
        prop="totalAmount"
        label="TotalAmount">
      </el-table-column>
      <el-table-column
        prop="since"
        label="Since">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  props: {
    block: {
      type: String,
    }
  },
  data(){
    return{
      isFetched: false,
      apiData: [],
      tableData: [],
    }
  },
  methods: {
    async fetchPrice(){
      const res = await axios.get('https://cosmos.lcd.atomscan.com/cosmos/tx/v1beta1/txs?events=tx.height=' + this.block)
      this.apiData = res.data.tx_responses
    },
    convertToTableData(){
      this.apiData.forEach((tx) => {
        let tempData = {}
        let amount = 0
        tempData.hash = this.convertLongData(tx.txhash)
        if (tx.logs.length > 1) tx.logs.forEach((log) => {
          tempData.type = 'multiple'
          tempData.from = '--'
          tempData.to = '--'
          log.forEach((evnt) => {
            if(evnt.type === 'coin_spent') 
              amount+=parseFloat(evnt.attributes[1].value.slice(0,evnt.attributes[1].value.length-5))
          })
          tempData.totalAmount = this.convertAmountOfTokens(amount)
          tempData.since = this.checkTimeSince(tx.timeStamp)
        })
        else {
          tx.logs[0].forEach((evnt) => {
            if(evnt.type === 'proposal_vote') tempData.type = 'vote'
            if(evnt.type === 'delegate') tempData.type = 'delegate'
            if(evnt.type === 'withdraw_rewards') tempData.type = 'withdraw_rewards'
            if(evnt.type === 'coin_spent') {
              amount+=parseFloat(evnt.attributes[1].value.slice(0,evnt.attributes[1].value.length-5))
              tempData.from = this.convertLongData(evnt.attributes[0].value)
            }
            if(evnt.type === 'coin_received') tempData.to = this.convertLongData(evnt.attributes[0].value)
          })
        }
      })
    },

    convertLongData(data){
      let temp = ''
      if(!!data){
        temp = data
        const firstFive = temp.slice(0,5)
        const lastFive = temp.slice(temp.length-5,temp.length)
        const modifiedData = firstFive + '...' + lastFive
        return modifiedData
      }
      else{
        return '--'
      }
    },
    convertAmountOfTokens(amount){
      return (amount/1000000).toFixed(6) + ' ATOM'
    },
    checkTimeSince(time){
      const currentHour = new Date().getUTCHours()
      const currentMinute = new Date().getUTCMinutes()
      const currentSecond = new Date().getUTCSeconds()
      const transactionTime = time.slice(11,19)
      const transactionHour = parseInt(transactionTime.slice(0,2))
      const transactionMinute = parseInt(transactionTime.slice(3,5))
      const transactionSecond = parseInt(transactionTime.slice(6,8))
      const timeSinceTransaction = 3600*(currentHour - transactionHour) 
        + 60*(currentMinute - transactionMinute) 
        + (currentSecond - transactionSecond)

      if ( timeSinceTransaction > 3600 ){
        return parseInt(timeSinceTransaction/3600) + ' hours ago'
      }
      else if ( timeSinceTransaction > 60 ){
        return parseInt(timeSinceTransaction/60) + ' minutes ago'
      }
      else {
        return timeSinceTransaction + ' second ago'
      }
    }
  },
  created(){
    let fetchApi = async () => {
      await this.fetchPrice()
      this.convertToTableData()
      this.isFetched = true
    }
    fetchApi()
  },
}

</script>

<style>

</style>