<template>
<div id="main-wrapper">
  <div id="form-container">
    <form @submit.prevent="sendForm">
      <div class="form-group">
        <span>Crie sua conta!</span>
        <input v-model="form['email']" type="email" placeholder="E-mail"></input>
        <input v-model="form['password']" type="password" placeholder="Senha"></input>
        <input type="password" placeholder="Confirmar senha"></input>
      </div>
      <div class="form-group">
        <span>Informações Pessoais</span>
        <input v-model="form['name']" name="name" type="text" placeholder="Nome"></input>
        <input v-model="form['cpf']" type="text" placeholder="CPF"></input>
        <input v-model="form['birthDate']" type="date" placeholder="Data de nascimento"></input>
      </div>
      <div class="form-group">
        <span>Informações de contato</span>
        <input v-model="form['city']" type="text" placeholder="Cidade"></input>
        <input v-model="form['district']" type="text" placeholder="Estado"></input>
        <input v-model="form['postalCode']" type="text" placeholder="CEP"></input>
        <input v-model="form['street']" type="text" placeholder="Rua"></input>
        <input v-model="form['houseNumber']" type="text" placeholder="Número da rua"></input>
        <input v-model="form['phone']" type="text" placeholder="Telefone para contato"></input>
      </div>
      <div id="submit-buttons">
        <router-link :to="{name: 'TelaInicial'}">
          <button>Retornar</button>
        </router-link>
        <button v-on:click="sendForm">Cadastrar</button>
      </div>
    </form>
  </div>
</div>
</template>

<style>
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

#form-container form input {
  background-color: #fff;
  border-radius: 4px;
  border-style: none;
  margin-top: 8px;
  padding: 12px 18px;
  width: 60vw;
}

.form-group {
  display: flex;
  flex-direction: column;
}
</style>

<script type="text/javascript" src="../js/TelaCadastro.js"></script>
