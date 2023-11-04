<template>
  <div class="MainComponent">
    <el-container style="height: 900px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router=true :default-openeds="['1']">

          <el-submenu index="1">
            <template v-slot:title><i class="el-icon-message">管理员账户</i></template>
            <el-menu-item-group>
              <template v-slot:title>分组</template>
              <el-menu-item index="1-1" route="/main/channel">频道管理</el-menu-item>
              <el-menu-item index="1-2" route="/main/sensitive">敏感词管理</el-menu-item>
              <el-menu-item index="1-3" route="/main/realname">实名管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">

          <div style="width: 100%;height: 10%">
            <el-row type="flex" :gutter="10">
              <el-col :span="20"></el-col>
              <el-col style="text-align: right"  :span="4">
                <i class="el-icon-user"></i>
                <span>欢迎,
           <span v-show="token==null">请登录</span>
           <a v-show="token!=null" href="javaScript:void(0)" @click="exit">退出登录</a>
         </span>
              </el-col>
            </el-row>
          </div>
        </el-header>
        <el-main>
          <!--  渲染后的视图-->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

  </div>
</template>

<style>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  name:'app',
  data(){
    return{
      token: localStorage.getItem('token')
    }
  },
  methods:{
    exit(){
      this.$confirm('登录将退出,退出后需要重新登录才可使用相关功能', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('adUser')
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
        this.$router.push('/')
      }).catch(() => {
      });
    }
  },
  created() {
    this.$router.push('/main/channel')
  }
}
</script>