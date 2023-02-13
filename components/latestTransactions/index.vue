<template>
  <div>
    <el-table
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

  export default {
    data(){
      return{
        apiData: {},
        tableData: {},
      }
    },
    methods:{
      async fetchPrice(){
        const res = await axios.get('https://index.atomscan.com/transactions?')
        this.apiData = res.data
        console.log(this.apiData)
      },
    },
  }
</script>

<style scoped>

</style>