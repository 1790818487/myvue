<template>
  <div class="UserMaterial">

    <el-upload
        multiple="true"
        list-type="picture-card"
        accept="jpg,jpeg,png"
        class="upload-demo"
        action="http://localhost:6002/api/material/v1/uploadImages"
        :headers="customHeader"
        :limit="10"
    >
      <i class="el-icon-plus avatar-uploader-icon"></i>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png/jpeg文件,大小再10mb以内,一次最多上传10张</div>
    </el-upload>

    <div v-for="data in dataList" class="img_container">
      <img :src="data.url" :alt="data.url" class="fluid-image">
    </div>


    <div style="text-align: center;clear: both" >
      <a href="javaScript:void(0);" @click="pageinfo(formData.page+1)">加载更多...</a>
      <hr>
<!--      <el-pagination-->
<!--          :current-page="pageInfo.current"-->
<!--          :page-size="pageInfo.size"-->
<!--          :page-sizes=" [3,5,7]"-->
<!--          :total="pageInfo.total"-->
<!--          small="true"-->
<!--          background-->
<!--          layout="sizes, prev, pager, next, jumper, ->, total, slot"-->
<!--          @size-change="pagesizeinfo"-->
<!--          @current-change="pageinfo"-->
<!--          @prev-click="pageinfo"-->
<!--          @next-click="pageinfo">-->
<!--      </el-pagination>-->
    </div>

  </div>
</template>

<script src="./_UserMaterial.js" lang="js"></script>
<style src="./_UserMaterial.css" lang="css" scoped></style>
