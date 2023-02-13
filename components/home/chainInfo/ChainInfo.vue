<template>
  <div>
    <el-container v-if="isFetched">
      <el-header>{{ chainName }}</el-header>
      <el-main>
        <el-row>
          <div class="shadow content row"> {{ generalInfoWidget }}</div>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="shadow content column">
              <div>
                Height
              </div>
              <div class="line"></div>
              <div>
                {{ chainInfo.block.last_commit.height }}
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="shadow content column">
              <div>
                Staked
              </div>
              <div class="line"></div>
              <div>
                {{ stakeWidget }}
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="shadow content column">
              <div>
                Inflation
              </div>
              <div class="line"></div>
              <div>
                {{ inflationWidget }}
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    components:{
      
    },
    data(){
      return {
        chainName: 'Cosmos',
        chainInfo: null,
        bondedTokens: 1,
        amountTokens: 1,
        inflation: 0,
        chainPrice: [],
        isFetched: false,
      }
    },
    methods:{
      async fetchPrice(){
        const res = await axios.get('https://proxy.atomscan.com/prices')
        this.chainPrice = res.data
        console.log(this.chainPrice)
      },
      async fetchChainData(){
        const res = await axios.get('https://cosmos.lcd.atomscan.com/cosmos/base/tendermint/v1beta1/blocks/latest')
        this.chainInfo = res.data
      },
      async getBondedToken(){
        const res = await axios.get('https://cosmos.lcd.atomscan.com/cosmos/staking/v1beta1/pool')
        this.bondedTokens = res.data.pool.bonded_tokens / 1000000
      },
      async getAmountToken(){
        const res = await axios.get('https://cosmos.lcd.atomscan.com/cosmos/bank/v1beta1/supply/uatom')
        this.amountTokens = res.data.amount.amount / 1000000
      },
      async getInflation(){
        const res = await axios.get('https://cosmos.lcd.atomscan.com/cosmos/mint/v1beta1/inflation')
        this.inflation = res.data.inflation
      },
      convertBigNumber(number){
        if (number > 1000000000){
          return (number/1000000000).toFixed(2) + 'B'
        }
        else if (number > 1000000){
          return (number/1000000).toFixed(2) + 'M'
        }
      },
      toPercentage(Number){
        return (Number * 100).toFixed(2) + '%'
      },
    },
    computed:{
      stakedPercentage() {
        return this.toPercentage(this.bondedTokens/this.amountTokens)
      },
      getCurrentChainPrice(){
        return 0
      },
      stakeWidget(){
        const amountTokens = this.convertBigNumber(this.amountTokens)
        const bondedTokens = this.convertBigNumber(this.bondedTokens)
        return bondedTokens + '/' + amountTokens 
      },
      inflationWidget(){
        return this.toPercentage(this.inflation)
      },
      generalInfoWidget(){
        return 'Price: ' + this.getCurrentChainPrice + '$'
          + 'Inflation: ' + this.inflationWidget 
          + 'Bonded: ' + this.convertBigNumber(this.bondedTokens) 
          + '(' + this.stakedPercentage + ')'
      },
    },
    created(){
      let fetchData = async () => {
        await this.fetchChainData()
        await this.getBondedToken()
        await this.getAmountToken()
        await this.getInflation()
        await this.fetchPrice()
        this.isFetched = true
      }
      fetchData()

    }
  }

</script>

<style scoped>
  .content{
    height: 100px;
  }
  .shadow{
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
  }
  .column{
    display: flex;
    flex-direction: column;
  }
  .row{
    display: flex;
    flex-direction: row;
  }

</style>