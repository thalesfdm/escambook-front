<template>
<div id="main-wrapper">
  <div v-if="user" id="user-container">
    <div id="user-card">
      <img v-if="user.image" v-bind:src="user.image.cloudImage">
      <img v-if="!user.image" src="https://res.cloudinary.com/escambook/image/upload/v1573855303/profilepic/default-profilepic.png">
      <div id="user-info">
        <span id="user-name">{{user.name}}</span>
        <span id="user-email">{{user.email}}</span>
        <span id="user-email">{{user.address.city}} - {{user.address.district}}</span>
      </div>
    </div>
  </div>
</div>
</template>

<style>
#user-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#user-card {
  align-items: center;
  background-color: #eee;
  box-shadow: -2px 4px 2px #666;
  display: flex;
  margin-top: 18px;
  padding: 18px;
  width: 100vw;
}

#user-card img {
  box-shadow: -4px 6px 4px #666;
  border-radius: 128px;
  height: 100px;
  width: auto;
}

#user-info {
  display: flex;
  flex-direction: column;
  padding: 8px;
  text-align: center;
  width: 100%
}

#user-name {
  font-size: 16pt;
  font-weight: 700;
}
</style>

<script type="text/javascript" src="../js/TelaPerfil.js"></script>
