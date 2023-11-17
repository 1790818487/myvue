<template>
    <div class="UserIdentity">

      <div>

        <el-upload
            accept="jpg,jpeg,png"
            class="upload-demo"
            action="http://localhost:6001/api/v1/apUser/upload"
            :headers="customHeader"
            :limit="1"
            :on-success="successAfter(response, file, fileList)"
           >
          <i class="el-icon-plus avatar-uploader-icon"></i>
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>




      </div>

    </div>
</template>

<script src="./_UserIdentity.js" lang="js"></script>
<style src="./_UserIdentity.css" lang="css" scoped></style>
