<template>
<div v-if="user">
  <div id="new-swap-menu">
    <span>{{sectionTitle}}</span>
  </div>
  <div class="select-radio">
    <div>
      <input v-model="category" type="radio" name="categoria" value="T" checked>
      <span>Troca</span>
    </div>
    <div>
      <input v-model="category" type="radio" name="categoria" value="E">
      <span>Empréstimo</span>
    </div>
  </div>
  <div class="swap-user-card">
    <div class="swap-user-info">
      <img v-if="user.image" v-bind:src="user.image.cloudImage">
      <img v-if="!user.image" src="https://res.cloudinary.com/escambook/image/upload/v1573855303/profilepic/default-profilepic.png">
      <div class="swap-user-info-name-address">
        <span style="font-weight: 700">{{user.name}}</span>
        <span style="font-size: 11pt">{{user.address.city}} - {{user.address.district}}</span>
      </div>
    </div>
  </div>
  <div v-if="category === 'T'" class="swap-owner-copy-info">
    <div class="swap-owner-copy-info-wrapper" style="width: 14%;">
      <img src="https://res.cloudinary.com/escambook/image/upload/v1573856107/coverpic/default-coverpic.jpg">
    </div>
    <div class="swap-owner-copy-info-wrapper" style="width: 86%;">
      <span style="color: gray;">
        O usuário poderá solicitar um outro livro em troca.
      </span>
    </div>
  </div>
  <div class="swap-owner-card">
    <div class="swap-owner-info">
      <div class="swap-owner-info-name-address">
        <span style="font-weight: 700">{{copy.user.name}}</span>
        <span style="font-size: 11pt">{{copy.user.address.city}} - {{copy.user.address.district}}</span>
      </div>
      <img v-if="copy.user.image" v-bind:src="copy.user.image.cloudimage">
      <img v-if="!copy.user.image" src="https://res.cloudinary.com/escambook/image/upload/v1573855303/profilepic/default-profilepic.png">
    </div>
  </div>
  <div class="swap-owner-copy-info">
    <div class="swap-owner-copy-info-wrapper" style="width: 86%;">
      <span class="swap-owner-copy-title" style="font-weight: 700">{{book.title}}</span>
      <span class="swap-owner-copy-author" style="font-style: italic">{{book.author}}</span>
      <span v-if="copy.available && copy.user.id != user.id" style="color: green;">
        &#x2714; Disponível
      </span>
      <span v-if="!copy.available && copy.user.id != user.id" style="color: gray;">
        &#x1f6c7; Indisponível
      </span>
      <span v-if="copy.user.id == user.id" style="color: gray;">
        &#x1f6c7; Sua cópia
      </span>
      <span style="color: gray;">
        {{copy.condition}}
      </span>
    </div>
    <div class="swap-owner-copy-info-wrapper" style="width: 14%;">
      <img v-if="book.image" v-bind:src="book.image.cloudImage">
      <img v-if="!book.image" src="https://res.cloudinary.com/escambook/image/upload/v1573856107/coverpic/default-coverpic.jpg">
    </div>
  </div>
  <div class="select-radio">
    <div>
      <input v-model="expiresAt" type="radio" name="expires" value="1" checked>
      <span>1 Mês</span>
    </div>
    <div>
      <input v-model="expiresAt" type="radio" name="expires" value="3">
      <span>3 Meses</span>
    </div>
    <div>
      <input v-model="expiresAt" type="radio" name="expires" value="6">
      <span>6 Meses</span>
    </div>
  </div>
  <div class="swap-confirm">
    <router-link :to="{name: 'TelaPerfil'}">
      <button class="swap-confirm-button">Cancelar</button>
    </router-link>
    <button v-on:click="swapRequest" class="swap-confirm-button">Enviar</button>
  </div>
</div>
</template>

<style>
#new-swap-menu {
  background-color: gold;
  box-shadow: -1px 2px 2px #666;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16pt;
  font-weight: 700;
  margin-top: 8px;
  padding: 12px;
}

.swap-confirm {
  align-items: center;
  background-color: #888;
  box-shadow: -1px 2px 2px #666;
  color: #fff;
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  padding: 6px;
}

.swap-confirm-button {
  background-color: #fff;
  border-style: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  font-size: 12pt;
  padding: 8px 12px;
  margin-left: 32px;
  margin-right: 32px;
  text-align: center;
}

.swap-user-card {
  background-color: #eee;
  box-shadow: -1px 2px 2px #666;
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  width: 100vw;
}

.swap-user-info {
  background-color: #ddd;
  align-items: center;
  display: flex;
  padding: 8px;
}

.swap-user-info>img {
  border-radius: 32px;
  box-shadow: -1px 2px 2px #666;
  height: 32px;
  width: 32px;
}

.swap-user-info-name-address {
  display: flex;
  flex-direction: column;
  margin-left: 12px;
}

.swap-owner-card {
  background-color: #eee;
  box-shadow: -1px 2px 2px #666;
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  width: 100vw;
}

.swap-owner-info {
  background-color: #ddd;
  align-items: center;
  justify-content: flex-end;
  display: flex;
  padding: 8px;
}

.swap-owner-info>img {
  border-radius: 32px;
  box-shadow: -1px 2px 2px #666;
  height: 32px;
  width: 32px;
}

.swap-owner-info-name-address {
  display: flex;
  text-align: right;
  flex-direction: column;
  margin-right: 12px;
}

.swap-owner-copy-info {
  background-color: #eee;
  box-shadow: -1px 2px 2px #666;
  justify-content: space-around;
  border-top: 1px solid #ccc;
  align-items: center;
  display: flex;
  padding: 8px;
}

.swap-owner-copy-info-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.swap-owner-copy-info>.swap-owner-copy-info-wrapper>img {
  box-shadow: -1px 2px 2px #666;
  height: 45px;
  width: 30px;
}

.swap-owner-copy-info>.swap-owner-copy-info-wrapper>span {
  margin-left: 8px;
  font-size: 11pt;
}
</style>

<script type="text/javascript" src="../js/TelaTroca.js"></script>
