<template>
  <div class="UserMaterial">

    <el-upload
        multiple="true"
        list-type="picture-card"
        accept="jpg,jpeg,png"
        class="upload-demo"
        action="http://localhost:6001/api/v1/apUser/upload"
        :headers="customHeader"
        :limit="10"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件,一次最多上传10张</div>
    </el-upload>

    <div v-for="data in dataList" style="height: 150px">
      <img :src="data.url" style="height: 130px" :alt="data.url" class="image">
    </div>

  </div>
</template>

<script src="./_UserMaterial.js" lang="js"></script>
<style src="./_UserMaterial.css" lang="css" scoped></style>
