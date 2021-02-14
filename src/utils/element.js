import Vue from 'vue'
// import {
//   Form, FormItem, Message, Container, Header, Aside, Main, Menu, Submenu, MenuItem, MenuItemGroup,
//   Input, Button, Card, Breadcrumb, BreadcrumbItem, Row, Col, Table, TableColumn, Switch, Tooltip,
//   Icon, Pagination, Dialog, MessageBox, Dropdown, DropdownItem, DropdownMenu, Badge, Avatar,
//   Upload, Image, Select, Option, OptionGroup
// } from 'element-ui'
import uploader from 'vue-simple-uploader'
// Vue.use(Button)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.use(Icon)
// Vue.use(Container)
// Vue.use(Header)
// Vue.use(Aside)
// Vue.use(Main)
// Vue.use(Menu)
// Vue.use(Submenu)
// Vue.use(MenuItem)
// Vue.use(MenuItemGroup)
// Vue.use(Card)
// Vue.use(Breadcrumb)
// Vue.use(BreadcrumbItem)
// Vue.use(Row)
// Vue.use(Col)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Switch)
// Vue.use(Tooltip)
// Vue.use(Pagination)
// Vue.use(Dialog)
// Vue.use(Dropdown)
// Vue.use(DropdownItem)
// Vue.use(DropdownMenu)
// Vue.use(Badge)
// Vue.use(Avatar)
// Vue.use(Upload)
// Vue.use(uploader)
// Vue.use(Image)
// Vue.use(Select)
// Vue.use(Option)
// Vue.use(OptionGroup)
// Vue.prototype.$message = Message
/*
this.$message({
    //showClose: true, 可关闭
    message: '恭喜你，这是一条成功消息',
    type: 'success' //  'warning'
});
this.$message.error('错了哦，这是一条错误消息');
*/
// Vue.prototype.$confirm = MessageBox.confirm
/*
this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true // 居中
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
*/

//import { Notification } from 'element-ui';
// Vue.prototype.$notify = Notification
/*
this.$notify({
    title: '成功',
    message: '这是一条成功的提示消息',
    type: 'success'
    // position: 'bottom-left' // 位置
});
*/

Vue.use(uploader)
