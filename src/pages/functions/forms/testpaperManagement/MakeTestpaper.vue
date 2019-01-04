<template>
  <div style="padding:0 5px 0 5px">
    <h3>试卷制作</h3>
    <el-steps :active="active" finish-status="success" simple style="margin-top: 20px;margin-bottom:3px">
      <el-step title="6道单选题" ></el-step>
      <el-step title="6道判断题" ></el-step>
      <el-step title="5道双选题" ></el-step>
      <el-step title="3道综合题" ></el-step>
      <el-step title="组卷成功" ></el-step>
    </el-steps>
    <el-table :data="filterTableData" border style="width: 100%" max-height="700"  v-loading="loading" @selection-change="handleSelectionChange">
    <el-table-column
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column prop="qcontent" label="题目描述" sortable width="300">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>题号: {{ scope.row.qno }}</p>
            <p>分值: {{ scope.row.qvalue }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.qcontent }}
              </div>
          </el-popover>
      </template>
    </el-table-column>
    
    <el-table-column prop="qtype" label="题目类型">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.qtype === '单选' ? 'primary' : scope.row.qtype === '多选'?'success':'warning'"
          disable-transitions>{{scope.row.qtype}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column
      fixed="right"
      label="分值"
      width="180"
      prop="qanswer">
    </el-table-column>
  </el-table>
   <div style="margin-top: 20px;margin-right:30px;float:right">
    <el-button @click="nextStep" type="primary">{{buttonMsg}}</el-button>
  </div>
  </div>
</template>

<script>
import {requestGetQuestionLists,requestaddTestpaper} from '@/api/user'
export default {
  name: 'MakeTestpaper',
  data() {
      return {
        loading:true,
        active:0,
        buttonMsg:'下一步',
        tableData: [],
        //选中的行
        multipleSelection:[],
        result:[]
      }
    },
    methods: {
      
      getQuestionLists(){
        requestGetQuestionLists({}).then(data=>{
        console.log(data)
        var data = data.data;
        this.loading= false;
        if(data.success){
          this.tableData = data.result;
        }
      })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        console.log("_____选中的行是______");
        console.log(this.multipleSelection)
      },
      nextStep() {
        switch(this.active){
          case 0:
          case 1:{
            if(this.multipleSelection.length!==6){
                this.$notify.error({
                  title: '提示',
                  message: '已选择题目数量不正确，请选择准确数量的题目',
                  position: 'top-right'
                });
                return
            }else{
                this.result = this.result.concat(this.multipleSelection);
                this.active = this.active + 1;
                console.log("____this.result_____")
                console.log(this.result)
            }
            break;
          }
          case 2:{
            if(this.multipleSelection.length!==5){
                this.$notify.error({
                  title: '提示',
                  message: '已选择多选题目数量不正确，请选择准确数量的题目',
                  position: 'top-right'
                });
                return
            }else{
                this.result = this.result.concat(this.multipleSelection);
                this.active = this.active + 1;
                this.buttonMsg = '点击组卷';
                console.log("____this.result_____")
                console.log(this.result)
            }
            break;
          }
          case 3:{
            if(this.multipleSelection.length!==3){
                this.$notify.error({
                  title: '提示',
                  message: '已选择综合题目数量不正确，请选择准确数量的题目',
                  position: 'top-right'
                });
                return
            }else{
                this.result = this.result.concat(this.multipleSelection);
                this.active = this.active + 1;
                console.log("____this.result_____")
                console.log(this.result)
                //发起组卷请求
                this.$prompt('请输入试卷名', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消'
                }).then(({ value }) => {
                  var user = JSON.parse(window.localStorage['user']);
                  var params = {
                      "testpapername":value,
                      "tno":user.tno || user.account,
                      "questionArray":JSON.stringify(this.result)
                  }
                  console.log("________组卷请求________")
                  console.log(params)
                  this.loading = true;
                  requestaddTestpaper(params).then(data=>{
                      this.active = 5;
                      this.loading = false;
                      var data = data.data;
                      console.log("_____组卷成功____")
                      console.log(data);
                      if(data.success){
                        this.$message({
                          type: 'success',
                          message: '试卷：' + value+" 组卷成功！"
                        });
                      }else{
                        this.$message({
                          type: 'error',
                          message: '试卷：' + value+" 组卷失败！"
                        }); 
                      }
                        this.active = 0;
                        this.buttonMsg = '下一步'
                  }).catch(()=>{
                        this.$message({
                          type: 'error',
                          message: '试卷：' + value+" 组卷失败！"
                        });
                        this.active = 0;
                  })
                }).catch(() => {
                  this.$message({
                    type: 'info',
                    message: '取消组卷'
                  });       
                });
            }
            break;
          }
          case 4:{
                
                break;
          }
          default:
            this.active = 5;
            break;
        }
      },
    },
    computed:{
        //每一步筛选出来的tableData 数据
        filterTableData(){
          switch(this.active){
            case 0:{
              return this.tableData.filter(item=>{
                return item.qtype == '单选';
              });
              break;
            }
            case 1:{
              return this.tableData.filter(item=>{
                return item.qtype == '判断';
              });
              break;
            }
            case 2:{
              return this.tableData.filter(item=>{
                return item.qtype == '多选';
              });
              break;
            }
            case 3:{
              return this.tableData.filter(item=>{
                return item.qtype == '综合';
              });
              break;
            }
            default:{
              return this.tableData.filter(item=>{
                return item.qtype == '综合';
              });
              break;
            }
          }
        },
    },
    created(){
      this.getQuestionLists();
      this.$notify.info({
          title: '提示',
          message: '请选择准确数量的各类题目:',
          position: 'top-right',
          duration: 0
        });
    }
}
</script>

<style scoped>
h3{
  width:100%;
  line-height:30px;
}
</style>