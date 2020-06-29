<template>
  <div>
    <!-- 页首二号 -->
    <HeaderTwo />

    <!-- 注册&登录 -->
    <div id="lg">
      <main>
        <div class="tabs-wrap">
          <!-- 登录 -->
          <el-tabs v-model="activeName">
            <el-tab-pane label="登录" name="login">
              <el-form :model="lForm" status-icon :rules="rules" ref="lForm" class="demo-form">
                <el-form-item prop="account">
                  <el-input
                    type="text"
                    v-model="lForm.account"
                    autocomplete="off"
                    placeholder="用户名/邮箱/手机号"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="lPassword">
                  <el-input
                    type="password"
                    v-model="lForm.lPassword"
                    autocomplete="off"
                    placeholder="密码"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="login('lForm')"
                    :disabled="!canLogin"
                    v-loading="lloading"
                  >登录</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <!-- 注册 -->
            <el-tab-pane label="注册" name="register">
              <el-form :model="rForm" status-icon :rules="rules" ref="rForm" class="demo-form">
                <el-form-item prop="username">
                  <el-input
                    type="text"
                    v-model="rForm.username"
                    autocomplete="off"
                    placeholder="用户名（4-16位，允许大小写字母、数字、下划线）"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="email">
                  <el-input type="text" v-model="rForm.email" autocomplete="off" placeholder="邮箱"></el-input>
                </el-form-item>
                <el-form-item prop="mobile">
                  <el-input type="text" v-model="rForm.mobile" autocomplete="off" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item prop="rPassword">
                  <el-input
                    type="password"
                    v-model="rForm.rPassword"
                    autocomplete="off"
                    placeholder="密码（6-18位，允许大小写字母、数字、下划线）"
                  ></el-input>
                </el-form-item>
                <el-form-item prop="checkRPassword">
                  <el-input
                    type="password"
                    v-model="rForm.checkRPassword"
                    autocomplete="off"
                    placeholder="确认密码"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button
                    type="primary"
                    @click="register('rForm')"
                    :disabled="!canRegister"
                    v-loading="rloading"
                  >注册</el-button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import HeaderTwo from "@/components/HeaderTwo";
import axios from "axios";

export default {
  components: {
    HeaderTwo
  },
  name: "lg",
  data() {
    const validateAccount = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入账号"));
      } else {
        callback();
      }
    };
    const validateLPassword = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validateUsername = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (!/^[\w]{4,16}$/.test(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        const { data } = await axios.post("/freshsale/registry", {
          username: value
        });
        if (data) {
          callback(new Error("用户名已存在，请重新输入"));
        } else {
          callback();
        }
      }
    };
    const validateEmail = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (
        !/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(value)
      ) {
        callback(new Error("请输入正确的邮箱"));
      } else {
        const { data } = await axios.post("/freshsale/registry", {
          email: value
        });
        if (data) {
          callback(new Error("邮箱已存在，请重新输入"));
        } else {
          callback();
        }
      }
    };
    const validateMobile = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入手机号"));
      } else if (!/^1[3456789]\d{9}$/.test(value)) {
        callback(new Error("请输入正确的手机号"));
      } else {
        const { data } = await axios.post("/freshsale/registry", {
          mobile: value
        });
        if (data) {
          callback(new Error("手机号已存在，请重新输入"));
        } else {
          callback();
        }
      }
    };
    const validateRPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (!/^[\w]{6,18}$/.test(value)) {
        callback(new Error("请输入正确的密码"));
      } else {
        callback();
      }
    };
    const validateCheckRPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.rForm.rPassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      activeName: "login",
      canLogin: true,
      lloading: false,
      canRegister: true,
      rloading: false,
      lForm: {
        account: "",
        lPassword: ""
      },
      rForm: {
        username: "",
        email: "",
        mobile: "",
        rPassword: "",
        checkRPassword: ""
      },
      rules: {
        account: [{ validator: validateAccount, trigger: "blur" }],
        lPassword: [{ validator: validateLPassword, trigger: "blur" }],
        username: [{ validator: validateUsername, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        mobile: [{ validator: validateMobile, trigger: "blur" }],
        rPassword: [{ validator: validateRPassword, trigger: "blur" }],
        checkRPassword: [{ validator: validateCheckRPassword, trigger: "blur" }]
      }
    };
  },
  methods: {
    login(formName) {
      const reqIC = axios.interceptors.request.use(config => {
        this.canLogin = false;
        this.lloading = true;
        return config;
      });
      const resIC = axios.interceptors.response.use(config => {
        this.canLogin = true;
        this.lloading = false;
        return config;
      });
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post("/freshsale/login", {
              account: this.lForm.account,
              password: this.lForm.lPassword
            })
            .then(result => {
              if (result.data) {
                this.$message({
                  message: "登陆成功",
                  type: "success",
                  duration: 2333
                });
                this.$cookies.set("username", result.data);
                this.$router.push("/");
              } else {
                this.$message({
                  message: "用户名或密码错误",
                  type: "error",
                  duration: 2333
                });
              }
              axios.interceptors.request.eject(reqIC);
              axios.interceptors.response.eject(resIC);
            });
        }
      });
    },
    register(formName) {
      const reqIC = axios.interceptors.request.use(config => {
        this.canRegister = false;
        this.rloading = true;
        return config;
      });
      const resIC = axios.interceptors.response.use(config => {
        this.canRegister = true;
        this.rloading = false;
        return config;
      });
      this.$refs[formName].validate(valid => {
        if (valid) {
          axios
            .post("/freshsale/register", {
              username: this.rForm.username,
              email: this.rForm.email,
              mobile: this.rForm.mobile,
              password: this.rForm.rPassword,
              cart:[]
            })
            .then(result => {
              this.rForm.username = this.rForm.email = this.rForm.mobile = this.rForm.Rpassword = this.rForm.checkRPassword =
                "";
              this.$message({
                message: result.data,
                type: "success",
                duration: 2333
              });
              this.activeName = "login";
              this.canRegister = true;
            });
          axios.interceptors.request.eject(reqIC);
          axios.interceptors.response.eject(resIC);
        } else {
          this.$message({
            message: "请完善注册信息",
            type: "error",
            duration: 2333
          });
          axios.interceptors.request.eject(reqIC);
          axios.interceptors.response.eject(resIC);
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/scss/public.scss";

// 注册&登录
#lg {
  height: 550px;
  background-color: #666;
  main {
    .tabs-wrap {
      width: 439px;
      background-color: rgba(255, 255, 255, 0.69);
      padding: 0 39px;
      position: absolute;
      top: 39px;
      right: 0;
    }
  }
}
</style>

<style lang="scss">
@import "@/assets/scss/public.scss";

#lg {
  .el-tabs__nav {
    width: 100%;
    .el-tabs__item {
      width: 50%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      &:first-of-type {
        margin-left: 39px;
      }
    }
  }
  .el-form {
    .el-form-item {
      .el-input {
        .el-input__inner {
          color: #000 !important;
          border-radius: 0;
          &::-webkit-input-placeholder {
            /* WebKit browsers */
            color: #666;
          }

          &:-moz-placeholder {
            /* Mozilla Firefox 4 to 18 */
            color: #666;
          }

          &::-moz-placeholder {
            /* Mozilla Firefox 19+ */
            color: #666;
          }

          &::-ms-input-placeholder {
            /* Internet Explorer 10+ */
            color: #666;
          }
          color: $miku;
        }
        .el-input__suffix {
          color: $miku;
        }
      }
      .el-button {
        width: 100%;
        border-radius: 0;
      }
    }
  }
}
</style>
