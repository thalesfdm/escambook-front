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
    }

  }

}
