<template>
  <div style="padding:0 5px 0 5px">
    <h3>用户列表</h3>

    <el-table :data="tableData" border style="width: 100%" max-height="550">
    <el-table-column prop="account" label="账号" sortable width="180">
    </el-table-column>
    <el-table-column prop="name" label="姓名" width="120">
    </el-table-column>
    <el-table-column prop="sex" label="性别" width="80">
    </el-table-column>
    <el-table-column prop="phone" label="电话号码" width="180">
    </el-table-column>
    <el-table-column prop="usertype" label="标签"  :filters="[{ text: '学生', value: '学生' }, { text: '教师', value: '教师' },{ text: '管理', value: '管理' }]" :filter-method="filterTag" filter-placement="bottom-end">
      
    </el-table-column>

    <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click.native.prevent="deleteRow(slot-scope.$index, tableData)"
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
export default {
  name: 'UserLists',
  data() {
      return {
        tableData: [{
          account: '201530551301',
          name: '拎着仓鼠',
          sex: '男',
          phone:'13631428955',
          usertype: '学生'
        }, {
          account: '201530541321',
          name: '王小虎',
          sex: '男',
          phone:'13845313514',
          usertype: '教师'
        }, {
          account: '201530343231',
          name: '花花',
          sex: '女',
          phone:'13842323514',
          usertype: '教师'
        }, {
          account: '201530213212',
          name: '管大卫',
          sex: '男',
          phone:'13323232335',
          usertype: '管理'
        }]
      }
    },
    methods: {
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      deleteRow(index, rows) {
        console.log(rows.account)
        rows.splice(index, 1);
      }
    }
}
</script>

<style scoped>
h3{
  width:100%;
  line-height:30px;
}
</style>