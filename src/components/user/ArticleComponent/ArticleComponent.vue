<template>
  <div class="ArticleComponent">

    <el-input maxlength="30" minlength="1" v-model="formData.title" placeholder="请输入标题,三十字内" style="border: none">
    </el-input>
    <hr>
    <el-input rows="10" maxlength="1000" size="medium" type="textarea" v-model="formData.content[0].value" placeholder="输入文本内容">

    </el-input>
    <hr>
    标签:
    <el-input style="width: 200px" v-model="formData.labels" placeholder="请输入标签"></el-input>

    频道：
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
    定时:
    <el-date-picker v-model="formData.publishTime" type="datetime" placeholder="年/月/日"></el-date-picker>
    <br>
    <br>
    封面:
    <el-radio-group v-model="formData.type">
      <el-radio :label=1>单图</el-radio>
      <el-radio :label=3>三图</el-radio>
      <el-radio :label=0>自动</el-radio>
    </el-radio-group>
    <br>
    <br>

    <el-upload
        :on-error="error_after"
        :on-change="change_after"
        :on-success="successAfter"
        ref="upload"
        :auto-upload="false"
        multiple=true
        list-type="picture-card"
        accept="jpg,jpeg,png"
        class="upload-demo"
        action="http://localhost:6002/api/material/v1/uploadImages"
        :headers="customHeader"
        :limit=formData.type
    >
      <i class="el-icon-picture-outline"></i>
      <div class="el-upload__tip" slot="tip">只能上传jpg/png文件,大小不能超过10MB</div>
    </el-upload>
    <hr>

    <el-button type="info" icon="el-icon-files" @click="changeStatus">
      存入草稿
    </el-button>
    <el-button type="primary" icon="el-icon-upload" @click="submitUpload">提交审核</el-button>


    <el-dialog
        :close-on-press-escape="false"
        :show-close="false"
        :close-on-click-modal="false"
        :visible.sync="dialogVisible"
        width="50%"
    style="text-align: center">
      <span>
        <i class="el-icon-loading"></i>
        <br>
        正在上传,请等待...
      </span>
    </el-dialog>


  </div>
</template>

<script src="./_ArticleComponent.js" lang="js"></script>
<style src="./_ArticleComponent.css" lang="css" scoped></style>
