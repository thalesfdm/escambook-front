<template>
<div id="main-wrapper">
  <!-- <div v-if="true" class="alert alert-danger" role="alert">
        This is a danger alert—check it out!
      </div> -->
  <div id="form-container">
    <b-form @submit.prevent="sendForm">
      <div class="form-group">
        <span>Crie sua conta!</span>
        <b-form-group id="b-form-group"><!--Todos os b-form-group foram colocados para que a validação do campo não exiba as mensagens dos outros campos -->
          <b-form-input id="input-style" v-model="form['email']" type="email" :state="emailState" placeholder="E-mail"></b-form-input>
          <b-form-invalid-feedback>E-mail inválido</b-form-invalid-feedback>
        </b-form-group>
        
        <b-form-group id="b-form-group">
          <b-form-input id="input-style" v-model="form['password']" type="password" maxlength="16" :state="passwordState" placeholder="Senha"></b-form-input>
          <b-form-invalid-feedback>Senha deve ter entre 4 e 16 caractéres</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="b-form-group">
          <b-form-input id="input-style" v-model="form['passwordCheck']" type="password" maxlength="16" :state="passwordCheckState" placeholder="Confirmar senha"></b-form-input>
          <b-form-invalid-feedback>Senhas não conferem</b-form-invalid-feedback>
        </b-form-group>
      </div>
      <div class="form-group">
        <span>Informações Pessoais</span>
        <b-form-input id="input-style" v-model="form['name']" name="name" type="text" maxlength="60" placeholder="Nome"></b-form-input>

        <b-form-group id="b-form-group">
          <b-form-input id="input-style" v-model="form['cpf']" type="text" maxlength="11" :state="cpfCheck" placeholder="CPF"></b-form-input>
          <b-form-invalid-feedback>CPF inválido</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="b-form-group">
          <b-form-input id="input-style" v-model="form['birthDate']" type="date" :state="birthDateCheck" placeholder="Data de nascimento"></b-form-input>
          <b-form-invalid-feedback>Idade mínima 12 anos</b-form-invalid-feedback>
        </b-form-group>
      </div>
      <div class="form-group">
        <span>Informações de contato</span>
        <b-form-group id="b-form-group">
          <b-form-input id="input-style" v-model="form['city']" type="text" maxlength="60" :state="cityCheck" placeholder="Cidade"></b-form-input>
          <b-form-invalid-feedback>Cidade deve ter no mínimo 4 caractéres</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="b-form-group">
          <b-form-input id="input-style" v-model="form['district']" type="text" maxlength="2" :state="districtCheck" placeholder="Estado"></b-form-input>
          <b-form-invalid-feedback>Distrito deve ter 2 caractéres</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="b-form-group">
          <b-form-input id="input-style" v-model="form['postalCode']" type="text" maxlength="8" :state="postalCodeCheck" placeholder="CEP"></b-form-input>
          <b-form-invalid-feedback>CEP deve ter 8 caractéres</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="b-form-group">
          <b-form-input id="input-style" v-model="form['street']" type="text" maxlength="60" :state="streetCheck" placeholder="Rua"></b-form-input>
          <b-form-invalid-feedback>Rua deve ter no mínimo 4 caractéres</b-form-invalid-feedback>
        </b-form-group>
        
        <b-form-group id="b-form-group">
          <b-form-input id="input-style" v-model="form['houseNumber']" type="text" maxlength="6" :state="houserNumberCheck" placeholder="Número da casa"></b-form-input>
          <b-form-invalid-feedback>Número da casa deve ser numérico</b-form-invalid-feedback>
        </b-form-group>

        <b-form-group id="b-form-group">
          <b-form-input id="input-style" v-model="form['phone']" type="text" maxlength="11" :state="phoneCheck" placeholder="Telefone para contato"></b-form-input>
          <b-form-invalid-feedback>Número deve conter 11 números</b-form-invalid-feedback>
        </b-form-group>
      </div>
      <div id="submit-buttons">
        <router-link :to="{name: 'TelaInicial'}">
          <button>Retornar</button>
        </router-link>
        <button v-on:click="sendForm">Cadastrar</button>
      </div>
    </b-form>
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

#input-style{
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

#b-form-group {
  margin: 0px !important;
  text-align: left;
  font-size: 13pt
}
</style>

<script type="text/javascript" src="../js/TelaCadastro.js"></script>
