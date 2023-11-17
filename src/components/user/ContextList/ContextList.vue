<template>
  <div class="ContextList">

    <div>
      文章状态：
      <el-radio-group v-model="formData.status">
        <el-radio :label=-1>全部</el-radio>
        <el-radio :label=0>草稿</el-radio>
        <el-radio :label=1>待审核</el-radio>
        <el-radio :label=9>审核通过</el-radio>
        <el-radio :label=2>审核失败</el-radio>
      </el-radio-group>
    </div>
    <br>
    <div>
      关键字：
      <el-input v-model="formData.keyword" placeholder="请输入关键字"></el-input>
      频道列表：
      <el-select
          clearable="true"
          v-model="formData.channelId"
          placeholder="请选择">
        <el-option
            v-for="item in optionsList"
            :key="item.id"
            :label="item.name"
            :value="item.id">
        </el-option>
      </el-select>
      发布日期：
      <el-date-picker
          v-model="date_picker"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="changeDate"
          value-format="yyyy-MM-dd">
      </el-date-picker>
      <el-button type="primary" @click="like_query">查询</el-button>


    </div>

    <br>
    <hr color="gray">

    <div>
      <div class="image_container" v-for="data in dataList">
        <img :src="data.images.split(',')[0]" :alt="图片丢失"/>

        <el-button @click="delMaterialById(data.id)" plain="true" size="mini" type="primary" style="position: relative;top: 0;right: -70px">
          <i class="el-icon-delete"></i>
        </el-button>

        <div class="text" style="text-align: center;margin: auto">
          <span v-text="data.title"></span>
        </div>

        <div class="description">
          <span v-text="data.createdTime"></span>

          <el-tag :type="data.status===0?'info':
          data.status===1?'primary':data.status===2?'error':data.status===3?'warning':'success'">
            {{
              data.status === 0 ? '草稿' :
                  data.status === 1 ? '待审核' : data.status === 2 ? '审核失败' :data.status===3?'人工审核':
                      data.status===4||data.status===8?'通过(待发布)':'已发布'
            }}
          </el-tag>
        </div>
      </div>
<div style="clear: both"></div>

    </div>

    <div>
      <hr>
      <div>
        <el-pagination
            :current-page="pageInfo.page"
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
  </div>
</template>

<script src="./_ContextList.js" lang="js"></script>
<style src="./_ContextList.css" lang="css" scoped></style>
