<template>
  <div>
    <!--模糊查询-->
    <el-form :inline="true" ref="channelForm" :model="channelForm" class="demo-form-inline">
      <el-form-item label="搜索名称">
        <el-input v-model="pagination.name" placeholder="请输入标签名称"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="init">搜索</el-button>
      </el-form-item>

      <!--按钮-->
      <el-button @click="kaiguan" type="primary">
        <i class="el-icon-circle-plus-outline"></i>
        新增
      </el-button>
    </el-form>

    <!--    添加弹窗  star-->


    <el-dialog title="添加频道表单" :visible.sync='dialogFormVisible' width="25%">


      <el-form ref="form" :model="channelForm">

        <table style="text-align: left;width: 100%">
          <tr>
            <td>频道名称</td>
            <td>
              <el-form-item prop="name">
                <el-input v-model="channelForm.name"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>频道描述</td>
            <td>
              <el-form-item prop="description">
                <el-input v-model="channelForm.description"></el-input>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>默认频道</td>
            <td>
              <el-form-item>
                <el-radio-group v-model="channelForm.isDefault">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>是否有效</td>
            <td>
              <el-form-item>
                <el-radio-group v-model="channelForm.status">
                  <el-radio :label="true">是</el-radio>
                  <el-radio :label="false">否</el-radio>
                </el-radio-group>
              </el-form-item>
            </td>
          </tr>

          <tr>
            <td>排序</td>
            <td>
              <el-input-number v-model="channelForm.ord" @change="handleChange" :min="1" :max="100" prop="ord">
              </el-input-number>
            </td>
          </tr>

          <tr>
            <td colspan="2" style="text-align: right">
              <el-form-item>
                <el-button @click="resetForm()">取 消</el-button>
                <el-button type="primary" @click="addChannel">操作</el-button>
              </el-form-item>
            </td>
          </tr>
        </table>


      </el-form>
    </el-dialog>
    <!--    添加弹窗 end-->

    <!--表格-->
    <el-table
        ref="filterTable"
        :data="channelList"
    >


      <el-table-column
          prop="name"
          label="频道名称">
      </el-table-column>

      <el-table-column
          prop="description"
          label="频道描述"
      >
      </el-table-column>


      <el-table-column
          label="是否默认频道">
        <template v-slot="scope">
          <el-tag
              :type="scope.row.isDefault?'success':'warning'"
          >
            {{ scope.row.isDefault ? '是' : '否' }}
          </el-tag>

        </template>
      </el-table-column>

      <el-table-column
          prop="status"
          label="是否有效">
        <template v-slot="scope">
          <el-tag
              :type="scope.row.status?'success':'warning'"
          >
            {{ scope.row.status ? '是' : '否' }}

          </el-tag>
        </template>
      </el-table-column>


      <el-table-column
          prop="ord"
          label="排序"
      >
      </el-table-column>

      <el-table-column
          prop="createdTime"
          label="创建时间"
      >
      </el-table-column>


      <el-table-column
          label="操作"
          width="250">

        <template v-slot="scope">
          <el-button
              type="primary"
              @click="toTeacherEditView(scope.row.id)"
              size="small">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页-->
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.page"
        :page-sizes="[5,8,10]"
        :page-size="pagination.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
    </el-pagination>

  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "ChannelList",
  data() {
    return {
      dialogFormVisible: false,
      channelForm: {
        description: '',
        isDefault: 0,
        status: 0,
        ord: 0

      },//添加表单
      channelList: [],

      pagination: {
        name: '',
        page: 1,
        size: 5,
      },
      total: 0,
      token: localStorage.getItem('token')
    }
  },
  methods: {

    handleSizeChange(size) {
      this.pagination.size = size
      this.init()

    },

    handleCurrentChange(page) {
      this.pagination.page = page
      this.init()
    },
    //排序
    handleChange(value) {
      console.log(value);
    },

    init() {
      if (this.token == null)
        this.$router.push('/login')
      axios.post("http://localhost:6001/api/v1/adChannel", this.pagination,
          {headers: {'token': localStorage.getItem('token')}}).then(r => {
        if (r.data.code !== 200) {
          this.$message({
            message: r.data.errorMessage + ',请重新登录',
            type: 'warning'
          });
          localStorage.removeItem('token')
          localStorage.removeItem('adUser')
          this.$router.push('/login')
        }
        if (r.headers.has('REF_TOKEN'))
          localStorage.setItem('token',r.headers.REF_TOKEN)
        this.channelList = r.data.data
        this.total = r.data.total
      })

    },
    kaiguan() {
      this.dialogFormVisible = true
    },
    //新增频道
    addChannel() {
      axios.post("http://localhost:6001/api/v1/adChannel/saveNewChannel",
          this.channelForm, {headers: {'token': localStorage.getItem('token')}}).then(r => {
        if (r.data.code === 200) {
          this.$message.success("添加成功！")
          this.dialogFormVisible = false;
          this.$refs['channelForm'].resetFields()
          if (r.headers.has('REF_TOKEN'))
            localStorage.setItem('token', r.headers.get('REF_TOKEN'))
          this.init()
        } else {
          this.$message.error("添加失败！")
        }
      })
    },
  },
  created() {
    this.init()
  },
}
</script>
