<template>
  <div>
    <!-- 编辑对话框 去掉sync 断开和父组件的双向绑定 close调用父组件的close方法-->
    <el-dialog
      :title="title"
      :visible="dialogVisible"
      @close="$emit('close')"
    >
        <!-- 可以对插槽整体内容进行 .editform css样式 -->
      <slot class="editform">这里插入你想要的内容</slot>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="confirm">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  // 切记props里面的值不能在子组件里面改变
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    title: String
  },
  methods: {
    confirm() {
      this.$emit('submit')
    },
    cancel() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  margin-right: 80px;
}
</style>
