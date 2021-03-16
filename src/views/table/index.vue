<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="tableData"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column
        class-name="status-col"
        label="Status"
        width="110"
        align="center"
      >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{
            scope.row.status
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="created_at"
        label="Display_time"
        width="200"
      >
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            @click="edit(scope.row)"
          ></el-button>
          <!-- 消息提示 -->
          <el-tooltip
            class="item"
            effect="dark"
            content="删除操作"
            placement="top"
            :enteralbe="false"
          >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="del(scope.row.id)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页区域 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="query.page"
      :page-sizes="[2, 3, 5, 10]"
      :page-size="query.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
    <!-- 编辑对话框子组件 -->
    <edit
      :title="editTitle"
      :dialogVisible="dialogEditVisible"
      @editClose="editClose"
      @submit="submit"
      @close="editClose"
    >
      <template v-slot>
        <!--此处的v-slot等同于 v-slot:default-->
        <el-form :model="editform" :rules="addFormEditRules" ref="formEditRef">
          。
          <el-form-item
            label="姓名"
            :label-width="formLabelWidth"
            prop="author"
          >
            <el-input
              v-model="editform.author"
              autocomplete="off"
              disabled
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
            <el-input v-model="editform.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
      </template>
    </edit>
  </div>
</template>

<script>
import edit from "@/components/dialog"

import { getList } from '@/api/table'
import { getlist } from '@/mixin/page'

export default {
  mixins: [getlist],
  components: {
    edit
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data () {
    return {
      listLoading: true,
      dialogEditVisible: false,
      editform: {
        id: 1,
        author: "",
        email: "",
      },
      editTitle: '编辑',
      formLabelWidth: '90px',
      addFormEditRules: {
        email: [{ required: true, message: '邮箱', trigger: 'blur' }]
      }
    }
  },
  methods: {
    async getList () {
      this.listLoading = true
      const response = await getList(this.query)
      this.tableData = response.data.items
      this.total = response.data.total
      this.listLoading = false
    },
    edit (editrow) {
      this.dialogEditVisible = true
      this.editform.id = editrow.id
      this.editform.email = editrow.email
      this.editform.author = editrow.author
      console.log(this.editform)
    },
    async del (id) {
      const confirmResult = await this.$confirm(
        "此操作将永久删除该用户, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
          // return 一行的结果 就可以不用写=>{return ..} 直接写 => ...
        }
      ).catch((err) => {
        return err
      })
      if (confirmResult !== "confirm") {
        return this.$message.info("已经取消删除")
      } else {
        this.$message.success("删除")
      }
      console.log(confirmResult);
    },
    editClose () {
      this.dialogEditVisible = false
      // 重置表单
      this.$refs.formEditRef.resetFields()
    },
    submit () {
      console.log(this.editform)
      // 提交参数的时候 需要valid验证 当为true的时候才能添加用户
      this.$refs.formEditRef.validate(async (valid) => {
        console.log(valid)
        if (!valid) return
        this.$message.success('编辑成功')
      this.dialogEditVisible = false
      this.getList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.el-pagination {
  transform: translateY(50%);
}
</style>
