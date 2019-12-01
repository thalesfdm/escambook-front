import axios from 'axios'
import { router } from '../router'

export default {
    data() {
        return {
            form: {},
            token: localStorage.getItem('x-auth-token') || null
        }
    },

    beforeMount() {
        this.$bus.$emit('searchBar', false);
    },

    methods: {
        sendForm() {
            const {
                title,
                author,
                isbn,
                publisher,
                edition,
                publicationYear,
                bookLanguage
            } = this.form

            axios.post('http://localhost:3900/api/books/register', {
                'title': title,
                'author': author,
                'isbn': isbn,
                'publisher': publisher,
                'edition': edition,
                'publicationYear': publicationYear,
                'bookLanguage': bookLanguage
            }, {
                headers: {
                    'x-auth-token': this.token
                }
            })
                .then(res=>{
                    router.push({ name: 'TelaInicial', param: { justRegistered: true } })
                })
                .catch( e=>{
                    console.log(e)
                })
        }
    },

    computed: {
        isbnCheck(){
            if(!this.form.isbn == ''){
                var numberRegex = new RegExp('[0-9]')
                return numberRegex.test(this.form.isbn) && this.form.isbn.length == 11 ? true : false
            }

            return null
        },

        publicationYearCheck(){
            if(!this.form.publicationYear == ''){
                var numberRegex = new RegExp('[0-9]')
                return numberRegex.test(this.form.publicationYear) && this.form.publicationYear.length == 11 ? true : false
            }

            return null
        }
    }
}