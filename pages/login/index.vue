<template>
  <div class="container">
    <div class="form-container">
      <form @submit.prevent="doLogin">
        <label
          >Email
          <input v-model="login.email" autocomplete="true" placeholder="Email" type="email" />
        </label>

        <label
          >Password
          <input
            v-model="login.password"
            autocomplete="current-password"
            placeholder="Password"
            type="password"
          />
        </label>
        <recaptcha class="recaptcha" @error="onError" @success="onSuccess" @expired="onExpired" />

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      login: {
        email: "",
        password: "",
      },
    };
  },
  watch: {
    $route() {
      location.reload();
    },
  },
  mounted() {
    // Life cycle hook!
    if (this.$auth.loggedIn) {
      this.$toast
        .error("Você já está autenticado. Você foi redirecionado para página inicial.")
        .goAway(4000);
      this.$router.push("/");
    }
  },
  methods: {
    async doLogin() {
      try {
        await this.$recaptcha.getResponse();

        const succesfulLogin = await this.$auth.loginWith("local", {
          data: {
            email: this.login.email,
            password: this.login.password,
          },
        });

        if (succesfulLogin) {
          this.$auth.setUser({
            email: this.login.email,
            password: this.login.password,
          });

          this.$toast
            .success("Bem-vindo. Credenciais validadas.", { position: "top-right" })
            .goAway(4000);
          this.$router.push("/");
        } else {
          this.$toast
            .error("Você está informando dados inválidos.", { position: "top-right" })
            .goAway(4000);
        }

        await this.$recaptcha.reset();
      } catch (err) {
        this.$toast
          .error("Algo deu errado na operação. Verifique se você solucionou o reCaptcha.", {
            position: "top-left",
          })
          .goAway(4000);
        console.log(err);
      }
    },
    onError(error: any) {
      console.log("Error happened:", error);
    },
    onSuccess(token: any) {
      console.log("Succeeded:", token);
    },
    onExpired() {
      console.log("Expired");
    },
  },
});
</script>

<style scoped>
html,
body * {
  box-sizing: border-box;
  font-family: "Open Sans", sans-serif;
}

body {
  background: linear-gradient(rgba(246, 247, 249, 0.8), rgba(246, 247, 249, 0.8)),
    url(https://dl.dropboxusercontent.com/u/22006283/preview/codepen/sky-clouds-cloudy-mountain.jpg)
      no-repeat center center fixed;
  background-size: cover;
}

.recaptcha {
  display: flex;
  justify-content: center;
  align-items: center;
}

.form-container {
  background-color: rgba(13, 57, 146, 0.8);
  border-radius: 20px;
  padding: 0.5em;
  height: 320px;
  width: 350px;
}

.container {
  width: 100%;
  padding-top: 60px;
  padding-bottom: 100px;
}

input,
label {
  display: block;
}

label {
  font-weight: 400;
  text-transform: uppercase;
  font-size: 13px;
  padding-left: 15px;
  padding-bottom: 10px;
  color: rgba(255, 255, 255, 0.7);
}

:focus {
  outline: none;
}

input {
  margin: 10px 0 10px 0;
}

button {
  margin-top: 20px;
}
</style>
