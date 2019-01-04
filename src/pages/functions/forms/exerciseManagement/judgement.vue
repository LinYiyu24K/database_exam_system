<template>
  <div class="page">
    <h3>判断题录入</h3>
    <div style="margin:30px"></div>

    <el-form :model="judgement" :rules="rules" ref="judgement" label-position="left" label-width="80px"
               class="demo-ruleForm login-container" status-icon>

        <el-form-item prop="title" label="题目">
          <el-input type="textarea" :row="3" placeholder="请输入题目描述" v-model="judgement.title"
                    auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item prop="answer" label="答案" >
            <el-radio-group v-model="judgement.answer">
                <el-radio label="对" name="judge"></el-radio>
                <el-radio label="错" name="judge"></el-radio>
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
export default {
  name: 'Judgement',
  data(){
    return{
      submiting:false,
      judgement: {
        title: '',
        answer: '',

      },
      rules: {
        title: [
            {required: true, message: '请输入题目描述', trigger: 'blur'}
        ],
        answer: [
            {required: true, message: '请选择题目答案', trigger: 'change'}
        ]
      }
    }
  },
  methods:{
      handleSubmit(){
          console.log('1')
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