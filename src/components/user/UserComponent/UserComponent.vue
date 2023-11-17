<template>
  <div class="MainComponent">
    <el-container style="height: 900px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router=true :default-openeds="['1']">

          <el-submenu index="1">
            <template v-slot:title><i class="el-icon-message">自媒体用户</i></template>
            <el-menu-item-group>
              <template v-slot:title>分组</template>
              <el-menu-item index="1-1" :route="myMaterial()">
                <i class="el-icon-menu"></i>
                我的素材</el-menu-item>
              <el-menu-item index="1-2" :route="myContext()">
                <i class="el-icon-view"></i>
                内容列表</el-menu-item>
              <el-menu-item index="1-3" :route="myarticle()">
                <i class="el-icon-message"></i>
                发布文章</el-menu-item>

            </el-menu-item-group>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">

          <div style="width: 100%;height: 10%">
            <el-row type="flex">
              <el-col style="text-align: right">
                <i class="el-icon-user"></i>
                <span>欢迎自媒体用户,
                  <span v-text="nickname"></span>,
           <a v-show="token!=null" href="javaScript:void(0)" @click="exit">
             退出登录</a>
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
      token: localStorage.getItem('token'),
      nickname:localStorage.getItem('nickname'),
      User:JSON.parse(localStorage.getItem('User')),
      user_url:'/user'
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
        localStorage.removeItem('User')
        localStorage.removeItem('salt')
        localStorage.removeItem('nickname')
        this.$message({
          type: 'success',
          message: '退出成功!'
        });
        this.$router.push('/')
      }).catch(() => {
      });
    },
    myContext(){
      return this.user_url+'/context/'+this.User.id
    },
    myMaterial(){
      return this.user_url+'/material/'+this.User.id
    },
    myfile(){
      return this.user_url+'/data/'+this.User.id
    },
    myarticle(){
      return this.user_url+'/article/'+this.User.id
    }
  },
  created() {
    this.$router.push(this.user_url+'/material/'+this.User.id)
  }
}
</script>