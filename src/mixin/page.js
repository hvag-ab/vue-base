
export const getlist = {
    data() {
        return {
            query: {
                search: "",
                page: 1,
                pageSize: 2,
            },
            total: 10,
            tableData: []
        }
    },
    created() {
        this.getList()
    },
    methods: {
        async getList() {
            this.tableData = []
            this.total = 10
        },
        // 监听pagesize改变事件
        handleSizeChange(newsize) {
            this.query.pageSize = newsize
            this.getList()
        },
        handleCurrentChange(newpage) {
            this.query.page = newpage
            this.getList()
        }
    }
    // 注册子组件
}

// 类似继承 相同的就直接用 可以被引用的组件重写方法 属性 覆盖