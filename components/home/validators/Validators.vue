<template>
  <div>
    <el-container>
      <el-header>Validators</el-header>
      <el-main>
        <el-table
          v-if="isFetched"
          :default-sort = "{prop: 'delegations', order: 'descending'}"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="Name"
            width="180">
          </el-table-column>
          <el-table-column
            prop="commission"
            label="Commission"
            width="180">
          </el-table-column>
          <el-table-column
            prop="delegations"
            label="Delegations">
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    data(){
      return {
        validators: [],
        tableData: [],
        isLoaded: false,
      }
    },
    methods:{
      async fetchValidators(){
        const res = await axios.get('https://cosmos.lcd.atomscan.com/cosmos/staking/v1beta1/validators?page.offset=1&pagination.limit=500&status=BOND_STATUS_BONDED')
        this.validators = res.data.validators
        console.log(this.validators)
      },
      getTableData(){
        let tempdata = []
        this.validators.forEach((validator) => {
          let tempValidator = {}
          tempValidator.name = validator.description.moniker
          tempValidator.commission = this.convertCommission(validator.commission.commission_rates.rate)
          tempValidator.delegations = parseFloat(this.convertDelegations(validator.delegator_shares))
          tempdata.push(tempValidator)
        })
        this.tableData = tempdata.sort((first,second) => {
          const firstValidator = parseFloat(first.delegator_shares)
          const secondValidator = parseFloat(second.delegator_shares)
          if(firstValidator > secondValidator){
            return 1
          }
          else if(firstValidator < secondValidator){
            return -1
          }
          return 0
        }).slice(0,19)
      },
      convertCommission(commissionData){
        return (commissionData*100).toFixed(2) + '%'
      },
      convertDelegations(delegationData){
        if (delegationData > 1000000000000000){
          return (delegationData/1000000000000000).toFixed(2) + 'B'
        }
        else if (delegationData > 1000000000000){
          return (delegationData/1000000000000).toFixed(2) + 'M'
        }
      },
    },
    created(){
      let fetchApi = async () => {
        this.fetchValidators()
        this.isLoaded = true
      }
    }
  }
</script>

<style>

</style>