<template>
  <transition name=".el-fade-in-linear">
    <el-container v-if="isFetched">
      <el-main>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="shadow small-content row align-center">
              <img :src="getIcon" class="icon">
              {{ chainName }}
            </div>
          </el-col>
          <el-col :span="18" class="shadow small-content row align-center">
            <div>
              {{ getPrice }}
            </div>
            <div>
              {{ getInflation }}
            </div>
            <div>
              {{ getBondedTokens }}
            </div>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="shadow content column">
              <span style="color:green; font-size: 1.5em;">
                <i class="el-icon-s-grid"></i>
                Height
              </span>
              <div class="line"></div>
              <div>
                {{ chainInfo.block.last_commit.height }}
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="shadow content column">
              <span style="color:blue; font-size: 1.5em;">
                <i class="el-icon-bank-card"></i>
                Staked
              </span>
              <div class="line"></div>
              <div>
                {{ stakeWidget }}
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="shadow content column">
              <span style="color:red; font-size: 1.5em;">
                <i class="el-icon-data-line"></i>
                Inflation
              </span>
              <div class="line"></div>
              <div>
                {{ inflationWidget }}
              </div>
            </div>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </transition>
  
</template>

<script>
import chainDiffrence from '../constant.js'
import { mapActions } from 'vuex';
import axios from 'axios';
  export default {
    props:[
      'chainName'
    ],
    components:{
      
    },
    data(){
      return {
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
      },
      async fetchChainData(){
        const res = await axios.get(`https://${chainDiffrence[this.chainName].firstLink}.atomscan.com${chainDiffrence[this.chainName].secondLink}/cosmos/base/tendermint/v1beta1/blocks/latest`)
        this.chainInfo = res.data
      },
      async fetchBondedToken(){
        const res = await axios.get(`https://${chainDiffrence[this.chainName].firstLink}.atomscan.com${chainDiffrence[this.chainName].secondLink}/cosmos/staking/v1beta1/pool`)
        this.bondedTokens = res.data.pool.bonded_tokens / chainDiffrence[this.chainName].unitDivision
        this.setBondedTokens(this.bondedTokens)
      },
      async fetchAmountToken(){
        const res = await axios.get(`https://${chainDiffrence[this.chainName].firstLink}.atomscan.com${chainDiffrence[this.chainName].secondLink}/cosmos/bank/v1beta1/supply/${chainDiffrence[this.chainName].unit}`)
        this.amountTokens = res.data.amount.amount / chainDiffrence[this.chainName].unitDivision
      },
      async fetchInflation(){
        const res = await axios.get(`https://${chainDiffrence[this.chainName].firstLink}.atomscan.com${chainDiffrence[this.chainName].secondLink}/cosmos/mint/v1beta1/inflation`)
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
      ...mapActions(['setBondedTokens'])
    },
    computed:{
      stakedPercentage() {
        return this.toPercentage(this.bondedTokens/this.amountTokens)
      },
      getCurrentChainPrice(){
        return this.chainPrice[chainDiffrence[this.chainName].secondUnit].price.toFixed(2)
      },
      stakeWidget(){
        const amountTokens = this.convertBigNumber(this.amountTokens)
        const bondedTokens = this.convertBigNumber(this.bondedTokens)
        return bondedTokens + '/' + amountTokens 
      },
      inflationWidget(){
        return this.toPercentage(this.inflation)
      },
      getPrice(){
        return 'Price: ' + this.getCurrentChainPrice + '$'
      },
      getInflation(){
        return 'Inflation: ' + this.inflationWidget 
      },
      getBondedTokens(){
        return 'Bonded: ' 
          + this.convertBigNumber(this.bondedTokens) 
          + '(' + this.stakedPercentage + ')'
      },
      getIcon(){
        return `https://atomscan.com/img/icons/chains/${chainDiffrence[this.chainName].iconLink}`
      },
    },
    created(){
      let fetchData = async () => {
        await this.fetchBondedToken()
        await this.fetchChainData()
        await this.fetchAmountToken()
        await this.fetchInflation()
        await this.fetchPrice()
        this.isFetched = true
      }
      fetchData()

    }
  }

</script>

<style scoped>
  .small-content{
    border-radius: 10px;
    margin-bottom: 10px;
    height: 50px;
  }
  .content{
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 10px;
    height: 80px;
  }
  .shadow{
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  .column{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }
  .row{
    display: flex;
    flex-direction: row;
  }
  .align-center{
    justify-content: space-evenly; 
    align-items: center;
  }
  .icon{
    height: 24px;
    width: 24px;
  }

</style>