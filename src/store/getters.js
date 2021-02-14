const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.user.avatar,
  name: state => state.user.user.username,
  roles: state => state.user.roles,
  permission_routes: state => state.permission.routes,
  fixedHeader: state => state.settings.fixedHeader,
  needTagsView: state => state.settings.tagsView,
  cachedViews: state => state.tagsView.cachedViews,
  visitedViews: state => state.tagsView.visitedViews
}
export default getters
