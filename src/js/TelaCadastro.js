import axios from 'axios';
import { validate as ValidateCPF } from 'gerador-validador-cpf';
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
          'name': name.replace( "/[ãáàéèíìõóòúù]/gi", function (x) {
            this.replaceRegex(x)
          }),
          'birthDate': birthDate,
          'city': city,
          'district': district,
          'postalCode': postalCode,
          'street': street,
          'houseNumber': houseNumber,
          'phone': '55' + phone
        }, {
        "headers": {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          router.push({ name: 'TelaLogin', params: { justRegistered: true } });
        })
        .catch(e => {
          console.log( e );
          alert("Um ou mais campos inválidos!");
        });
    },

    replaceRegex( x ){
      x = x.toLowerCase()

      switch(x){
        case 'ã':
        case 'á':
        case 'à':
          return 'a'
        case 'é':
        case 'è':
          return 'e'
        case 'í':
        case 'ì':
          return 'i'
        case 'õ':
        case 'ó':
        case 'ò':
          return 'o'
        case 'ú':
        case 'ù':
          return 'u'
      }
    }

  },

  computed: {
    //Estado dos campos dizendo se os dados presentes são válidos ou não

    emailState() {
      if (!this.form.email == ''){
        var emailRegex = new RegExp('[^@]+@[^\.]+\..+', 'gi')
        return emailRegex.test(this.form.email)
      }

      return null
    },

    passwordState(){
      if(!this.form.password == '')
        return this.form.password.length >= 4 && this.form.password.length <= 16 ? true : false

      return null
    },

    passwordCheckState(){
      if(!this.form.passwordCheck == '')
        return this.form.password === this.form.passwordCheck  ? true : false

      return null
    },

    cpfCheck(){
      if(!this.form.cpf == ''){
        var numberRegex = new RegExp('[0-9]')
        return ValidateCPF(this.form.cpf) && numberRegex.test(this.form.cpf) ? true : false
      }

      return null
    },

    birthDateCheck() {
      if (!this.form.birthDate == ''){
        var birthYear = this.form.birthDate.substring(0, 4)
        var currentYear = new Date();

        return birthYear <= currentYear.getFullYear() - 12
      }

      return null
    },

    cityCheck(){
      if(!this.form.city == '')
        return this.form.city.length >= 4 ? true : false

      return null
    },

    districtCheck() {
      if(!this.form.district == '')
        return this.form.district.length == 2 ? true : false
      
      return null
    },

    postalCodeCheck(){
      if(!this.form.postalCode == ''){
        var numberRegex = new RegExp('[0-9]')
        return this.form.postalCode.length == 8 && numberRegex.test(this.form.postalCode) ? true : false
      }
      
      return null
    },

    streetCheck(){
      if(!this.form.street == '')
        return this.form.street.length >= 4 ? true : false

      return null
    },

    houserNumberCheck(){
      if(!this.form.houseNumber == ''){
        var numberRegex = new RegExp('[0-9]')
        return numberRegex.test(this.form.houseNumber)
      }

      return null
    },

    phoneCheck(){
      if(!this.form.phone == ''){
        var numberRegex = new RegExp('[0-9]')
        return numberRegex.test(this.form.phone) && this.form.phone.length == 11 ? true : false
      }
      
      return null
    }
  }

}
