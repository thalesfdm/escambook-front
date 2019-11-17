import axios from 'axios'

export default {
  data() {
    return {
      addBook: [],
      books: {},
      copies: {},
      pending: {},
      searchString: '',
      removeBook: [],
      token: localStorage.getItem('x-auth-token') || null,
      user: {},
      viewLibrary: true,
      viewSearch: false,
      viewPending: false
    }
  },

  beforeMount() {
    this.user = this.getUser();
    this.$bus.$emit('searchBar', false);
  },

  methods: {

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

    getBooks() {
      axios
        .get(`http://localhost:3900/api/books/search/title/${this.searchString}`)
        .then((res) => {
          this.addBook = [];
          this.books = res.data.books;
        })
        .catch((err) => {
          this.books = {};
          console.log(err);
        });
    },

    getUserCopies(id) {
      axios
        .get(`http://localhost:3900/api/users/${id}/books`, { headers: { 'x-auth-token': this.token } })
        .then((res) => {
          this.copies = res.data.user.books;
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
        })
        .catch((err) => {
          localStorage.removeItem('x-auth-token');
          console.log(err);
        });
    },

    showLibrary() {
      this.removeBook = [];
      this.copies = this.getUserCopies(this.user.id);
      this.viewPending = false;
      this.viewSearch = false;
      this.viewLibrary = true;
    },

    showPending() {
      this.viewPending = true;
      this.viewSearch = false;
      this.viewLibrary = false;
    },

    showSearch() {
      this.addBook = [];
      this.viewPending = false;
      this.viewSearch = true;
      this.viewLibrary = false;
    }

  }

}
