import axios from 'axios'
import { router } from '@/router'
import { groupBy, sortBy } from 'lodash'

export default {
  data() {
    return {
      addBook: [],
      bookCopies: {},
      bookCopiesLength: null,
      bookSwap: {},
      books: {},
      copies: {},
      ordenarBiblioteca: 'A',
      ordenarBusca: 'A',
      pending: {},
      pendingMine: {},
      pendingSwaps: 'O',
      removeBook: [],
      searchString: '',
      sectionTitle: 'Minha Biblioteca',
      token: localStorage.getItem('x-auth-token') || null,
      user: {},
      viewLibrary: true,
      viewPending: false,
      viewSearch: false,
      viewSwap: false
    }
  },

  beforeMount() {
    this.user = this.getUser();
    this.$bus.$emit('searchBar', false);
  },

  created() {
    if (this.$route.params.bookId) {
      this.getBookCopies(this.$route.params.bookId);
    }
  },

  watch: {

    ordenarBiblioteca: function (val) {
      if (val === 'A') {
        this.copies = sortBy(this.copies, ['book.author']);
      } else if (val === 'T') {
        this.copies = sortBy(this.copies, ['book.title']);
      }
    },

    ordenarBusca: function (val) {
      if (val === 'A') {
        this.books = sortBy(this.books, ['author']);
      } else if (val === 'T') {
        this.books = sortBy(this.books, ['title']);
      }
    }

  },

  methods: {

    acceptSwap(swapId) {
      axios
        .put(`http://localhost:3900/api/swaps/${swapId}/accept`, {},
          { headers: { 'x-auth-token': this.token } })
        .then((res) => {
          this.getPending();
          alert('Solicitação aceita!');
        })
        .catch((err) => {
          console.log(err);
        })
    },

    addCopy(bookId) {
      axios
        .post('http://localhost:3900/api/users/books/add',
          {
            bookId,
            condition: 'Exemplar em boas condições'
          }
          , { headers: { 'x-auth-token': this.token } })
        .then((res) => {
          this.addBook.push(`add-book-${bookId}`);
        })
        .catch((err) => {
          console.log(err);
        })
    },

    deleteCopy(copyId) {
      axios
        .delete(`http://localhost:3900/api/users/books/${copyId}`,
          { headers: { 'x-auth-token': this.token } })
        .then((res) => {
          this.removeBook.push(`remove-book-${copyId}`);
        })
        .catch((err) => {
          console.log(err);
        })
    },

    cancelSwap(swapId) {
      axios
        .put(`http://localhost:3900/api/swaps/${swapId}/cancel`, {},
          { headers: { 'x-auth-token': this.token } })
        .then((res) => {
          if (this.pendingSwaps === 'M') {
            this.getPendingMine();
            alert('Solicitação cancelada!');
          }
          else {
            this.getPending();
            alert('Solicitação rejeitada!');
          }
        })
        .catch((err) => {
          console.log(err);
        })
    },

    getBookCopies(bookId) {
      axios
        .get(`http://localhost:3900/api/users/books/${bookId}`)
        .then((res) => {
          this.bookCopiesLength = res.data.copies.length;
          this.bookCopies = groupBy(res.data.copies, 'user.id');
          this.getBookSwap(bookId);
          this.showSwap();
        })
        .catch((err) => {
          this.bookCopies = {};
          console.log(err);
        });
    },

    getBookSwap(bookId) {
      axios
        .get(`http://localhost:3900/api/books/${bookId}`)
        .then((res) => {
          this.bookSwap = res.data.book;
        })
        .catch((err) => {
          this.bookSwap = {};
          console.log(err);
        });
    },

    getBooks() {
      axios
        .get(`http://localhost:3900/api/books/search/all/${this.searchString}`)
        .then((res) => {
          this.addBook = [];
          this.books = res.data.books;
          if (this.ordenarBusca === 'A') {
            this.books = sortBy(this.books, ['author']);
          } else if (this.ordenarBusca === 'T') {
            this.books = sortBy(this.books, ['title']);
          }
          if (this.viewSwap) this.showSearch();
        })
        .catch((err) => {
          this.books = {};
          console.log(err);
        });
    },

    getPending() {
      axios
        .get('http://localhost:3900/api/swaps/pending/', { headers: { 'x-auth-token': this.token } })
        .then((res) => {
          this.pending = res.data.swaps;
        })
        .catch((err) => {
          console.log(err);
        })
    },

    getPendingMine() {
      axios
        .get('http://localhost:3900/api/swaps/pending/mine', { headers: { 'x-auth-token': this.token } })
        .then((res) => {
          this.pendingMine = res.data.swaps;
        })
        .catch((err) => {
          console.log(err);
        })
    },

    getUserCopies(id) {
      axios
        .get(`http://localhost:3900/api/users/${id}/books`, { headers: { 'x-auth-token': this.token } })
        .then((res) => {
          this.copies = res.data.user.books;
          if (this.ordenarBiblioteca === 'A') {
            this.copies = sortBy(this.copies, ['book.author']);
          } else if (this.ordenarBiblioteca === 'T') {
            this.copies = sortBy(this.copies, ['book.title']);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getUser() {
      axios
        .get('http://localhost:3900/api/users/me', { headers: { 'x-auth-token': this.token } })
        .then((res) => {
          this.user = res.data.user;
          this.copies = this.getUserCopies(this.user.id);
          this.pending = this.getPending();
          this.pendingMine = this.getPendingMine();
        })
        .catch((err) => {
          localStorage.removeItem('x-auth-token');
          console.log(err);
        });
    },

    showLibrary() {
      this.copies = this.getUserCopies(this.user.id);
      this.removeBook = [];
      this.sectionTitle = 'Minha Biblioteca';
      this.viewLibrary = true;
      this.viewPending = false;
      this.viewSearch = false;
      this.viewSwap = false;
    },

    showPending() {
      this.sectionTitle = 'Notificações';
      this.viewLibrary = false;
      this.viewPending = true;
      this.viewSearch = false;
      this.viewSwap = false;
    },

    showSearch() {
      this.addBook = [];
      this.sectionTitle = 'Buscar Livros';
      this.viewLibrary = false;
      this.viewPending = false;
      this.viewSearch = true;
      this.viewSwap = false;
    },

    showSwap() {
      this.sectionTitle = 'Buscar Cópias';
      this.viewLibrary = false;
      this.viewPending = false;
      this.viewSearch = false;
      this.viewSwap = true;
    },

    startSwap(copy, book) {
      router.push({ name: 'TelaTroca', params: { copy, book } });
    }

  }

}
