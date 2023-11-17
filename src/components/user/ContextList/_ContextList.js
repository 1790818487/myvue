// @vue/component
import axios from "axios";

var userId;
export default {
    name: 'Contextlist',

    components: {},

    mixins: [],

    props: {},

    data() {
        return {

            formData: {
                status: -1,
                keyword: '',
                channelId: '',
                beginPubDate: '',
                endPubDate: '',
                page: 1,
                size: 5
            },
            optionsList: [],
            dataList: [],
            pageInfo: {},
            date_picker: []
        }
    },

    computed: {},

    watch: {},

    created() {
        this.showChannel()
        this.init()
    },

    methods: {
        pagesizeinfo(size) {
            this.formData.size = size
            this.init()
        },
        pageinfo(page) {
            this.formData.page = page
            this.init()
        },

        like_query() {
            this.formData.page = 1
            this.formData.size = 5
            this.init()
        },

        changeDate(val) {
            this.formData.beginPubDate = val[0]
            this.formData.endPubDate = val[1]
        },
        init() {
            if (this.date_picker == null) {
                this.formData.beginPubDate = ''
                this.formData.endPubDate = ''
            }
            userId = this.$route.params.userId
            axios.post('http://localhost:6002/api/wmnews/v1/context', this.formData,
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                        'user_id': userId
                    }
                }).then(
                r => {
                    if (r.data.code >= 50 && r.data.code <= 52) {
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
        showChannel() {
            axios.get('http://localhost:6002/api/material/v1/channel',
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                        'userId': userId
                    }
                }).then(
                r => {
                    this.optionsList = r.data.data
                }
            )
        },
        delMaterialById(id) {
            this.$confirm('此操作将永久删除该文章,已发布的情况将下架, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                axios.delete('http://localhost:6002/api/wmnews/v1/delWmNews/' + id,
                    {
                        headers: {
                            'token': localStorage.getItem('token'),
                            'userId': userId
                        }
                    }
                ).then(r => {
                    if (r.data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: r.data.errorMessage
                        });
                        this.init()
                    } else
                        this.$message({
                            type: 'error',
                            message: r.data.errorMessage
                        });
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        }
    }
}
