// @vue/component
import axios from "axios";
var userId=''
export default {
  name: 'Usermaterial',

  components: {},

  mixins: [],

  props: {},

  data () {
    return {
      dataList:[],
      formData:{
        page:1,
        size:5
      },
      pageInfo: {},
      customHeader:{
        token:localStorage.getItem('token'),
        user_id:userId
      }
    }
  },

  computed: {},

  watch: {},

  created () {
    this.init()
  },

  methods: {

    init(){
      var user_id=this.$route.params.userId
      userId=user_id
      axios.post('http://localhost:6002/api/material/v1/show', this.formData,
          {headers: {'token': localStorage.getItem('token'),'user_id':userId}
          }).then(
          r => {
            if (r.data.code >=50&&r.data.code<=52) {
              this.$message({
                message: r.data.errorMessage + ',请重新登录',
                type: 'warning'
              });
              localStorage.removeItem('token')
              localStorage.removeItem('adUser')
              this.$router.push('/login')
            }
            if (r.headers.has('REF_TOKEN'))
              localStorage.setItem('token', r.headers.get('REF_TOKEN'))
            this.dataList = r.data.data
            this.pageInfo = r.data
          }
      )
    },
    successAfter(response, file, fileList){

    }
  }
}
