import axios from 'axios'
import { router } from '@/router'
import { sampleSize, shuffle } from 'lodash'

export default {
  data() {
    return {
      addBook: [],
      books: {},
      isLogged: this.checkIfIsLogged()
    }
  },

  beforeMount() {
    this.getAllBooks();
    this.$bus.$emit('searchBar', true);
  },

  created(){
    this.$bus.$on('searchString', (value)=> { 
      this.searchString = value;
      this.getBooks();
    });
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

    checkIfIsLogged() {
      const token = localStorage.getItem('x-auth-token');
      if (token) {
        this.token = token;
        return true;
      } else {
        this.token = null;
        return false;
      }
    },

    getAllBooks() {
      this.isLogged = this.checkIfIsLogged()
      axios
        .get('http://localhost:3900/api/books')
        .then((res) => {
          let books = res.data.books;
          // books = sampleSize(books, 8);
          books = shuffle(books);
          this.books = books;
        })
        .catch((err) => {
          console.log(err);
        });
    },

    getBookCopies(bookId) {
      router.push({ name: 'TelaPerfil', params: { bookId } });
    },

    getBooks(){
      axios
        .get(`http://localhost:3900/api/books/search/all/${this.searchString}`)
        .then((res) => {
          this.books = res.data.books;
        })
        .catch((err) => {
          this.books = {};
          console.log(err);
        });
    }

  }

}
