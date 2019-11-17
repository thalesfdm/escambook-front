import axios from 'axios'

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
      let vue = this;
      axios
        .get('http://localhost:3900/api/books')
        .then((res) => {
          vue.books = res.data.books;
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }

}
