<template>
  <div class="container">
    <div v-if="$auth.loggedIn">
      <h1 style="color: red">Bem-vindo, {{ $auth.user.username }}!</h1>
      <p>
        Você está na página inicial. Você atualmente está autenticado. Caso você deseje fazer o
        logout não deixe de clicar no botão abaixo.
      </p>

      <button type="submit" class="btn btn-outline-danger" @click="doLogout">Logout</button>
    </div>
    <div v-else>
      <h1>Bem-vindo!</h1>
      <p>
        Você está na página inicial. Você atualmente não está autenticado. Se deseja se autenticar
        clique no botão abaixo.
      </p>

      <button type="submit" class="btn btn-primary" @click="redirectLogin">Login</button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  methods: {
    async redirectLogin() {
      this.$toast
        .info("Você foi redirecionado para página de login.", { position: "top-right" })
        .goAway(4000);
      await this.$router.push("/login");
    },
    async doLogout() {
      try {
        await this.$auth.logout();

        this.$toast.error("Você efetuou logout.", { position: "top-right" }).goAway(4000);
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    },
  },
});
</script>
