import axios from 'axios'
import { router } from '../router';

export default {
  data() {
    return {
      form: {},
      justRegistered: false
    }
  },

  beforeMount() {
    this.$bus.$emit('searchBar', false);
  },

  created() {
    if (this.$route.params.justRegistered) {
      this.justRegistered = this.$route.params.justRegistered;
    }
  },

  methods: {

    sendForm() {
      const {
        email, password
      } = this.form;
      axios.post('http://localhost:3900/api/users/login',
        {
          'email': email,
          'password': password
        }, {
        "headers": {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          localStorage.setItem('x-auth-token', res.data.token)
          this.$bus.$emit('loggedIn');
          router.push('/perfil');
        })
        .catch(e => {
          console.log(e);
        });
    }

  }

}
