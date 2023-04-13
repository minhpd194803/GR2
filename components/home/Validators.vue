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
  import { mapGetters } from 'vuex';
  import axios from 'axios';
  export default {
    data(){
      return {
        validators: [],
        tableData: [],
        bondedTokens: 0,
        isFetched: false,
      }
    },
    computed: {
      ...mapGetters(['getBondedTokens'])
    },
    methods:{
      async fetchValidators(){
        const res = await axios.get('https://cosmos.lcd.atomscan.com/cosmos/staking/v1beta1/validators?page.offset=1&pagination.limit=500&status=BOND_STATUS_BONDED')
        this.validators = res.data.validators
      },
      getTableData(){
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
        const bondedTokens = this.getBondedTokens
        tempdata.forEach((validator) => {
          let tempValidator = {}
          tempValidator.name = validator.description.moniker
          tempValidator.commission = this.convertCommission(parseFloat(validator.commission.commission_rates.rate))
          tempValidator.delegations = this.convertDelegations(parseFloat(validator.tokens))
          tempValidator.power = (validator.tokens/(10000*bondedTokens)).toFixed(2) + '%'
          this.tableData.push(tempValidator)
        })

      },
      validatorSort(first,second){

      },
      convertCommission(commissionData){
        return (commissionData*100).toFixed(2) + '%'
      },
      convertDelegations(delegationData){
        if (delegationData > 100000000000000){
          return (delegationData/1000000000000000).toFixed(2) + 'B'
        }
        else if (delegationData > 100000000000){
          return (delegationData/1000000000000).toFixed(2) + 'M'
        }
        else
          return String((delegationData/1000000).toFixed(2))
      },
    },
    created(){
      let fetchApi = async () => {
        await this.fetchValidators()
        this.getTableData()
        this.isFetched = true
      }
      fetchApi()
    }
  }
</script>

<style>

</style>