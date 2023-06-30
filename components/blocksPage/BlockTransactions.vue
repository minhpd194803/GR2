<template>
  <div class="table-border">
    <transition name="el-zoom-in-top">
      <el-table
        v-show="this.isFetched"
        :data="tableData"
        stripe
        style="width: 100%; cursor: pointer;"
        highlight-current-row
        @current-change="handleCurrentChange"
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
    </transition>
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
  data(){
    return{
      isFetched: false,
      txResponse: [],
      txs: [],
      tableData: [],
    }
  },
  methods: {
    async fetchPrice(){
      const res = await axios.get(`https://${chainDiffrence[this.chainName].firstLink}.atomscan.com${chainDiffrence[this.chainName].secondLink}/cosmos/tx/v1beta1/txs?events=tx.height=${this.block}`)
      this.txResponse = res.data.tx_responses
      this.txs = res.data.txs
    },
    convertToTableData(){
      this.txResponse.forEach((tx,index) => {
        let tempData = {}
        tempData.type = null
        let totalAmount = 0
        tempData.hash = this.convertLongData(tx.txhash)
        tempData.fullHash = tx.txhash
        if (tx.logs.length > 1) {
          tempData.type = 'multiple'
          tempData.from = '--'
          tempData.to = '--'
          tx.logs.forEach((log) => {
            if(log.events.length > 0) log.events.forEach((evnt) => {
              if(evnt.type === 'coin_spent') 
                totalAmount+=parseFloat(evnt.attributes[1].value.slice(0,evnt.attributes[1].value.length-5))
            })
          })
        }
        else if (tx.logs.length == 1) {
          if (tx.logs[0].events.length > 0) tx.logs[0].events.forEach((evnt) => {
            if(evnt.type === 'proposal_vote') {
              tempData.type = 'Vote'
              let option = ''
              switch(JSON.parse(evnt.attributes[0].value).option){
                case 1: 
                  option = 'Yes'
                  break;
                case 2:
                  option = 'Abstain'
                  break;
                case 3:
                  option = 'No'
                  break;
                default: 
              }
              tempData.to = option + ' on #' + evnt.attributes[1].value
            }
            if(evnt.type === 'message' && evnt.attributes[0].value.includes('MsgVote')){
              tempData.from = this.convertLongData(evnt.attributes[2].value)
            }
            if(evnt.type === 'delegate') tempData.type = 'Delegate'
            if(evnt.type === 'withdraw_rewards') tempData.type = 'Withdraw Rewards'
            if(evnt.type === 'update_client') tempData.type = 'Update Client'
            if(evnt.type === 'ibc_transfer') tempData.type = 'IBC Transfer'
            if(evnt.type === 'coin_spent') {
              totalAmount+=parseFloat(evnt.attributes[1].value.slice(0,evnt.attributes[1].value.length-5))
              tempData.from = this.convertLongData(evnt.attributes[0].value)
            }
            if(evnt.type === 'coin_received') tempData.to = this.convertLongData(evnt.attributes[0].value)
          })
          tempData.from = tempData.from || '--'
          tempData.to = tempData.to || '--'
          tempData.type = tempData.type ?? '--'
        }
        tempData.from = this.convertLongData(this.txs[index].body.messages[0].grantee) ?? tempData.from
        tempData.type = tempData.type ?? 'Failed'
        tempData.totalAmount = this.convertAmountOfTokens(totalAmount)
        tempData.since = this.checkTimeSince(tx.timestamp)
        if(tempData.type === null) tempData.type = 'Send'
        this.tableData.push(tempData)
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
        return ''
      }
    },
    convertAmountOfTokens(amount){
      return (amount/chainDiffrence[this.chainName].unitDivision).toFixed(6) + chainDiffrence[this.chainName].secondUnit
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
    },
      handleCurrentChange(event){
        location.replace(`http://localhost:3000/${this.chainName}/transactions/${event.fullHash}`)
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

<style scoped>
.el-table__header-wrapper{
  height: 60px;
}
.table-border{
  width: calc(100%-60px);
  padding: 10px;
  margin: 20px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  border-radius: 10px;
  background-color: white;
}
</style>