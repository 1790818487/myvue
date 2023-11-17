// @vue/component
import axios from "axios";

var userId = ''
export default {
    name: 'Usermaterial',

    components: {},

    mixins: [],

    props: {},

    data() {
        return {
            dataList: [],
            formData: {
                page: 1,
                size: 5
            },
            pageInfo: {},
            customHeader: {
                token: localStorage.getItem('token'),
                user_id: userId
            },
            check_size:true
        }
    },

    computed: {},

    watch: {},

    created() {
        this.init()
    },

    methods: {
        init() {
            userId = this.$route.params.userId
            axios.post('http://localhost:6002/api/material/v1/show', this.formData,
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                        'user_id': userId
                    }
                }).then(
                r => {
                    if (r.data.code !==200) {
                        this.$message({
                            message: r.data.errorMessage + ',请重新登录',
                            type: 'warning'
                        });
                        localStorage.removeItem('User')
                        localStorage.removeItem('nickname')
                        localStorage.removeItem('salt')
                        localStorage.removeItem('token')
                        this.$router.push('/')
                    }

                    if (r.headers.has('REF_TOKEN')) {
                        console.log(r.headers.get('REF_TOKEN'))
                        localStorage.setItem('token', r.headers.get('REF_TOKEN'))
                    }

                    if (r.data.data.length===0)
                    {
                        this.check_size=false
                        this.$message.warning('没有更多了')
                        return
                    }
                    for (const rElement of r.data.data) {
                        this.dataList.push(rElement)
                    }
                    this.pageInfo = r.data
                }
            )
        },
        successAfter(response) {

        },
        pagesizeinfo(size){
            this.formData.size=size
            this.init()
        },
        pageinfo(page){
            if (this.check_size) {
                this.formData.page = page
                this.init()
            }else
                this.$message.warning('没有更多了')

        }
    }
}
