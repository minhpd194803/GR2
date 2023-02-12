<template>
  <div>
    <el-container>
      <el-header>Orai</el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="shadow content chain-info">
              <div>
                Height
              </div>
              <div class="line"></div>
              <div v-if="isFetched">
                {{ chainInfo.block.last_commit.height }}
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="shadow content chain-info">
              <div>
                Staked
              </div>
              <div class="line"></div>
              <div>
                
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="shadow content chain-info">
              <div>
                
              </div>
              <div class="line"></div>
              <div>
                
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
      coingeckoCoinPriceChartWidget
    },
    data(){
      return {
        chainInfo: null,
        bondedTokens: null,
        amountTokens: null,
        isFetched: false,

      }
    },
    methods:{
      async fetchChainData(){
        const res = await axios.get('https://cosmos.lcd.atomscan.com/cosmos/base/tendermint/v1beta1/blocks/latest')
        this.chainInfo = res.data
        this.isFetched = true
      },
      async getBondedToken(){
        const res = await axios.get('https://cosmos.lcd.atomscan.com/cosmos/staking/v1beta1/pool')
        this.bondedTokens = res.data.pool.bonded_tokens
        console.log(this.bondedTokens)
      },
      async getAmountToken(){
        const res = await axios.get('https://cosmos.lcd.atomscan.com/cosmos/bank/v1beta1/supply/uatom')
        this.amountTokens = res.data.amount.amount
        console.log(this.amountTokens)
      }
    },
    computed:{

    },
    created(){
       
      this.fetchChainData()
      this.getBondedToken()
      this.getAmountToken()

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
  .chain-info{
    display: flex;
    flex-direction: column;
  }

</style>