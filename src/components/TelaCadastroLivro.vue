<template>
    <div id="main-wrapper">
        <div id="form-container">
            <form @submit.prevent="sendForm">
                <div class="form-group">
                    <span>Informações do livro</span>
                    <b-form-input v-model="form['title']" type="text" placeholder="Título" required="true"></b-form-input>
                    <b-form-input v-model="form['author']" type="text" placeholder="Autor" required="true"></b-form-input>

                    <b-form-group id="b-form-group">
                        <b-form-input v-model="form['isbn']" type="text" maxlength="13" :state="isbnCheck" placeholder="ISBN" required="true"></b-form-input>
                        <b-form-invalid-feedback>ISBN deve ser composto de 13 números</b-form-invalid-feedback>
                    </b-form-group>

                    <b-form-group id="b-form-group">
                        <b-form-input v-model="form['publisher']" type="text" placeholder="Editora" required="true"></b-form-input>
                    </b-form-group>

                    <b-form-input v-model="form['edition']" type="text" placeholder="Edição" required="true"></b-form-input>

                    <b-form-group id="b-form-group">
                        <b-form-input v-model="form['publicationYear']" type="text" maxlength="4" :state="publicationYearCheck"  placeholder="Ano de Publicação" required="true"></b-form-input>
                    </b-form-group>

                    <b-form-input v-model="form['bookLanguage']" type="text" placeholder="Idioma" required="true"></b-form-input>
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

    #b-form-group {
        margin: 0px !important;
        text-align: left;
        font-size: 13pt
    }
</style>

<script type="text/javascript" src="../js/TelaCadastroLivro.js"></script>