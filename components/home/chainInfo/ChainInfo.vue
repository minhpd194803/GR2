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
    data(){
      return {
        chainInfo:{}
      }
    },
    methods:{
      getApi(){
        axios('https://cosmos.lcd.atomscan.com/cosmos/base/tendermint/v1beta1/blocks/latest',{
          method: 'get',
        })
          .then((response) => {
            console.log(response)
            this.chainInfo = response
          })
          .catch((response) => {
            console.log(response)
          }
        )
      }
    },
    computed:{
      chainHeight(){
        return this.chainInfo.block.last_commit.height
      }
    },
    created(){
      this.getApi()
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