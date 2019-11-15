<template>
<div id="main-wrapper">
  <div id="book-container">
    <div id="book-card" v-for="book in books" v-bind:key="book.id">
      <img v-if="book.image" v-bind:src="book.image.cloudImage">
      <img v-if="!book.image" src="https://res.cloudinary.com/escambook/image/upload/v1573856107/coverpic/default-coverpic.jpg">
      <div id="book-info">
        <span id="book-title">{{book.title}}</span>
        <span id="book-author">{{book.author}}</span>
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
}

#book-card {
  background-color: #eee;
  box-shadow: -2px 4px 2px #666;
  display: flex;
  margin-top: 18px;
  padding: 18px;
  width: 100vw;
}

#book-card img {
  box-shadow: -4px 6px 4px #666;
  width: 40%;
}

#book-info {
  display: flex;
  flex-direction: column;
  padding: 12px;
  text-align: center;
  width: 60%
}

#book-title {
  font-size: 16pt;
  font-weight: 700;
}

#book-author {
  font-size: 14pt;
  font-style: italic;
}
</style>

<script type="text/javascript" src="../js/TelaInicial.js"></script>
