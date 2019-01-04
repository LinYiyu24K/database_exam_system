<template>
  <div class="page">
    <h3>单选题录入</h3>
    <div style="margin:30px"></div>

    <el-form :model="singleChoice" :rules="rules" ref="singleChoice" label-position="left" label-width="80px"
               class="demo-ruleForm login-container" status-icon>

        <el-form-item prop="title" label="题目">
          <el-input type="textarea" :rows="3" placeholder="请输入题目描述" v-model="singleChoice.title"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="选项">
            <el-input placeholder="请输入内容" v-model="singleChoice.optionA" prop="optionA">
                <template slot="prepend">A</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="singleChoice.optionB" prop="optionB">
                <template slot="prepend">B</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="singleChoice.optionC" prop="optionC">
                <template slot="prepend">C</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="singleChoice.optionD" prop="optionD">
                <template slot="prepend">D</template>
            </el-input>
        </el-form-item>

        <el-form-item prop="answer" label="答案" >
            <el-radio-group v-model="singleChoice.answer">
                <el-radio label="A"></el-radio>
                <el-radio label="B"></el-radio>
                <el-radio label="C"></el-radio>
                <el-radio label="D"></el-radio>
            </el-radio-group>
        </el-form-item>

        <el-form-item style="100%">
            <el-button type="primary" style="width:30%;" @click.native.prevent="handleSubmit" :loading="submiting">
                添加
            </el-button>
        </el-form-item>
      
      </el-form>
  </div>
</template>

<script>

import {requestaddQuestion} from '@/api/user'

export default {
  name: 'SingleChoice',
  data(){
    return{
      submiting:false,
      singleChoice: {
        title: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        answer: ''
      },
      rules: {
        title: [
            {required: true, message: '请输入题目描述', trigger: 'blur'}
        ],
        optionA: [
            {required: true, message: '请输入选项描述', trigger: 'blur'}
        ],
        optionB: [
            {required: true, message: '请输入选项描述', trigger: 'blur'}
        ],
        optionC: [
            {required: true, message: '请输入选项描述', trigger: 'blur'}
        ],
        optionD: [
            {required: true, message: '请输入选项描述', trigger: 'blur'}
        ],
        answer: [
            {required: true, message: '请选择题目答案', trigger: 'change'}
        ]
      }
    }
  },
  methods:{
      handleSubmit(){
          this.submiting = true;
          var params = Object.assign(this.singleChoice,{
                qtype:'单选',
                qvalue:3
          })
          console.log("_____-添加的题目：_________-")
          console.log(params)
          requestaddQuestion(params).then(data=>{
              this.submiting = false;
              var data = data.data;
              console.log("添加题目成功");
              console.log(data);
              if(data.success){
                  this.$message({
                    type: 'success',
                    message: '添加成功!'
                  });
              }else{
                  this.$message({
                    type: 'error',
                    message: '添加失败!'
                  });
              }
          })
      }
  },
  created() {
    //TODO:
  }
}
</script>

<style scoped>
h3{
  width:100%;
  line-height:30px;
}
.page{
    padding:0 20px 0 20px;
}
</style>