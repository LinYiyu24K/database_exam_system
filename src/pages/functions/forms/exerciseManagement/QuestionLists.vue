<template>
  <div style="padding:0 5px 0 5px">
    <h3>题目管理</h3>

    <el-table :data="tableData" border style="width: 100%" max-height="700"  v-loading="loading">
    <el-table-column prop="qcontent" label="题目描述" sortable width="300">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>题号: {{ scope.row.qno }}</p>
            <p>答案: {{ scope.row.qanswer }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.qcontent }}
              </div>
          </el-popover>
      </template>
    </el-table-column>
    
    <el-table-column prop="qtype" label="题目类型"  :filters="[{ text: '单选', value: '单选' }, { text: '多选', value: '多选' },{ text: '判断', value: '判断' },{ text: '综合', value: '综合' }]" :filter-method="filterTag" filter-placement="bottom-end">
      <template slot-scope="scope">
        <el-tag
          :type="scope.row.qtype === '单选' ? 'primary' : scope.row.qtype === '多选'?'success':scope.row.qtype === '判断'?'info':'warning'"
          disable-transitions>{{scope.row.qtype}}</el-tag>
      </template>
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(scope.$index, tableData)"
          type="text"
          size="small">
          移除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
import {requestGetQuestionLists,requestdeleteQuestion} from '@/api/user'
export default {
  name: 'QuestionLists',
  data() {
      return {
        loading:true,
        tableData: []
      }
    },
    methods: {
      
      filterTag(value, row) {
        return row.qtype === value;
      },
      deleteRow(index, rows) {
        this.$confirm('移除该题目，相关试卷题目也将失效，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            requestdeleteQuestion(rows[index]).then(data=>{
              console.log(data)
              var data = data.data;
              if(data.success){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                console.log('删除了题目：'+rows[index])
                this.getQuestionLists();
              }else{
                this.$message({
                  type: 'error',
                  message: '删除失败!'
                });
              }
          }).catch(e=>{
              this.$message({
                type: 'error',
                message: '删除失败'
              });  
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      getQuestionLists(){
        requestGetQuestionLists({}).then(data=>{
        console.log(data)
        var data = data.data;
        this.loading= false;
        if(data.success){
          this.tableData = data.result;
        }
      })
      }
    },
    created(){
      this.getQuestionLists();
    }
}
</script>

<style scoped>
h3{
  width:100%;
  line-height:30px;
}
</style>