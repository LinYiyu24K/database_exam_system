<template>
  <div style="padding:0 5px 0 5px">
    <h3>考试发布</h3>

    <el-table :data="tableData" border style="width: 100%" max-height="700"  v-loading="loading">
    <el-table-column prop="testpapername" label="试卷名" sortable width="200">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>试卷编号: {{ scope.row.testpaperno }}</p>
              <div slot="reference" class="name-wrapper">
                {{ scope.row.testpapername }}
              </div>
          </el-popover>
      </template>
    </el-table-column>
    
    <el-table-column prop="tno" label="出卷老师编号">
      <template slot-scope="scope">
        <el-tag
          type="primary"
          disable-transitions>{{scope.row.tno}}</el-tag>
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
import {requestGetTestpaperLists,requestdeleteTestpaper} from '@/api/user'
export default {
  name: 'PublishTest',
  data() {
      return {
        loading:true,
        tableData: []
      }
    },
    methods: {
      
      deleteRow(index, rows) {
        this.$confirm('此操作将永久移除该试卷，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            requestdeleteTestpaper(rows[index]).then(data=>{
              console.log(data)
              var data = data.data;
              if(data.success){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                console.log('删除了试卷：'+rows[index])
                this.getTestpaperLists();
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
      getTestpaperLists(){
        var user = JSON.parse(window.localStorage['user']),
            tno = user.tno || user.account;
        requestGetTestpaperLists({'tno':tno}).then(data=>{
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
      this.getTestpaperLists();
    }
}
</script>

<style scoped>
h3{
  width:100%;
  line-height:30px;
}
</style>