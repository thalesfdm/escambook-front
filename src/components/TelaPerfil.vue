<template>
<div id="main-wrapper">
  <div v-if="user" id="user-container">

    <!-- inicio: PERFIL DO USUÁRIO -->
    <div id="user-card">
      <router-link :to="{name: 'TelaPerfil'}">
        <img v-if="user.image" v-bind:src="user.image.cloudImage">
        <img v-if="!user.image" src="https://res.cloudinary.com/escambook/image/upload/v1573855303/profilepic/default-profilepic.png">
      </router-link>
      <div id="user-info">
        <router-link :to="{name: 'TelaPerfil'}">
          <span id="user-name">{{user.name}}</span>
        </router-link>
        <span id="user-email">{{user.email}}</span>
        <span id="user-email">{{user.address.city}} - {{user.address.district}}</span>
      </div>
    </div>
    <div id="user-menu-buttons">
      <button class="user-menu-button">Editar Perfil</button>
      <button class="user-menu-button">Seguindo</button>
      <button class="user-menu-button">Seguidores</button>
    </div>
    <div id="user-library-menu">
      <span>Minha Biblioteca</span>
      <button v-on:click="showLibrary" class="user-library-menu-img-button">
        <img src="../images/books.png">
      </button>
      <button v-on:click="showSearch" class="user-library-menu-img-button">
        <img src="../images/plus.png">
      </button>
      <button v-on:click="showPending" class="user-library-menu-img-button">
        <img src="../images/sino.png">
      </button>
    </div>
    <!-- fim: PERFIL DO USUÁRIO -->

    <!-- inicio: BIBLIOTECA DO USUÁRIO -->
    <div v-if="viewLibrary" class="library-container">
      <div class="library-card" v-for="copy in copies" v-bind:key="copy.id">
        <img v-if="copy.book.image" v-bind:src="copy.book.image.cloudimage">
        <img v-if="!copy.book.image" src="https://res.cloudinary.com/escambook/image/upload/v1573856107/coverpic/default-coverpic.jpg">
        <div class="library-book-info-container">
          <div class="library-book-info">
            <span class="library-book-title">{{copy.book.title}}</span>
            <span class="library-book-author">{{copy.book.author}}</span>
          </div>
          <span v-if="copy.available && !removeBook.includes(`remove-book-${copy.id}`)" style="color: green;">
            &#x2714; Disponível
          </span>
          <span v-if="!copy.available" style="color: gray;">
            &#x1f6c7; Indisponível
          </span>
          <span v-if="removeBook.includes(`remove-book-${copy.id}`)" style="color: red;">
            &#x274C; Removido
          </span>
        </div>
        <div class="library-book-button-menu">
          <button v-bind:disabled="removeBook.includes(`remove-book-${copy.id}`)" class="library-book-button">
            <img src="../images/edit.png">
          </button>
          <button v-bind:disabled="!copy.available || removeBook.includes(`remove-book-${copy.id}`)" v-on:click="deleteCopy(copy.id)" class="library-book-button">
            <img src="../images/delete.png">
          </button>
        </div>
      </div>
    </div>
    <!-- fim: BIBLIOTECA DO USUÁRIO -->

    <!-- inicio: BUSCAR LIVROS -->
    <div v-if="viewSearch" class="library-search-bar">
      <form class="nav-search">
        <input v-model="searchString" placeholder="O que você procura? Livros, autores..."></input>
        <button v-on:click="getBooks"><img src="@/images/search.png" alt=""></button>
      </form>
    </div>
    <div v-if="viewSearch" class="library-container">
      <div class="library-card" v-for="book in books" v-bind:key="book.id">
        <img v-if="book.image" v-bind:src="book.image.cloudImage">
        <img v-if="!book.image" src="https://res.cloudinary.com/escambook/image/upload/v1573856107/coverpic/default-coverpic.jpg">
        <div class="library-book-info-search">
          <span class="library-book-title">{{book.title}}</span>
          <span class="library-book-author">{{book.author}}</span>
          <span v-if="book.edition" class="library-book-edition">{{book.edition}}ª Edição</span>
          <span v-if="book.publisher" class="library-book-edition">{{book.publisher}}</span>
          <span v-if="book.publisher" class="library-book-edition">ISBN13: {{book.isbn}}</span>
        </div>
        <div class="library-book-button-menu">
          <button v-if="!addBook.includes(`add-book-${book.id}`)" v-on:click="addCopy(book.id)" class="library-book-button" v-bind:id="`add-book-${book.id}`">
            <img src="../images/plus.png">
          </button>
          <button disabled v-if="addBook.includes(`add-book-${book.id}`)" class="my-copy-added-button" v-bind:id="`add-book-${book.id}`">
            <img src="../images/tick.png">
          </button>
        </div>
      </div>
    </div>
    <!-- fim: BUSCAR LIVROS -->

  </div>
