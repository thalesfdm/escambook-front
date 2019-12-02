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
      <span id="user-library-menu-title">{{sectionTitle}}</span>
      <button v-on:click="showLibrary" class="user-library-menu-img-button">
        <img src="../images/books.png">
      </button>
      <button v-on:click="showSearch" class="user-library-menu-img-button">
        <img src="../images/plus.png">
      </button>
      <button v-on:click="showPending" class="user-library-menu-img-button">
        <img src="../images/sino.png">
        <div v-if="pending" id="pending-length">
          {{pending.length}}
        </div>
      </button>
    </div>
    <!-- fim: PERFIL DO USUÁRIO -->

    <!-- inicio: BIBLIOTECA DO USUÁRIO -->
    <div v-if="viewLibrary" class="library-container">
      <div class="select-radio">
        Ordenar por:
        <div>
          <input v-model="ordenarBiblioteca" type="radio" name="ordenar-biblioteca" value="A">
          <span>Autor</span>
        </div>
        <div>
          <input v-model="ordenarBiblioteca" type="radio" name="ordenar-biblioteca" value="T">
          <span>Título</span>
        </div>
      </div>
      <div class="library-card" v-for="copy in copies" v-bind:key="copy.id">
        <img v-if="copy.book.image" v-bind:src="copy.book.image.cloudimage">
        <img v-if="!copy.book.image" src="https://res.cloudinary.com/escambook/image/upload/v1573856107/coverpic/default-coverpic.jpg">
        <div class="library-book-info-container">
          <div class="library-book-info">
            <span class="library-book-title">{{copy.book.title}}</span>
            <span class="library-book-author">{{copy.book.author}}</span>
            <span class="library-book-edition">{{copy.condition}}</span>
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
        <input v-model="searchString" placeholder="O que você procura? Livros, autores...">
        <button v-on:click="getBooks"><img src="@/images/search.png" alt=""></button>
      </form>
    </div>
    <div v-if="viewSearch" class="select-radio">
      Ordenar por:
      <div>
        <input v-model="ordenarBusca" type="radio" name="ordenar-busca" value="A">
        <span>Autor</span>
      </div>
      <div>
        <input v-model="ordenarBusca" type="radio" name="ordenar-busca" value="T">
        <span>Título</span>
      </div>
    </div>
    <div v-if="viewSearch" class="library-container">
      <div class="library-card" v-for="book in books" v-bind:key="book.id">
        <img class="book-cover" v-if="book.image" v-bind:src="book.image.cloudImage">
        <img class="book-cover" v-if="!book.image" src="https://res.cloudinary.com/escambook/image/upload/v1573856107/coverpic/default-coverpic.jpg">
        <div class="library-book-info-search">
          <span class="library-book-title" style="color: #000">{{book.title}}</span>
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
          <button class="library-book-button" v-on:click="getBookCopies(book.id)">
            <img src="../images/swap.png">
          </button>
        </div>
      </div>
    </div>
    <!-- fim: BUSCAR LIVROS -->

    <!-- inicio: TROCAR LIVRO -->
    <div v-if="viewSwap" class="library-search-bar">
      <form class="nav-search">
        <input v-model="searchString" placeholder="O que você procura? Livros, autores...">
        <button v-on:click="getBooks"><img src="@/images/search.png" alt=""></button>
      </form>
    </div>
    <div v-if="viewSwap" class="library-container">
      <div class="library-card">
        <img class="book-cover" v-if="bookSwap.image" v-bind:src="bookSwap.image.cloudImage">
        <img class="book-cover" v-if="!bookSwap.image" src="https://res.cloudinary.com/escambook/image/upload/v1573856107/coverpic/default-coverpic.jpg">
        <div class="library-book-info-search">
          <span class="library-book-title" style="color: #000">{{bookSwap.title}}</span>
          <span class="library-book-author">{{bookSwap.author}}</span>
          <span v-if="bookSwap.edition" class="library-book-edition">{{bookSwap.edition}}ª Edição</span>
          <span v-if="bookSwap.publisher" class="library-book-edition">{{bookSwap.publisher}}</span>
          <span v-if="bookSwap.publisher" class="library-book-edition">ISBN13: {{bookSwap.isbn}}</span>
        </div>
        <div class="library-book-button-menu">
          <button disabled class="library-book-button">
            <img src="../images/plus.png">
          </button>
          <button disabled class="library-book-button">
            <img src="../images/swap.png">
          </button>
        </div>
      </div>
    </div>
    <div v-if="viewSwap" class="copies-found">
      <span>{{bookCopiesLength}} cópia(s) encontrada(s)!</span>
    </div>
    <div v-if="viewSwap">
      <div class="copy-owner-card" v-for="owner in bookCopies" v-bind:key="owner.id">
        <div class="copy-owner-info">
          <img v-if="owner[0].user.image" v-bind:src="owner[0].user.image.cloudimage">
          <img v-if="!owner[0].user.image" src="https://res.cloudinary.com/escambook/image/upload/v1573855303/profilepic/default-profilepic.png">
          <div class="copy-owner-info-name-address">
            <span style="font-weight: 700">{{owner[0].user.name}}</span>
            <span style="font-size: 11pt">{{owner[0].user.address.city}} - {{owner[0].user.address.district}}</span>
          </div>
        </div>
        <div v-for="copy in owner" v-bind:key="copy.id">
          <div class="copy-info">
            <div class="copy-info-wrapper" style="width: 20%;">
              <img v-if="bookSwap.image" v-bind:src="bookSwap.image.cloudImage">
              <img v-if="!bookSwap.image" src="https://res.cloudinary.com/escambook/image/upload/v1573856107/coverpic/default-coverpic.jpg">
            </div>
            <div class="copy-info-wrapper" style="width: 60%;">
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
            <div class="copy-info-wrapper" style="width: 20%;">
              <button v-on:click="startSwap(copy, bookSwap)" v-bind:disabled="copy.user.id == user.id" class="library-book-button">
                <img src="../images/swap.png">
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- fim: TROCAR LIVRO -->

    <!-- inicio: PENDENTES -->
    <div v-if="viewPending" class="select-radio">
      Mostrar:
      <div>
        <input v-model="pendingSwaps" type="radio" name="pending" value="O">
        <span>Para mim</span>
      </div>
      <div>
        <input v-model="pendingSwaps" type="radio" name="pending" value="M">
        <span>Minhas</span>
      </div>
    </div>
    <div v-if="viewPending && pendingSwaps === 'O'">
      <div v-for="swap in pending" v-bind:key="swap.id">
        <div class="swap-user-card">
          <div class="swap-user-info">
            <img v-if="swap.swapusers[0].user.image" v-bind:src="swap.swapusers[0].user.image.cloudimage">
            <img v-if="!swap.swapusers[0].user.image" src="https://res.cloudinary.com/escambook/image/upload/v1573855303/profilepic/default-profilepic.png">
            <div class="swap-user-info-name-address">
              <span style="font-weight: 700">{{swap.swapusers[0].user.name}}</span>
              <span style="font-size: 11pt">{{swap.swapusers[0].user.address.city}} - {{swap.swapusers[0].user.address.district}}</span>
            </div>
          </div>
        </div>
        <div class="swap-owner-copy-info">
          <div class="swap-owner-copy-info-wrapper" style="width: 14%;">
            <img v-if="swap.swapcopies[0].copy.book.image" v-bind:src="swap.swapcopies[0].copy.book.image.cloudimage">
            <img v-if="!swap.swapcopies[0].copy.book.image" src="https://res.cloudinary.com/escambook/image/upload/v1573856107/coverpic/default-coverpic.jpg">
          </div>
          <div class="swap-owner-copy-info-wrapper" style="width: 86%;">
            <span class="swap-owner-copy-title" style="font-weight: 700">{{swap.swapcopies[0].copy.book.title}}</span>
            <span class="swap-owner-copy-author" style="font-style: italic">{{swap.swapcopies[0].copy.book.author}}</span>
          </div>
          <div style="display: flex;">
            <button style="margin-right: 8px;" class="library-book-button"  v-on:click="acceptSwap(swap.id)">
              <img src="../images/tick.png">
            </button>
            <button class="library-book-button" v-on:click="cancelSwap(swap.id)">
              <img src="../images/close.png">
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="viewPending && pendingSwaps === 'M'">
      <div v-for="swap in pendingMine" v-bind:key="swap.id">
        <div class="swap-user-card">
          <div class="swap-owner-info">
            <div class="swap-owner-info-name-address">
              <span style="font-weight: 700">{{swap.swapcopies[0].copy.user.name}}</span>
              <span style="font-size: 11pt">{{swap.swapcopies[0].copy.user.address.city}} - {{swap.swapcopies[0].copy.user.address.district}}</span>
            </div>
            <img v-if="swap.swapcopies[0].copy.user.image" v-bind:src="swap.swapcopies[0].copy.user.image.cloudimage">
            <img v-if="!swap.swapcopies[0].copy.user.image" src="https://res.cloudinary.com/escambook/image/upload/v1573855303/profilepic/default-profilepic.png">
          </div>
        </div>
        <div class="swap-owner-copy-info">
          <button class="library-book-button" v-on:click="cancelSwap(swap.id)">
            <img src="../images/close.png">
          </button>
          <div class="swap-owner-copy-info-wrapper" style="width: 86%;">
            <span class="swap-owner-copy-title" style="font-weight: 700">{{swap.swapcopies[0].copy.book.title}}</span>
            <span class="swap-owner-copy-author" style="font-style: italic">{{swap.swapcopies[0].copy.book.author}}</span>
          </div>
          <div class="swap-owner-copy-info-wrapper" style="width: 14%;">
            <img v-if="swap.swapcopies[0].copy.book.image" v-bind:src="swap.swapcopies[0].copy.book.image.cloudimage">
            <img v-if="!swap.swapcopies[0].copy.book.image" src="https://res.cloudinary.com/escambook/image/upload/v1573856107/coverpic/default-coverpic.jpg">
          </div>
          <div style="display: flex;">
          </div>
        </div>
      </div>
    </div>
    <!-- fim: PENDENTES -->

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

