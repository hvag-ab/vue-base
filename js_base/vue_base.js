export default {
    data() {
        return {
            frontPoints: 0
        }
    },
    components: { // 组件
    },
    computed: { // 计算
        points() {
            return this.frontPoints + 2
        }
    },
    methods: { // 方法事件
        myhvag(val){
            return this.frontPoints + val
        }
    },
    watch: {
        // 对象具体属性的watch可以直接用引号把属性括起来
        '$route.params.id'(newValue, oldValue) {
            console.log(newValue)
        },
        // 监听具体属性
        frontPoints(newValue, oldValue) {
            console.log(newValue)
        }
    },
    mounted() { // 加载完成

    },
    created() { // 创建

    }
}