</div>
</template>

<style>
/* inicio: PERFIL DO USUÁRIO */

#user-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

#user-card {
  align-items: center;
  background-color: #eee;
  box-shadow: -1px 2px 2px #666;
  display: flex;
  margin-top: 8px;
  padding: 18px;
  width: 100vw;
}

#user-card img {
  box-shadow: -1px 2px 2px #666;
  border-radius: 128px;
  height: 100px;
  width: auto;
}

#user-info {
  display: flex;
  flex-direction: column;
  padding: 8px;
  text-align: center;
  width: 100%;
}

#user-name {
  color: black;
  font-size: 16pt;
  font-weight: 700;
}

#user-edit-info {
  box-shadow: -1px 2px 2px #666;
  background-color: #bbb;
  display: flex;
  justify-content: space-evenly;
  padding: 8px;
  width: 100vw;
}

#user-menu-buttons {
  background-color: #ccc;
  box-shadow: -1px 2px 2px #666;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 16pt;
  font-weight: 700;
  padding: 8px;
  width: 100vw;
}

.user-menu-button {
  background-color: #fff;
  border-style: none;
  border-radius: 4px;
  cursor: pointer;
  display: inline-block;
  font-size: 12pt;
  padding: 8px 12px;
  margin-left: 8px;
  text-align: center;
}

/* fim: PERFIL DO USUÁRIO */

/* inicio: BIBLIOTECA */

#user-library-menu {
  background-color: gold;
  box-shadow: -1px 2px 2px #666;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  font-size: 16pt;
  font-weight: 700;
  margin-top: 8px;
  padding: 12px;
  width: 100vw;
}

.user-library-menu-img-button {
  cursor: pointer;
  display: flex;
  border-radius: 32px;
  border: solid 1px #ddb500;
  align-items: center;
  justify-content: center;
  background-color: #eee;
  padding: 4px;
  width: 36px;
  height: 36px;
}

#user-library-menu img {
  width: 20px;
  height: 20px;
}

.library-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100vw;
}

.library-card {
  background-color: #eee;
  box-shadow: -1px 2px 2px #666;
  display: flex;
  justify-content: space-evenly;
  margin-top: 8px;
  padding: 12px;
  width: 100vw;
}

.library-card>img {
  box-shadow: -4px 6px 4px #666;
  height: 120px;
  width: 80px;
}

.library-book-title {
  font-size: 12pt;
  font-weight: 700;
}

.library-book-author {
  font-size: 12pt;
  font-style: italic;
}

.library-book-edition {
  color: #444;
  font-size: 10pt;
  font-style: italic;
}

.library-book-button-menu {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}

.library-book-info-container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
  margin-left: 6px;
  width: 60%;
}

.library-book-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.library-book-info-search {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  margin-left: 6px;
  width: 60%;
}

.library-book-button,
.my-copy-added-button {
  display: flex;
  border-radius: 32px;
  border: solid 1px #ddd;
  align-items: center;
  justify-content: center;
  padding: 4px;
  width: 36px;
  height: 36px;
}

.library-book-button {
  background-color: #fff;
  cursor: pointer;
}

.library-book-button:disabled {
  background-color: #eee;
  cursor: auto;
}

.library-book-button:disabled img {
  opacity: 0.20;
}

.my-copy-added-button {
  background-color: #ddffdd;
}

.library-book-button img,
.my-copy-added-button img {
  width: 20px;
  height: 20px;
}

.library-search-bar {
  background-color: #888;
  box-shadow: -1px 2px 2px #666;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12pt;
  padding: 6px;
  width: 100vw;
}

/* fim: BIBLIOTECA */
</style>

<script type="text/javascript" src="../js/TelaPerfil.js"></script>
