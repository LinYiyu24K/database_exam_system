<template>
  <div style="padding:0 5px 0 5px">
    <h3>考试信息</h3>
    <div style="margin:10px 0"></div>
    <el-table :data="tableData" border style="width: 100%" max-height="700">
    
        <el-table-column prop="testname" label="考试场名" sortable width="200">
        </el-table-column>
        
        <el-table-column
            prop="start_time_of_test"
            label="开始时间"
            sortable
            width="200"
        >
        </el-table-column>

        <el-table-column
            prop="end_time_of_test"
            label="结束时间"
            sortable
            width="200"
        >
        </el-table-column>

        <el-table-column
            prop="score"
            label="分数"
            width="150">
            <template slot-scope="scope">
                <el-button
                @click.native.prevent="showAllStudentsGrade(scope.$index, scope.row)"
                type="text"
                size="small">
                查看
                </el-button>
            </template>
        </el-table-column>

        <el-table-column
            label="操作"
            width="150"
            sortable>
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
import {requestExaminationInfo, requestdeleteTest} from '@/api/user'

export default {
  name: 'StudentGrade',
  data() {
      return {
          tableData:[
              {
                  testno : 1,
                  testname : "考试一",
                  start_time_of_test : "2019-1-5 10:00:00",
                  end_time_of_test : "2019-1-5 12:00:00",
                  score : 88
              }
          ]
      }
    },
    methods: {
      showAllStudentsGrade(index,row){
          console.log('该场考试所有学生的成绩是')
      },
      deleteRow(index,rows){
          this.$confirm('移除该场考试，相关学生成绩也将失效，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            requestdeleteTest(rows[index]).then(data=>{
              console.log(data);
              var data = data.data;
              if(data.success){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
                console.log('删除了考试：'+rows[index])
                this.getTestLists();
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
      //时间转换函数
        getDateString(time) {
            var date = new Date(time);
            var strDate = date.getDate(),
                seperator1 = '-',
                seperator2 = ':';
            var month = date.getMonth() + 1;
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            var currentdate = date.getYear() + seperator1 + month + seperator1 + strDate
                    + " " + date.getHours() + seperator2 + date.getMinutes()
                    + seperator2 + date.getSeconds();
            return currentdate;
        },
        getTestLists(){
            var user = JSON.parse(window.localStorage.getItem('user')),
            tno = user.tno || user.account;
            requestExaminationInfo({tno}).then(data => {
                console.log("ExaminationInfo return data>>>>>>>>>>>>>")
                console.log(data)
                var data = data.data;
                if(data.success){
                    var ret = data.result;  //start_time_of_test,end_time_of_test,testno,testname,testpaperno
                    ret.forEach(item => {
                        item.end_time_of_test = this.getDateString(item.end_time_of_test);
                        item.start_time_of_test = this.getDateString(item.start_time_of_test);
                    });
                    this.tableData = ret;
                }else{
                    this.$message({
                    message: "操作失败！",
                    type: 'error'
                    })
                }
            })
        }
    },
    computed:{
        
    },
    created(){
        //Todo：初始化tableData的数据
        this.getTestLists()
    }
}
</script>

<style scoped>
h3{
  width:100%;
  line-height:30px;
}
</style>