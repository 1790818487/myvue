// @vue/component
import axios from "axios";

export default {
    name: 'Sensitivecomponent',

    components: {},

    mixins: [],

    props: {},

    data() {
        return {
            formData: {
                page: 1,
                size: 5,
                name: ''
            },
            dataList: [],
            pageInfo: {},
            name: ''
        }
    },

    computed: {},

    watch: {},

    created() {
        this.init()
    },

    methods: {
        pageinfo(page) {
            this.formData.page = page
            this.init()
        },
        pagesizeinfo(size) {
            this.formData.size = size
            this.init()
        },
        init() {
            axios.post('http://localhost:6001/api/v1/sensitive/sensitive', this.formData,
                {headers: {'token': localStorage.getItem('token')}}).then(
                r => {
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
                        localStorage.setItem('token', r.headers.get('REF_TOKEN'))
                    this.dataList = r.data.data
                    this.pageInfo = r.data
                }
            )
        },
        addSensitive() {
            axios.post('http://localhost:6001/api/v1/sensitive/addSensitive',
                {'name': this.name},
                {headers: {'token': localStorage.getItem('token')}}).then(
                r => {
                    if (r.data.code === 200) {
                        this.$message({
                            message: r.data.errorMessage,
                            type: 'success'
                        });
                        this.name = ''
                        this.init()
                    }
                    else
                    {
                        this.$message({
                            message: r.data.errorMessage,
                            type: 'warning'
                        });
                    }

                }
            )
        },
        delById(id) {
            axios.delete('http://localhost:6001/api/v1/sensitive/' + id,
                {headers: {'token': localStorage.getItem('token')}}).then(
                r => {
                    if (r.data.code === 200) {
                        this.init()
                        this.$message({
                            message: r.data.errorMessage,
                            type: 'success'
                        });
                    } else
                        this.$message({
                            message: r.data.errorMessage,
                            type: 'warning'
                        });
                }
            )
        }
    }
}
