<template>
  <div class="LoginComponent">
    <el-form :rules="rules" ref="loginForm" :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">
        欢迎登录
      </h3>
      <el-form-item prop="name">
        <el-input type="text" v-model="loginForm.name" placeholder="亲，请输入用户名">
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="loginForm.password" placeholder="亲，请输入密码">
        </el-input>
      </el-form-item>
      <!--      <el-form-item prop="code">-->
      <!--        <el-input type="text" auto-complete="false" v-model="loginForm.code" placeholder="点击图片更换验证码" style="width: 250px;margin-right: 5px">-->
      <!--        </el-input>-->
      <!--        <img :src="captchaUrl">-->

      <!--      </el-form-item>-->
      <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>

      <el-button type="primary" style="width:100%" @click="submitLogin">登录</el-button>
    </el-form>
  </div>
</template>


<style lang="css" scoped>
.loginContainer {
  border-radius: 15px;
  background-clip: padding-box;
  text-align: left;
  margin: auto;
  margin-top: 280px;
  margin-bottom: 280px;
  width: 350px;
  padding: 15px 35px 15px 35px;
  background: aliceblue;
  border: 1px solid blueviolet;
  box-shadow: 0 0 25px #f885ff;
}

.loginTitle {
  margin: 0px auto 48px auto;
  text-align: center;
  font-size: 40px;
}

.loginRemember {
  text-align: left;
  margin: 0px 0px 15px 0px;
}

.LoginComponent {
  width: 100%;
  height: 100%;
  background-image: url("../../assets/background.png");
  background-size: 100%;
  overflow: auto;
}
</style>

<script>
import axios from "axios"

export default {
  name: "LoginComponent",
  data() {
    return {
      captchaUrl: "",
      loginForm: {
        name: "",
        password: ""
      },
      checked: true,
      rules: {
        name: [{required: true, message: "请输入用户名", trigger: "blur"}, {
          min: 5,
          max: 14,
          message: '长度在 5 到 14 个字符',
          trigger: 'blur',
        }],
        password: [{required: true, message: "请输入密码", trigger: "blur"}, {min: 5, message: '密码长度要大于5', trigger: 'blur'}],
      },
      token: localStorage.getItem('token')
    }
  },
  methods: {
    submitLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          axios.post("http://localhost:6001/api/v1/login/in", this.loginForm).then(
              r => {
                if (r.data.code === 200) {
                  localStorage.setItem('token', r.data.data.token)
                  localStorage.setItem('adUser', JSON.stringify(r.data.data.adUser))
                  this.$message({
                    message: '欢迎登录',
                    type: 'success'
                  });
                  this.$router.push('/main')
                } else {
                  this.$message({
                    message: r.data.errorMessage,
                    type: 'error'
                  });
                }
              }
          )
        } else {
          this.$message.error('登录信息有误,请重新输入');
          return false;
        }
      });
    },
    init() {
      if (this.token != null) {
          // this.$message({
          //   message: '欢迎登录',
          //   type: 'success'
          // });
        this.$router.push('/main')
      }
    }
  },
  created() {
    this.init()
  }
};
</script>

