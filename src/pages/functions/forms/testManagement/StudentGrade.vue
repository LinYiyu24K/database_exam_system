<template>
  <div style="padding:0 5px 0 5px">
    <h3>{{title}}</h3>
    <div style="margin:10px 0"></div>
    <el-table :data="tableData" border style="width: 100%" max-height="700" v-loading="loadding" v-show="!showStudentGrade">
    
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
            label="学生成绩"
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

    <el-table :data="gradeData" border style="width: 100%" max-height="700"  v-show="showStudentGrade">
        
        <el-table-column type="expand">
            <template slot-scope="props">
                <el-form label-position="left" inline class="demo-table-expand">
                <el-form-item label="题目1：" style="width:100%">
                    <span>{{ props.row.synthesis1.qcontent }}</span>
                </el-form-item>
                <el-form-item label="学生答案1：" style="width:100%">
                    <span style="color:red">{{ props.row.synthesis1.qanswer }}</span>
                </el-form-item>
                <el-form-item label="正确答案1：" style="width:100%">
                    <span style="color:green">{{ props.row.synthesis1.trueanswer }}</span>
                </el-form-item>
                <el-form-item label="题目2：" style="width:100%">
                    <span>{{ props.row.synthesis2.qcontent }}</span>
                </el-form-item>
                <el-form-item label="学生答案2：" style="width:100%">
                    <span style="color:red">{{ props.row.synthesis2.qanswer }}</span>
                </el-form-item>
                <el-form-item label="正确答案2：" style="width:100%">
                    <span style="color:green">{{ props.row.synthesis2.trueanswer }}</span>
                </el-form-item>
                <el-form-item label="题目3：" style="width:100%">
                    <span>{{ props.row.synthesis3.qcontent }}</span>
                </el-form-item>
                <el-form-item label="学生答案3：" style="width:100%">
                    <span style="color:red">{{ props.row.synthesis3.qanswer }}</span>
                </el-form-item>
                <el-form-item label="正确答案3：" style="width:100%">
                    <span style="color:green">{{ props.row.synthesis3.trueanswer }}</span>
                </el-form-item>
                
                <el-form-item label="请输入该学生综合题总分">
                    <el-input v-model="synthesisGrade"></el-input>
                </el-form-item>
                
                <el-form-item>
                    <el-button type="primary" @click.native.prevent="onSubmit(props.row.sno)">提交分数</el-button>
                </el-form-item>
                </el-form>
            </template>
        </el-table-column>

        <el-table-column
            prop="sno"
            label="学生学号"
        >
        </el-table-column>

        <el-table-column
            prop="sname"
            label="学生名"
        >
        </el-table-column>

        <el-table-column
            prop="grade"
            label="选择、判断题分数"
            sortable>
        </el-table-column>
        <el-table-column
            prop="sumgrade"
            label="总成绩"
            sortable>
        </el-table-column>

    </el-table>

    <div v-show="showStudentGrade" style='margin:10px auto;width:200px;'>
        <el-button type='primary' style='width:200px' @click.native.prevent="back()">返回</el-button>
    </div>
                
  </div>
  
</template>

<script>
import {requestExaminationInfo, requestdeleteTest, requestgetTestStudentGrade,requestModifyGrade} from '@/api/user'

export default {
  name: 'StudentGrade',
  data() {
      return {
          title: '考试信息',
          tableData:[],
          gradeData:[
              {
                  sno:"123",
                  sname:'12323132132',
                  grade:199
              }
          ],
          loadding:false,
          showStudentGrade:false,
          synthesisGrade:0,
          //存储当前选中的试卷号
          testno:''
      }
    },
    methods: {
        onSubmit(sno){
            console.log("学生的学号是："+sno);
            console.log("学生的综合题分数是是："+this.synthesisGrade);
            var grade = + this.synthesisGrade;
            if(typeof grade != 'number' || grade<0 || grade>45){
                console.log(typeof grade)
                this.$message({
                    type:'error',
                    message:'请输入 0-45 范围的数字分数'
                })
                this.synthesisGrade = 0;
                return false;
            }
            //TODO
            var params = {
                "synthesisGrade" : this.synthesisGrade,
                "sno" : sno,
                "testno":this.testno
            }
            requestModifyGrade(params).then(data=>{
                var data = data.data;
                console.log("_____老师评卷学生 "+sno+" 的综合题成绩成功____-");
                console.log(data)
                if(data.success){
                    this.$message({
                        type:'success',
                        message:'评分成功'
                    })
                    this.showAllStudentsGrade(1,{'testname':this.title,'testno':this.testno})
                    this.synthesisGrade = 0;
                }else{
                    this.$message({
                        type:'error',
                        message:'评分失败'
                    })
                    this.synthesisGrade = 0;
                }
            }).catch(e=>{
                this.$message({
                        type:'error',
                        message:'评分失败!'
                    })
                this.synthesisGrade = 0;
            })

        },
        back(){
            this.title='考试信息';
            this.showStudentGrade = false;
        },
        showAllStudentsGrade(index,row){
            //   this.$router.push('/forms/getStudentGrade')
            this.showStudentGrade = true;
            this.title = row.testname;
            this.testno = row.testno;
            var params = {
                classname : JSON.parse(window.localStorage.getItem('user')).classname,
                testno : row.testno
            }
            requestgetTestStudentGrade(params).then(data => {
                var data = data.data;
                console.log('这里是 成绩数据')
                console.log(data);
                //将 data.result 中学生综合题的内容提取出来
                var synthesis = null;
                var s = '';
                data.result.forEach(item=>{
                    if(typeof item.studentanswer == 'string'){
                        s = item.studentanswer;
                        synthesis = JSON.parse(s).ret.filter(item=>{
                            return item.qtype == '综合'
                        });
                        console.log(s)
                        console.log(synthesis)
                        item.synthesis1 = synthesis[0];
                        item.synthesis2 = synthesis[1];
                        item.synthesis3 = synthesis[2];
                    }else{
                        item.synthesis1 = {qcontent:'无',qanswer:'该学生未作答',trueanswer:'无'};
                        item.synthesis2 = {qcontent:'无',qanswer:'该学生未作答',trueanswer:'无'};
                        item.synthesis3 = {qcontent:'无',qanswer:'该学生未作答',trueanswer:'无'};
                    }
                    
                })
                this.gradeData = data.result;
            })

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
            this.loadding = true;
            var user = JSON.parse(window.localStorage.getItem('user')),
            tno = user.tno || user.account;
            requestExaminationInfo({tno}).then(data => {
                this.loadding = false;
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