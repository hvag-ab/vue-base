<template>
    <div style="color:red;">test:{{test}}</div>
</template>


<script>
import { test_get } from '@/api/test'

export default {
    name:'python',
    data(){
        return {
            test : null
        }
    },
    methods:{
        async get_data(){
            const res = await test_get({id:1})
            console.log(res)
            this.test = res.task_id
        }
    },
    mounted(){
        console.log("xxxxx")
        this.get_data()
    }
}
</script>


