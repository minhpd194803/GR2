<template>
  <el-container>
    <el-header style="height: 20px;">
      <span style="color:purple; font-size: 1.5em;">
        <i class="el-icon-s-custom"></i>
        Validators
      </span>
    </el-header>
    <el-main>
      <transition name="el-zoom-in-top">
        <el-table
          v-if="isFetched"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="name"
            label="Name"
            width="200px">
          </el-table-column>
          <el-table-column
            prop="commission"
            label="Commission">
          </el-table-column>
          <el-table-column
            prop="delegations"
            label="Delegations">
          </el-table-column>
          <el-table-column
            prop="power"
            label="Power">
          </el-table-column>
        </el-table>
      </transition>
    </el-main>
  </el-container>
</template>

<script>
  import chainDiffrence from '../constant.js'
  import axios from 'axios';
  export default {
    props:[
      'chainName',
    ],
    data(){
      return {
        validators: [],
        tableData: [],
        isFetched: false,
      }
    },
    computed: {
      bondedTokens(){
        return this.$store.state.bondedTokens
      }
    },
    watch:{
      bondedTokens(amount){
        this.handler(amount)
      },
    },
    methods:{
      async fetchValidators(){
        const res = await axios.get(`https://${chainDiffrence[this.chainName].firstLink}.atomscan.com${chainDiffrence[this.chainName].secondLink}/cosmos/staking/v1beta1/validators?page.offset=1&pagination.limit=500&status=BOND_STATUS_BONDED`)
        this.validators = res.data.validators
      },
      async handler(amount){
        this.isFetched = false
        this.tableData = []
        this.validators = []
        await this.fetchValidators()
        await this.getTableData(amount);
        this.isFetched = true
      },
      getTableData(amount){
        let tempdata = this.validators.sort((first,second) => {
          const firstValidator = parseFloat(first.tokens)
          const secondValidator = parseFloat(second.tokens)
          if(firstValidator > secondValidator){
            return -1
          }
          else if(firstValidator < secondValidator){
            return 1
          }
          return 0
        }).slice(0,19)
        tempdata.forEach((validator) => {
          let tempValidator = {}
          tempValidator.name = validator.description.moniker
          tempValidator.commission = this.convertCommission(parseFloat(validator.commission.commission_rates.rate))
          tempValidator.delegations = this.convertDelegations(parseFloat(validator.tokens/chainDiffrence[this.chainName].unitDivision))
          tempValidator.power = (validator.tokens*100/(chainDiffrence[this.chainName].unitDivision*amount)).toFixed(2) + '%'
          this.tableData.push(tempValidator)
        })
      },
      convertCommission(commissionData){
        return (commissionData*100).toFixed(2) + '%'
      },
      convertDelegations(delegationData){
        if (delegationData > 100000000){
          return (delegationData/1000000000).toFixed(2) + 'B'
        }
        else if (delegationData > 1000000){
          return (delegationData/1000000).toFixed(2) + 'M'
        }
        else if (delegationData > 1000){
          return (delegationData/1000).toFixed(2) + 'K'
        }
        else
          return String((delegationData).toFixed(2))
      },
    },
  }
</script>

<style>

</style>