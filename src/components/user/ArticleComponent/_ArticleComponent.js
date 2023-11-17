// @vue/component
import axios from "axios";

var a = 0;
var b = 0
export default {
    name: 'Articlecomponent',

    components: {},

    mixins: [],

    props: {},

    data() {
        return {
            dialogVisible: false,
            formData: {
                status: 1,
                title: '',
                channelId: '',
                images: [],
                type: 1,
                publishTime: '',
                labels: '',
                content: [
                    {
                        type: 'text',
                        value: ''
                    }
                ]
            },
            optionsList: [],
            customHeader: {
                token: localStorage.getItem('token'),
                user_id: JSON.parse(localStorage.getItem('User')).id
            },

        }
    },

    computed: {},

    watch: {},

    created() {
        this.showChannel()
    },

    methods: {
        changeStatus(){
            this.formData.status=0
            this.dialogVisible = true
            this.$refs.upload.submit();
        },
        error_after(err, file) {
            this.$message.error(file.name + '上传失败')
        },
        change_after(file, fileList) {
            a = fileList.length
        },
        successAfter(response) {
            b = b + 1
            //先上传图片,图片成功得到的了地址再继续
            this.formData.images.push(response.data)
            this.formData.content.push(
                {
                    type: 'image',
                    value: response.data
                }
            )
            if (a == b)
                this.addMaterial()
        },
        submitUpload() {
            this.dialogVisible = true
            this.$refs.upload.submit();
        },
        showChannel() {
            axios.get('http://localhost:6002/api/material/v1/channel',
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                        'user_id': this.customHeader.user_id
                    }
                }).then(
                r => {
                    this.optionsList = r.data.data
                }
            )
        },
        addMaterial() {

            axios.post('http://localhost:6002/api/wmnews/v1/add-wm-news', this.formData,
                {
                    headers: {
                        'token': localStorage.getItem('token'),
                        'user_id': this.customHeader.user_id
                    }
                }).then(
                r => {
                    if (r.data.code == 200) {
                        if (r.headers.has('REF_TOKEN')) {
                            console.log(r.headers.get('REF_TOKEN'))
                            localStorage.setItem('token', r.headers.get('REF_TOKEN'))
                        }
                        this.$message.success('添加成功,请等待审核通过')
                        this.dialogVisible = false
                    }
                    if (r.data.code <= 52 && r.data.code >= 50) {
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
                }
            ).catch(e => {
                console.log(e)
                this.dialogVisible = false
            })
        }
    }
}
