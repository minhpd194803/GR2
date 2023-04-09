<template>
  <el-container>
    <el-header style="height: 20px;">
      <span style="color:green; font-size: 1.5em;">
        <i class="el-icon-money"></i>
        Latest Transactions
      </span>
    </el-header>
    <el-main style="cursor:pointer;"> 
      <transition name="el-zoom-in-top">
        <el-table
          v-show="this.isFetched"
          :data="tableData"
          stripe
          style="width: 100%"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column
            prop="hash"
            label="Hash">
          </el-table-column>
          <el-table-column
            prop="type"
            label="Type">
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
    </el-main>
  </el-container>
</template>

<script>

import axios from 'axios';
  export default {
    data(){
      return{
        isFetched: false,
        apiData: [],
        tableData: [],
      }
    },
    methods:{
      async fetchPrice(){
        const res = await axios.get('https://index.atomscan.com/transactions?')
        this.apiData = res.data.transactions
      },
      convertToTableData(){
        this.apiData.forEach((data) => {
          let tempData = {}
          tempData.hash = this.convertLongData(data.Hash)
          tempData.fullHash = data.Hash
          if(data.Messages.length > 1){
            tempData.type = 'multiple'
            tempData.from = '--'
            tempData.to = '--'
          }
          else{
            tempData.type = data.Messages[0].Type.Text
            tempData.from = this.convertLongData(data.Messages[0].From)
            tempData.to = this.convertLongData(data.Messages[0].To)
            if(tempData.type == 'Vote') tempData.to = data.Messages[0].Voted + ' to #' + data.Messages[0].Proposal
          }
          let total = 0
          data.Messages.forEach((message) => {
            if(!!message.Amounts[0]){
              total+=message.Amounts[0]
            }
          })
          tempData.totalAmount = this.convertAmountOfTokens(total) 
          tempData.since = this.checkTimeSince(data.Time)
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
      },
      handleCurrentChange(event){
        location.replace("http://localhost:3000/transactions/" + event.fullHash)
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

</style>