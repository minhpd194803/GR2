<template>
  <el-container>
    <el-header style="height: 20px;">
      <span style="color:gold; font-size: 1.5em;">
        <i class="el-icon-files"></i>
        Latest Blocks
      </span>
    </el-header>
    <el-main>
      <transition name="el-zoom-in-top">
        <el-table
          v-if="this.isFetched"
          :data="tableData"
          stripe
          style="width: 100%; cursor: pointer;"
          highlight-current-row
          @current-change="handleCurrentChange"
        >
          <el-table-column
            prop="height"
            label="Height"
            width="200px">
          </el-table-column>
          <el-table-column
            prop="proposer"
            label="Proposer Hash">
          </el-table-column>
          <el-table-column
            prop="txs"
            label="Number of tx">
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
      async fetchLatestBlocks(){
        const res = await axios.get('https://cosmos.rpc.atomscan.com/blockchain?page=')
        this.apiData = res.data.result.block_metas
      },
      convertToTableData(){
        this.apiData.forEach((data) => {
          let tempData = {}
          tempData.height = data.header.height
          tempData.proposer = this.convertLongData(data.header.proposer_address)
          tempData.txs = data.num_txs
          tempData.since = this.checkTimeSince(data.header.time)
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
        console.log(event)
      },
      handleCurrentChange(event){
        location.replace("http://localhost:3000/blocks/" + event.height)
      }
      
    },
    created(){
      let fetchApi = async () => {
        await this.fetchLatestBlocks()
        this.convertToTableData()
        this.isFetched = true
      }
      fetchApi()
    },
  }
</script>

<style scoped>

</style>