<template>
  <transition name=".el-fade-in-linear">
    <el-container v-if="isFetched">
      <el-main>
        <el-row :gutter="40">
          <el-col :span="6">
            <el-dropdown class="shadow small-content row">
              <span class="row align-center" style="width: 100%">
                <img :src="getIcon(chainDiffrence[chainName].iconLink)" class="icon">
                {{ chainName }}
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item 
                  v-for="(chain, key) in chainDiffrence" 
                  class="drop-item"
                >
                  <div 
                    class="drop-item" 
                    v-if="!!chain.iconLink"
                    @click="changeChain(key)"
                    >
                    <img :src="getIcon(chain.iconLink)" class="icon">
                    {{ key }}
                  </div>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
          <el-col :span="18" class="shadow small-content row align-center info-row">
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
        chainDiffrence: chainDiffrence,
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
        else if (number > 1000){
          return (number/1000).toFixed(2) + 'K'
        }
        else return String((number).toFixed(2))
      },
      toPercentage(Number){
        return (Number * 100).toFixed(2) + '%'
      },
      changeChain(chain){
        console.log(chain)
        this.$emit('change-chain',chain)
      },
      getIcon(iconLink){
        return `https://atomscan.com/img/icons/chains/${iconLink}`
      },
      ...mapActions(['setBondedTokens']),
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
    },
    watch: {
      chainName: {
        async handler() {
          this.isFetched = false
          await this.fetchBondedToken()
          await this.fetchChainData()
          await this.fetchAmountToken()
          await this.fetchInflation()
          await this.fetchPrice()
          this.isFetched = true
        },
        immediate: true,
      }
    },
  }

</script>

<style scoped>
  .info-row{
    width: calc(75% - 20px);
  }
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
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    background-color: white;
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
    margin: 2px;
    height: 24px;
    width: 24px;
  }
  .drop-item{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }
</style>