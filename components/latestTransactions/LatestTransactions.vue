<template>
  <div>
    <el-table
      v-if="this.isFetched"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="Date"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="Address">
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
        tableData: 
        [
          {
            date: 0,
            name: 'hehe',
            address: 'null',
          },
        ]
      }
    },
    methods:{
      async fetchPrice(){
        const res = await axios.get('https://index.atomscan.com/transactions?')
        this.apiData = res.data.transactions
      },
      hashForDisplay(hash){
        let temp = ''
        temp = hash
        const firstFive = temp.slice(0,5)
        const lastFive = temp.slice(temp.length-5,temp.length)
        const modifiedHash = firstFive + '...' + lastFive
        console.log(modifiedHash)
        return modifiedHash
      }
    },
    created(){
      let fetchApi = async () => {
        await this.fetchPrice()
        this.hashForDisplay(this.apiData[0].Hash)
        this.isFetched = true
      }
      fetchApi()
    },
  }
</script>

<style scoped>

</style>