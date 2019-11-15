import axios from 'axios'

export default {
  data() {
    return {
      token: localStorage.getItem('x-auth-token') || null,
      user: {}
    }
  },

  beforeMount() {
    this.user = this.getUser();
  },

  methods: {

    getUser() {
      axios
        .get('http://localhost:3900/api/users/me', { headers: { 'x-auth-token': this.token } })
        .then((res) => {
          this.user = res.data.user;
        })
        .catch((err) => {
          localStorage.removeItem('x-auth-token');
          console.log(err);
        });
    }

  }

}
