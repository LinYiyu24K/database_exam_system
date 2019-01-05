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
            label="操作"
            width="150">
            <template slot-scope="scope">
                <el-button
                @click.native.prevent="takeExamination(scope.$index, scope.row)"
                type="text"
                size="small">
                进入考试
                </el-button>
            </template>
        </el-table-column>

        <el-table-column
            prop="grade"
            label="分数"
            width="150"
            sortable>
        </el-table-column>

    </el-table>

  </div>
</template>

<script>
import {requestExaminationInfo, } from '@/api/user'

export default {
  name: 'ExaminationInfo',
  data() {
      return {
          tableData:[
              {
                  testno : 1,
                  testname : "考试一",
                  start_time_of_test : "2019-1-5 10:00:00",
                  end_time_of_test : "2019-1-5 12:00:00",
                  grade : 88
              }
          ]
      }
    },
    methods: {
      takeExamination(index,row) {
        var now = new Date();
        var endTime = new Date(row.end_time_of_test);
        if(row.grade != 0){
            this.$notify.info({
                title: '提示',
                message: '你已考试完毕！'
            });
            return
        }else if(now > endTime){
            //做题时间已经超出 答题时限
            this.$notify.error({
                title: '操作失败',
                message: '已超出作答时间！无法进行考试！'
            });
            return
        }else{
            //Todo：跳转至考试页面

        }
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
            var format = function(num){
                if(num >= 0 && num <= 9){
                    num = "0" + num;
                }
                return num;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + format(date.getHours()) + seperator2 + format(date.getMinutes())
                    + seperator2 + format   (date.getSeconds());
            return currentdate;
        }
    },
    computed:{
        
    },
    created(){
        //Todo：初始化tableData的数据
        var user = JSON.parse(window.localStorage.getItem('user')),
            sno = user.sno || user.account;
        requestExaminationInfo({sno}).then(data => {
            console.log("ExaminationInfo return data>>>>>>>>>>>>>")
            console.log(data)
            var data = data.data;
            if(data.success){
                var ret = data.result;  //start_time_of_test,end_time_of_test,testno,testname,testpaperno
                ret.forEach(item => {
                    item.end_time_of_test = this.getDateString(item.end_time_of_test);
                    item.start_time_of_test = this.getDateString(item.start_time_of_test);
                    // item.grade = 0;
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
}
</script>

<style scoped>
h3{
  width:100%;
  line-height:30px;
}
</style>