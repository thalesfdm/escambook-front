<template>
<div id="main-wrapper">
  <div id="form-container">
    <form @submit.prevent="sendForm">
      <div class="form-group">
        <span v-if="justRegistered" style="color: green;">Registrado com sucesso!</span>
        <span>Login</span>
        <b-form-group id="b-form-group">
          <b-form-input id="input-style" v-model="form['email']" type="email" placeholder="E-mail"></b-form-input>
        </b-form-group>
        <b-form-group id="b-form-group">
          <b-form-input id="input-style" v-model="form['password']" type="password" placeholder="Senha"></b-form-input>
        </b-form-group>
      </div>
      <div id="submit-buttons">
        <router-link :to="{name: 'TelaInicial'}">
          <button>Retornar</button>
        </router-link>
        <button v-on:click="sendForm">Entrar</button>
      </div>
    </form>
  </div>
</div>
</template>

<style>
* {
  font-family: 'Roboto';
}

#submit-buttons button {
  background-color: #fff;
  border-style: none;
  border-radius: 4px;
  display: inline-block;
  font-size: 12pt;
  padding: 12px 24px;
  margin-right: 4px;
  text-align: center;
  text-decoration: none;
}

#form-container {
  background-color: #ddd;
  display: flex;
  justify-content: center;
  margin-top: 18px;
  padding: 32px;
}

#form-container form {
  display: flex;
  flex-direction: column;
  font-size: 16pt;
  font-weight: 700;
  justify-content: center;
  text-align: center;
}

#form-container .form-group {
  margin-bottom: 32px;
}

#input-style {
  background-color: #fff;
  border-radius: 4px;
  border-style: none;
  margin-top: 8px;
  padding: 12px 18px;
  width: 100% !important;
}

.form-group {
  display: flex;
  flex-direction: column;
}

#b-form-group {
  margin: 0px !important;
  text-align: left;
  font-size: 13pt
}
</style>

<script type="text/javascript" src="../js/TelaLogin.js"></script>
