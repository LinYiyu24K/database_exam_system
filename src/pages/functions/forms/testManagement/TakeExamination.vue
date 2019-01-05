<template>
  <el-row class="page">
    <el-col :span="24">
      <the-header></the-header>
    </el-col>
    <!-- <div style="padding:0 20% 0 20%;overflow:hidden"> -->
    <el-col :span="24">
        <el-container>
        <el-main>
            <article>
                <h2 style="color:skyblue">{{test.testname}}</h2>
                <el-form :model="testChoice"  ref="testChoice" status-icon>
                <h3>一、单选题</h3>
                <template v-for="item in this.singleQuestions">
                    <el-form-item>
                    <el-input type="textarea" :rows="3" v-model="item.qcontent"
                                auto-complete="off" disabled></el-input>
                    </el-form-item>

                    <el-form-item >
                        <el-input v-model="item.qoption1" prop="optionA" disabled>
                            <template slot="prepend">A</template>
                        </el-input>
                        <el-input v-model="item.qoption2" prop="optionB" disabled>
                            <template slot="prepend">B</template>
                        </el-input>
                        <el-input v-model="item.qoption3" prop="optionC" disabled>
                            <template slot="prepend">C</template>
                        </el-input>
                        <el-input v-model="item.qoption4" prop="optionD" disabled>
                            <template slot="prepend">D</template>
                        </el-input>
                    </el-form-item>

                    <el-form-item >
                        <el-radio-group v-model="item.qanswer">
                            <el-radio label="A"></el-radio>
                            <el-radio label="B"></el-radio>
                            <el-radio label="C"></el-radio>
                            <el-radio label="D"></el-radio>
                        </el-radio-group>
                    </el-form-item>
                </template>
                <h3>二、判断题</h3>
                <template v-for="item in this.judgeQuestions">
                    <el-form-item >
                        <el-input type="textarea" :rows="3" placeholder="请输入题目描述" v-model="item.qcontent"
                                    auto-complete="off" disabled></el-input>
                        </el-form-item>

                        <el-form-item >
                            <el-radio-group v-model="item.qanswer">
                                <el-radio label="对" name="judge"></el-radio>
                                <el-radio label="错" name="judge"></el-radio>
                            </el-radio-group>
                        </el-form-item>
                </template>
                <h3>三、多选题</h3>
                <template v-for="item in this.multipleQuestions">
                    <el-form-item >
                        <el-input type="textarea" :rows="3" v-model="item.qcontent"
                                    auto-complete="off" disabled></el-input>
                        </el-form-item>

                        <el-form-item>
                            <el-input  v-model="item.qoption1" prop="optionA">
                                <template slot="prepend">A</template>
                            </el-input>
                            <el-input v-model="item.qoption2" prop="optionB">
                                <template slot="prepend">B</template>
                            </el-input>
                            <el-input v-model="item.qoption3" prop="optionC">
                                <template slot="prepend">C</template>
                            </el-input>
                            <el-input v-model="item.qoption4" prop="optionD">
                                <template slot="prepend">D</template>
                            </el-input>
                        </el-form-item>

                        <el-form-item prop="answer">
                            <el-checkbox-group v-model="item.qanswer">
                                <el-checkbox label="A" name="mulAnswer"></el-checkbox>
                                <el-checkbox label="B" name="mulAnswer"></el-checkbox>
                                <el-checkbox label="C" name="mulAnswer"></el-checkbox>
                                <el-checkbox label="D" name="mulAnswer"></el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                </template>
                <h3>四、综合题</h3>
                <template v-for="item in this.synthesisQuestions">
                    <el-form-item >
                    <el-input type="textarea" :rows="3"  v-model="item.qcontent"
                                auto-complete="off" disabled></el-input>
                    </el-form-item>

                    <el-form-item  >
                        <el-input type="textarea" :rows="10"  v-model="item.qanswer"
                                auto-complete="off"></el-input>
                    </el-form-item>
                </template>
                <el-form-item >
                    <el-button type="primary" style="width:30%;" @click.native.prevent="handleSubmit" :loading="submiting">
                        提交
                    </el-button>
                </el-form-item>
                
                </el-form>
            </article>
        </el-main>
        <el-footer>Vue + ElementUI + express + mysql = 在线考试系统</el-footer>
        </el-container>
    </el-col>
    <!-- </div> -->
    
  </el-row>
</template>

<script>
import TheLayoutHeader from '../../../layout/TheLayoutHeader'
import {requestgetTestpaperQuestions,requestCommitTest} from '@/api/user'

