<template>
<div id="main-wrapper">
  <div id="start-book-container">
    <div class="start-book-card" v-for="book in books" v-bind:key="book.id">
      <img v-if="book.image" v-bind:src="book.image.cloudImage">
      <img v-if="!book.image" src="https://res.cloudinary.com/escambook/image/upload/v1573856107/coverpic/default-coverpic.jpg">
      <div class="start-book-info-container">
        <div class="start-book-info">
          <span class="start-book-title">{{book.title}}</span>
          <span class="start-book-author">{{book.author}}</span>
          <span v-if="book.edition" class="start-book-edition">{{book.edition}}ª Edição</span>
          <span v-if="book.publisher" class="start-book-edition">{{book.publisher}}</span>
          <span v-if="book.publisher" class="start-book-edition">ISBN13: {{book.isbn}}</span>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style>
#book-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 100vw;
}

.start-book-card {
  background-color: #eee;
  box-shadow: -1px 2px 2px #666;
  display: flex;
  justify-content: space-evenly;
  margin-top: 8px;
  padding: 12px;
}

.start-book-card img {
  box-shadow: -4px 6px 4px #666;
  height: 135px;
  width: 90px;
}

.start-book-info-container {
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 6px;
  width: 60%;
}

.start-book-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  text-align: left;
  margin-left: 6px;
}

.start-book-title {
  font-size: 13pt;
  font-weight: 700;
}

.start-book-author {
  font-size: 13pt;
  font-style: italic;
}

.start-book-edition {
  color: #444;
  font-size: 11pt;
  font-style: italic;
}
</style>

<script type="text/javascript" src="../js/TelaInicial.js"></script>
