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
          if(data.Messages.length > 1){
            tempData.type = 'multiple'
            tempData.from = '--'
            tempData.to = '--'
          }
          else{
            tempData.type = data.Messages[0].Type.Text
            tempData.from = this.convertLongData(data.Messages[0].From)
            tempData.to = this.convertLongData(data.Messages[0].To)
          }
          let total = 0
          data.Messages.forEach((message) => {
            if(!!message.Amounts[0]){
              total+=message.Amounts[0]
            }
          })
          tempData.totalAmount = this.convertAmountOfTokens(total) 
          tempData.since = 'hehe'
          this.tableData.push(tempData)
        })
        console.log(this.tableData)
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