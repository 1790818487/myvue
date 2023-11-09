<template>
    <div class="UserIdentity">

      <div>

        <el-upload
            class="avatar-uploader"
            action="https://www.dmeo.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess(res, file)"
            :before-upload="beforeAvatarUpload(file)">
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

      </div>

    </div>
</template>

<script src="./_UserIdentity.js" lang="js"></script>
<style src="./_UserIdentity.css" lang="css" scoped></style>
