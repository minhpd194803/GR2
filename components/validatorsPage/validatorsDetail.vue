<template>
  <div class="table-border">
    <el-container>
      <el-header style="height:20px;">
        <span style="color:gold; font-size: 1.5em;">
          <i class="el-icon-files"></i>
          Validator Details
        </span>
      </el-header>
      <div class="line"></div>
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
            <el-table-column prop="data">
              <template slot-scope="scope">
                <s
              </template>
            </el-table-column>
          </el-table>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>

export default {
  props:[
    'validator'
  ],
  data(){
    return {
      tableData:[
        {
          category: 'Validator Address',
          data: '',
        },
        {
          category: 'Website',
          data: '',
        },
        {
          category: 'Comission',
          data: '',
        },
        {
          category: 'Max Comission',
          data: '',
        },
        {
          category: 'Comission Updated',
          data: '',
        },
        {
          category: 'Voting Power',
          data: '',
        },
        {
          category: 'Staked',
          data: '',
        },
        {
          category: 'Comissions Received',
          data: '',
        },

      ],
    }
  },methods: {
    async fetchValidator() {
      const res = await axios.get('https://cosmos.lcd.atomscan.com/cosmos/staking/v1beta1/validators/' + this.validator)
      this.apiData = res.data
    },
    async convertToTableData() {
      // do something ... 
      this.tableData[0].data = this.apiData.validator.operator_address
      this.tableData[1].data = this.apiData.validator.description.website?
        "http://" + this.apiData.validator.description.website : ''
    },
    convertdate(data) {
      let temp = ''
      temp = data
      const date = temp.slice(0,9) + ' ' +temp.slice(11,19)
      return date
    },
  },
  created() {
    let fetchApi = async () => {
      await this.fetchValidator()
      await this.convertToTableData()
      this.isFetched = true
    }
    fetchApi()
  }
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
</style>