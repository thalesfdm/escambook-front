<template>
<header>
  <div id="nav-fixed">
    <nav class="nav-main">
      <div v-if="isLogged">
        <nav id="nav-btn" v-on:click="slideToggle">
          <div></div>
          <div></div>
          <div></div>
        </nav>
        <section id="nav-slide">
          <div id="nav-menu-welcome">
            <span>Olá <b>{{name}}</b>!</span>
          </div>
          <div id="nav-menu">
            <router-link :to="{name: 'TelaPerfil'}">
              <div v-on:click="slideToggle" class="nav-menu-item">
                <span>Meu perfil</span>
              </div>
            </router-link>
            <router-link :to="{name: 'TelaPerfil'}">
              <div v-on:click="slideToggle" class="nav-menu-item">
                <span>...</span>
              </div>
            </router-link>
            <router-link :to="{name: 'TelaPerfil'}">
              <div v-on:click="slideToggle" class="nav-menu-item">
                <span>...</span>
              </div>
            </router-link>
          </div>
        </section>
      </div>
      <router-link :to="{name: 'TelaInicial'}">
        <div class="nav-logo">
          <img src="@/images/icone.png" alt="">
          <span>EscamBook</span>
        </div>
      </router-link>
      <div class="nav-buttons">
        <router-link v-if="!isLogged" :to="{name: 'TelaCadastro'}">
          <button>Cadastrar</button>
        </router-link>
        <router-link v-if="!isLogged" :to="{name: 'TelaLogin'}">
          <button>Entrar</button>
        </router-link>
        <router-link v-if="isLogged" :to="{name: 'TelaInicial'}">
          <button v-on:click="logout">Sair</button>
        </router-link>
      </div>
    </nav>
    <div v-if="!isLogged" class="nav-welcome">
      <span>A maior rede social para troca de livros!</span>
      <form v-if="searchBar" class="nav-search">
        <input placeholder="O que você procura? Livros, autores..."></input>
        <button><img src="@/images/search.png" alt=""></button>
      </form>
    </div>
    <div v-if="isLogged && searchBar" class="nav-welcome">
      <form class="nav-search">
        <input placeholder="O que você procura? Livros, autores..."></input>
        <button><img src="@/images/search.png" alt=""></button>
      </form>
    </div>
  </div>
  <div>
    <nav class="nav-main">
      <div class="nav-logo">
        <img src="@/images/icone.png" alt="">
        <span>EscamBook</span>
      </div>
      <div class="nav-buttons">
        <button>Cadastrar</button>
        <button>Entrar</button>
      </div>
    </nav>
    <div v-if="!isLogged" class="nav-welcome">
      <span>A maior rede social para troca de livros!</span>
      <form v-if="searchBar" class="nav-search">
        <input placeholder="O que você procura? Livros, autores..."></input>
        <button><img src="@/images/search.png" alt=""></button>
      </form>
    </div>
    <div v-if="isLogged && searchBar" class="nav-welcome">
      <form class="nav-search">
        <input placeholder="O que você procura? Livros, autores..."></input>
        <button><img src="@/images/search.png" alt=""></button>
      </form>
    </div>
  </div>
</header>
</template>

<style>
#nav-fixed {
  position: fixed;
  width: 100%;
}

.nav-main {
  background-color: #222;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
}

.nav-logo {
  display: flex;
  align-items: center;
}

.nav-logo img {
  width: 40px;
}

.nav-logo span {
  color: #ddd;
  font-size: 14pt;
  margin-left: 8px;
}

.nav-buttons {
  display: flex;
}

.nav-buttons button {
  background-color: #fff;
  border-style: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  font-size: 12pt;
  padding: 12px 14px;
  margin-left: 8px;
  text-align: center;
}

.nav-welcome {
  background-color: gold;
  box-shadow: 2px 2px 8px #666;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12pt;
  padding: 12px;
}

.nav-welcome span {
  margin-bottom: 8px;
}

.nav-search {
  background-color: #FFF;
  display: flex;
  justify-content: space-between;
  border-radius: 16px;
  padding: 4px 8px;
  width: 80%;
}

.nav-search input {
  background-color: transparent;
  border: none;
  font-size: 10pt;
  outline: none;
  width: 100%;
}

.nav-search button {
  background-color: #aaa;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  height: 35px;
  width: 35px;
}

.nav-search button img {
  width: 100%;
}

/* Menu Toggle */

#nav-btn {
  background-color: #fff;
  border-style: none;
  border-radius: 4px;
  cursor: pointer;
  padding: 8px 14px;
  transition: all 0.4s linear;
}

#nav-btn>div {
  background-color: #545454;
  width: 20px;
  height: 3px;
  margin: 4px 0px;
  transition: all 0.15s linear;
}

#nav-slide {
  background-color: #ccc;
  border-right: #666 solid 4px;
  position: fixed;
  left: -90%;
  top: 68px;
  width: 90%;
  height: 0px;
  transition: left 0.15s linear;
}

#nav-menu-welcome {
  background-color: gold;
  color: black;
  display: flex;
  font-size: 16pt;
  justify-content: center;
  padding: 12px;
}

#nav-menu {
  display: flex;
  flex-direction: column;
  font-size: 14pt;
}

.nav-menu-item {
  background-color: #fff;
  border-radius: 4px;
  color: black;
  margin: 10px 10px 0 10px;
  padding: 12px;
  text-align: center;
}
</style>

<script type="text/javascript" src="../js/Navbar.js"></script>
