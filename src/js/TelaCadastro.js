import axios from 'axios'
import { router } from '../router';

export default {
  data() {
    return {
      form: {}
    }
  },

  beforeMount() {
    this.$bus.$emit('searchBar', false);
  },

  methods: {

    sendForm() {
      const {
        email,
        password,
        cpf,
        name,
        birthDate,
        city,
        district,
        postalCode,
        street,
        houseNumber,
        phone
      } = this.form;
      axios.post('http://localhost:3900/api/users/register',
        {
          'email': email,
          'password': password,
          'cpf': cpf,
          'name': name,
          'birthDate': birthDate,
          'city': city,
          'district': district,
          'postalCode': postalCode,
          'street': street,
          'houseNumber': houseNumber,
          'phone': phone
        }, {
        "headers": {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          router.push({ name: 'TelaLogin', params: { justRegistered: true } });
        })
        .catch(e => {
          console.log(e);
        });
    }

  }

}
