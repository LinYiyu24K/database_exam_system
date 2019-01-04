<template>
<div >
  <el-carousel :interval="3000" arrow="always" height="450px" >
    <el-carousel-item >
      <img src="../../../assets/img/a111.jpg" alt="图片" style="height:450px;winth:100%;overflow:hidden"/>
    </el-carousel-item>
    <el-carousel-item>
      <img src="../../../assets/img/a222.jpg" alt="图片" style="height:450px;winth:100%;overflow:hidden"/>
    </el-carousel-item>
    <el-carousel-item>
      <img src="../../../assets/img/a111.jpg" alt="图片" style="height:450px;winth:100%;overflow:hidden"/>
    </el-carousel-item>
    <el-carousel-item>
      <img src="../../../assets/img/a222.jpg" alt="图片" style="height:450px;winth:100%;overflow:hidden"/>
    </el-carousel-item>
  </el-carousel>

  <el-collapse v-model="activeNames"  style="margin-top:10px">
  <el-collapse-item title="完整性约束" name="1">
    <div>系模型中有三类完整性约束 ： 实体完整性、参照完整性、用户自定义的完整性；</div>
    <div>其中实体完整性和参照完整性是关系模型必须满足的完整性约束条件，被称作关系的两个不变性。</div>
  </el-collapse-item>
  <el-collapse-item title="实体完整性" name="2">
    <div>若属性（指一个或者一组属性）A是基本关系R的主属性，则A不能取空值（null value）；</div>
    <div>所谓空值是指“不知道”、“不存在”或者“无意义”的值。</div>
  </el-collapse-item>
  <el-collapse-item title="参照完整性定义" name="3">
    <div>设F是基本关系R的一个或者一组属性，但不是关系R的码，K是基本关系S的主码；</div>
    <div>如果F和K相对应，则称F是R的外码 (foreign key) ，并称基本关系R为参照关系 （referencing relation），基本关系S为被参照关系（referenced relation）或者目标关系 (target relation)。</div>
  </el-collapse-item>
  <el-collapse-item title="参照完整性规则" name="4">
    <div>若属性 F 是基本关系 R 的外码，它与基本关系 S 的主码 K相对应（基本关系 R 和 S 不一定是不同的关系），则对于 R 中的每个元组在 F 上的值必须:</div>
    <div>  * 或者取空值（F 的每个属性值均为空值）</div>
    <div>  * 或者等于 S 中某个元组的主码值</div>
  </el-collapse-item>
</el-collapse>
</div>
   
</template>

<script>
export default {
  name: 'FuncHome',
  data(){
    return {
      imgs:['../../../assets/img/a111.jpg','../../../assets/img/a222.jpg','../../../assets/img/a111.jpg','../../../assets/img/a222.jpg'],
      activeNames:['1']
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>