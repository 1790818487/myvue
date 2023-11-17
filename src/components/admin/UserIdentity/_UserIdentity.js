// @vue/component
export default {
  name: 'Useridentity',

  components: {},

  mixins: [],

  props: {},

  data () {
    return {
      customHeader:{
        token:localStorage.getItem('token')
      }
    }
  },

  computed: {},

  watch: {},

  created () {},

  methods: {
    successAfter(response, file, fileList){
      console.log(response)
      console.log(file)
      console.log(fileList)
      return file;
    }
  }
}
