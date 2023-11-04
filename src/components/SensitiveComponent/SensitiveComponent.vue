<template>
  <div class="SensitiveComponent">
    <h1>敏感词管理</h1>
    <hr>
    <div style="height: 100px;text-align-all: center;line-height: 60px">
      <strong>搜索敏感词</strong>
      <el-input style="width: 300px" placeholder="请输入敏感词" v-model="formData.name"/>
      <el-button type="primary" @click="init"><i class="el-icon-search"></i>搜索</el-button>

    </div>
    <div style="line-height: 60px">

      <el-table
          :data="dataList">
        <el-table-column
            prop="sensitives"
            label="敏感词">
        </el-table-column>

        <el-table-column
            prop="createdTime"
            label="创建时间">
        </el-table-column>

        <el-table-column
            label="操作">
          <template v-slot="scope">
            <el-button type="primary" @click="delById(scope.row.id)">删除</el-button>
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
      <!--添加敏感词的位置-->
      <div style="line-height: 60px">
        关键字新增：<el-input v-model="name" placeholder="添加敏感词关键字" style="width: 300px"></el-input>
        <el-button type="primary" @click="addSensitive"><i class="el-icon-circle-plus-outline"></i>新增</el-button>
      </div>

    </div>
  </div>
</template>

<script src="./_SensitiveComponent.js" lang="js"></script>
<style src="./_SensitiveComponent.css" lang="css" scoped></style>
