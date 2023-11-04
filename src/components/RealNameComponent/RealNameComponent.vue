<template>
  <div class="RealNameComponent">

    <div style="height: 100px">
      <el-button type="primary">全部信息</el-button>
      <el-button type="primary">待审核</el-button>
      <el-button type="primary">审核失败</el-button>
      <el-button type="primary">审核成功</el-button>
    </div>
    <div>
      <el-table
          :data="dataList"
          border="true"
          stripe="true"
      >
        <el-table-column
            prop="userId"
            width="200px"
            label="账号"
        >
        </el-table-column>
        <el-table-column
            width="200px"

            prop="name"
            label="用户名称"
        >
        </el-table-column>
        <el-table-column
            width="200px"

            prop="idno"
            label="资源名称">
        </el-table-column>
        <el-table-column
            prop="fontImage"
            width="200px"

            label="正面照片">
        </el-table-column>
        <el-table-column
            prop="backImage"
            width="200px"

            label="背面照片">
        </el-table-column>
        <el-table-column
            prop="holdImage"
            width="200px"

            label="手持照片">
        </el-table-column>

        <el-table-column
            width="200px"
            label="状态">
          <template v-slot="s">
            <el-tag :type="s.row.status===0?'info':s.row.status===1?'primary':s.row.status===2?'danger':'success'">
              {{ s.row.status === 0 ? '创建中' : s.row.status === 1 ? '待审核' : s.row.status === 2 ? '审核失败' : '审核通过' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column
            prop="reason"
            width="200px"
            label="失败原因">
        </el-table-column>

        <el-table-column
            prop="createdTime"
            width="200px"

            label="创建时间">
        </el-table-column>

        <el-table-column
            prop="createdTime"
            width="200px"

            label="提交时间">
        </el-table-column>

        <el-table-column
            prop="createdTime"
            width="200px"

            label="更新时间">
        </el-table-column>

        <el-table-column
            fixed="right"
            width="100px"

            label="功能操作">
          <template v-slot="scope">
            <el-button type="primary" :disabled="scope.row.status===9||scope.row.status===0">
              通过</el-button>
          </template>
        </el-table-column>

      </el-table>

      <el-pagination
          :current-page="pageInfo.current"
          :page-size="pageInfo.size"
          :page-sizes=" [3,5,7]"
          :total="pageInfo.total"
          small="true"
          background
          layout="sizes, prev, pager, next, jumper, ->, total, slot"
          @size-change="pagesizeinfo"
          @current-change="pageinfo"
          @prev-click="pageinfo"
          @next-click="pageinfo">
      </el-pagination>

    </div>
  </div>
</template>

<script src="./_RealNameComponent.js" lang="js"></script>
<style src="./_RealNameComponent.css" lang="css" scoped></style>
