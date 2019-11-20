import axios from 'axios'
import { router } from '@/router'

export default {
  data() {
    return {
      book: {},
      category: 'T',
      copy: {},
      expiresAt: 1,
      sectionTitle: 'Solicitar Troca',
      token: localStorage.getItem('x-auth-token') || null,
      user: {}
    }
  },

  beforeMount() {
    this.user = this.getUser();
    if (!this.copy) router.push('/perfil');
    this.$bus.$emit('searchBar', false);
  },

  created() {
    this.book = this.$route.params.book;
    this.copy = this.$route.params.copy;
  },

  watch: {
    category: function (val) {
      if (val === 'T') {
        this.sectionTitle = 'Solicitar Troca';
      } else if (val === 'E') {
        this.sectionTitle = 'Solicitar Empréstimo';
      }
    }
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
    },

    swapExpiresAt(val) {
      let expiresAt = new Date();

      expiresAt.setMonth(expiresAt.getMonth() + Number(val));

      let dd = expiresAt.getDate();
      let mm = expiresAt.getMonth() + 1;
      const yyyy = expiresAt.getFullYear();

      if (dd < 10) { dd = `0${dd}`; }
      if (mm < 10) { mm = `0${mm}`; }

      return `${yyyy}-${mm}-${dd}`;
    },

    swapRequest() {
      axios
        .post('http://localhost:3900/api/swaps/start',
          {
            copyId: this.copy.id,
            category: this.category,
            expiresAt: this.swapExpiresAt(this.expiresAt)
          }
          , { headers: { 'x-auth-token': this.token } })
        .then((res) => {
          router.push('/perfil');
          alert('Solicitação enviada!');
        })
        .catch((err) => {
          console.log(err);
        });
    }

  }

}
