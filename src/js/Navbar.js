import axios from 'axios'
import { router } from '../router';

export default {
  data() {
    return {
      isLogged: this.checkIfIsLogged(),
      name: null,
      token: localStorage.getItem('x-auth-token') || null
    }
  },

  created() {
    this.$bus.$on('loggedIn', () => {
      this.isLogged = this.checkIfIsLogged();
    });
  },

  methods: {

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

    getUserName() {
      axios
        .get('http://localhost:3900/api/users/me', { headers: { 'x-auth-token': this.token } })
        .then((res) => {
          this.name = res.data.user.name.split(' ')[0];
        })
        .catch((err) => {
          localStorage.removeItem('x-auth-token');
          console.log(err);
        });
    },

    logout() {
      localStorage.removeItem('x-auth-token');
      this.isLogged = this.checkIfIsLogged();
      this.name = null;
      this.token = null;
      router.push("/");
    },

    slideToggle() {
      const slider = document.getElementById("nav-slide");
      if (!this.name) {
        this.name = this.getUserName();
      }
      slider.style.height = window.innerHeight - 68 + "px";
      if (slider.style.left == "0px") {
        slider.style.left = "-91%";
      }
      else {
        slider.style.left = "0px";
      }
    }

  }

}
