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
          @click.native.prevent="showDialog(scope.$index, tableData)"
          type="text"
          size="small">
          发布
        </el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-dialog title="考试信息" :visible.sync="dialogFormVisible">
  <el-form :model="form">
    <el-form-item label="考试名称" :label-width="formLabelWidth">
      <el-input v-model="form.testname" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="考试时间" :label-width="formLabelWidth">
      <el-date-picker
        v-model="form.datetimeRange"
        type="datetimerange"
        range-separator="至"
        start-placeholder="考试开始时间"
        end-placeholder="考试结束时间">
      </el-date-picker>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handlePublish" v-loading = "publishing">发 布</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import {requestGetTestpaperLists,requestaddTest} from '@/api/user'
export default {
  name: 'PublishTest',
  data() {
      return {
        loading:true,
        publishing:false,
        tableData: [],
        dialogFormVisible: false,
        form: {
          testname: '',
          datetimeRange: [],
          date1: '',
          date2: ''
        },
        formLabelWidth: '120px',
        //直接增加属性，Vue不能响应，仅用于存储发送的数据
        result:{}
      }
    },
    methods: {
      showDialog(index, rows) {
        this.dialogFormVisible = true;
        this.result.testpaperno = rows[index].testpaperno;
      },
      handlePublish(){
        this.publishing = true;
        this.result.testname = this.form.testname;
        var nowTime = +new Date(),
            starTime = this.form.datetimeRange[0].getTime();
        //如果考试开始时间早于当前时间，则返回
        if(nowTime>startTime){
          this.$message({
            type: 'error',
            message: "时间选择错误"
          });
          this.publishing = false;
          return 
        }else{
          this.result.start_time_of_test = this.form.datetimeRange[0].getTime();
          this.result.end_time_of_test = this.form.datetimeRange[1].getTime();
          requestaddTest(this.result).then(data=>{
            
          })
        }
        console.log(this.form.timeRange);
        this.publishing = false;
        this.dialogFormVisible = false;
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