export default {
  name: 'TakeExamination',
  data () {
      var user = JSON.parse(window.localStorage['user']);
    return {
        submiting:false,
        //存储了这次考试的信息
      test:{},
      //存储了所有题目的信息
      testpaperAllQuestions:[],
      //副本，包含了 qanswer
      trueQuestionAnswer:[],
      //单选题
      singleQuestions:[],
      //判断题
      judgeQuestions:[],
      //多选题
      multipleQuestions:[],
      //综合题
      synthesisQuestions:[],
      testChoice:{}
    }
  },
  methods: {
    handleSubmit(){
        this.$confirm('提交完将无法再次作答，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            var obj = {"trueAnswer":{},"studentAnswer":{}};
            var studentAnswer = this.singleQuestions.concat(this.judgeQuestions,this.multipleQuestions,this.synthesisQuestions);
            obj.trueAnswer = this.trueQuestionAnswer;
            obj.studentAnswer = studentAnswer;
            var user = JSON.parse(window.localStorage['user']),
                sno = user.sno || user.account;
            var testno = this.test.testno;
            var grade = 0;
            studentAnswer.forEach(item=>{
                this.trueQuestionAnswer.forEach(q=>{
                    if(item.qno == q.qno){
                        if(item.qanswer == q.qanswer){
                            grade = grade+q.qvalue;
                            console.log("grade加分了："+grade)
                        }
                    }
                })
            })
            console.log(grade)
            console.log(studentAnswer)
            console.log("++++++++++++++++++++=")
            console.log(this.trueQuestionAnswer)
            var ret = {sno,grade,testno,studentanswer:JSON.stringify(obj)};
            requestCommitTest(ret).then(data=>{
              console.log(data)
              var data = data.data;
              if(data.success){
                this.$message({
                  type: 'success',
                  message: '提交成功!'
                });
                this.$router.push('/login');
              }else{
                this.$message({
                  type: 'error',
                  message: '提交失败!'
                });
              }
          }).catch(e=>{
              this.$message({
                type: 'error',
                message: '提交'
              });  
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          });          
        });
    },
    getTestpaperQuestions(testpaperno){
        requestgetTestpaperQuestions({'testpaperno':testpaperno}).then(data=>{
            var data = data.data;
            console.log("______获取试卷所有试题成功_______");
            console.log(data.result);
            if(data.success){
                this.testpaperAllQuestions = data.result;
                //深拷贝
                this.trueQuestionAnswer = this.deepCopy(data.result);
                console.log("truetruetrue???????")
                console.log(this.trueQuestionAnswer)
                this.testpaperAllQuestions.forEach(item=>{
                    item.qanswer = '';
                })
                this.singleQuestions = this.testpaperAllQuestions.filter(item=>{
                    return item.qtype == '单选'
                })
                this.judgeQuestions = this.testpaperAllQuestions.filter(item=>{
                    return item.qtype == '判断'
                })
                console.log(this.judgeQuestions)
                this.multipleQuestions = this.testpaperAllQuestions.filter(item=>{
                    return item.qtype == '多选'
                })
                this.multipleQuestions.forEach(item=>{
                    item.qanswer = []
                })
                this.synthesisQuestions = this.testpaperAllQuestions.filter(item=>{
                    return item.qtype == '综合'
                })
            }else{
                console.log("获取试卷所有试题失败")
            }
        })
    },
    deepCopy(o) {
        if (o instanceof Array) {
            var n = [];
            for (var i = 0; i < o.length; ++i) {
                n[i] = this.deepCopy(o[i]);
            }
            return n;
        } else if (o instanceof Function) {
            var n = new Function("return " + o.toString())();
            return n
        } else if (o instanceof Object) {
            var n = {}
            for (var i in o) {
                n[i] = this.deepCopy(o[i]);
            }
            return n;
        } else {
            return o;
        }
    }
  },
  components: {
    'the-header': TheLayoutHeader,
  },
  created(){
      var url = window.location.href;
      console.log("_______url_______")
      var row = JSON.parse(decodeURIComponent(url.split("?")[1].split("=")[1]));
      console.log(row)
      this.test = row;
      this.getTestpaperQuestions(row.testpaperno);
      
  }
}
</script>

<style scoped lang="scss">
.el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
    article{
        background:white;
        min-height:500px;
        height:auto;
        width:70%;
        margin:0 auto;

        h2{
            margin-bottom:15px;
        }
        h3{
            float:left;
        }
    }
  }
  
</style>