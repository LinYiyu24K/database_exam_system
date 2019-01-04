<template>
  <div class="page">
    <h3>多选题录入</h3>
    <div style="margin:30px"></div>

    <el-form :model="multipleChoice" :rules="rules" ref="multipleChoice" label-position="left" label-width="80px"
               class="demo-ruleForm login-container" status-icon>

        <el-form-item prop="title" label="题目">
          <el-input type="textarea" :row="3" placeholder="请输入题目描述" v-model="multipleChoice.title"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="选项">
            <el-input placeholder="请输入内容" v-model="multipleChoice.optionA" prop="optionA">
                <template slot="prepend">A</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="multipleChoice.optionB" prop="optionB">
                <template slot="prepend">B</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="multipleChoice.optionC" prop="optionC">
                <template slot="prepend">C</template>
            </el-input>
            <el-input placeholder="请输入内容" v-model="multipleChoice.optionD" prop="optionD">
                <template slot="prepend">D</template>
            </el-input>
        </el-form-item>

        <el-form-item prop="answer" label="答案" >
            <el-checkbox-group v-model="multipleChoice.answer">
                <el-checkbox label="A" name="mulAnswer"></el-checkbox>
                <el-checkbox label="B" name="mulAnswer"></el-checkbox>
                <el-checkbox label="C" name="mulAnswer"></el-checkbox>
                <el-checkbox label="D" name="mulAnswer"></el-checkbox>
            </el-checkbox-group>
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
  name: 'MultipleChoice',
  data(){
    return{
      submiting:false,
      multipleChoice: {
        title: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        answer: [],
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
            {type: 'array', required: true, message: '请至少选择两个题目答案', trigger: 'change'}
        ]
      }
    }
  },
  methods:{
      handleSubmit(){
          this.submiting = true;
          var params = Object.assign(this.multipleChoice,{
                qtype:'多选',
                qvalue:5,
                answer:JSON.stringify(this.multipleChoice.answer)
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