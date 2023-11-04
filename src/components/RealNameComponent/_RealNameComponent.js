// @vue/component
import axios from "axios";

export default {
  name: 'Realnamecomponent',

  components: {},

  mixins: [],

  props: {},

  data () {
    return {
      status:5,
      formData:{
        page:1,
        size:5
      },
      pageInfo:{},
      dataList:[]
    }
  },

  computed: {},

  watch: {},

  created () {
    this.init()
  },

  methods: {
    pageinfo(page){
      this.formData.page=page
      this.init()
    },
    pagesizeinfo(size){
      this.formData.size=size
      this.init()
    },
    init(){
      axios.post('http://localhost:6001/api/user/ApUserRealname/'+this.status,
          this.formData,{headers:{'token':localStorage.getItem('token')}}).then(
              r=>{
                if (r.data.code !== 200) {
                  this.$message({
                    message: r.data.errorMessage + ',请重新登录',
                    type: 'warning'
                  });
                  localStorage.removeItem('token')
                  localStorage.removeItem('adUser')
                  this.$router.push('/login')
                }
                if (r.headers.has('REF_TOKEN'))
                  localStorage.setItem('token', r.headers.REF_TOKEN)
                this.dataList = r.data.data
                this.pageInfo = r.data
              }
      )
    }
  }
}
