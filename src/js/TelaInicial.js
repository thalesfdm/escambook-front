import axios from 'axios'
import { sampleSize, shuffle } from 'lodash'

export default {
  data() {
    return {
      books: {}
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

    getAllBooks() {
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

    getBooks(){
      axios
        .get(`http://localhost:3900/api/books/search/title/${this.searchString}`)
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