#user-library-menu-title {
  width: 50%;
}

#pending-length {
  display: flex;
  border-radius: 32px;
  background-color: red;
  color: white;
  justify-content: center;
  align-items: center;
  font-size: 12pt;
  font-weight: 700;
  position: absolute;
  margin-left: 22px;
  margin-bottom: 22px;
  height: 29px;
  width: 29px;
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

.library-card>img,
.book-cover {
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
  opacity: 0.2;
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

.copies-found {
  align-items: center;
  background-color: #444;
  box-shadow: -1px 2px 2px #666;
  color: #fff;
  display: flex;
  font-weight: 700;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 8px;
  padding: 6px;
  width: 100vw;
}

.copy-owner-card {
  background-color: #eee;
  box-shadow: -1px 2px 2px #666;
  display: flex;
  flex-direction: column;
  margin-top: 8px;
  width: 100vw;
}

.copy-owner-info {
  background-color: #ddd;
  align-items: center;
  display: flex;
  padding: 8px;
}

.copy-owner-info>img {
  border-radius: 32px;
  box-shadow: -1px 2px 2px #666;
  height: 32px;
  width: 32px;
}

.copy-owner-info-name-address {
  display: flex;
  flex-direction: column;
  margin-left: 12px;
}

/*
.copy-owner-info-address {
  display: flex;
  flex-direction: column;
  align-items: center;
}
*/

.copy-info {
  background-color: #eee;
  justify-content: space-around;
  border-top: 1px solid #ccc;
  align-items: center;
  display: flex;
  padding: 8px;
}

.copy-info-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.copy-info>.copy-info-wrapper>img {
  box-shadow: -1px 2px 2px #666;
  height: 45px;
  width: 30px;
}

.copy-info>.copy-info-wrapper>span {
  margin-left: 8px;
  font-size: 11pt;
}

/* fim: BIBLIOTECA */

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

<script type="text/javascript" src="../js/TelaPerfil.js"></script>
