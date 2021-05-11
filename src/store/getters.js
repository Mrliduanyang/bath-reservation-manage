const getters = {
  sidebar: (state) => state.app.sidebar,
  size: (state) => state.app.size,
  visitedViews: (state) => state.tagsView.visitedViews,
  cachedViews: (state) => state.tagsView.cachedViews,
  token: (state) => state.user.token,
  username: (state) => state.user.username,
  realName: (state) => state.user.realName,
  role: (state) => state.user.role,
  avatar: (state) => state.user.avatar,
  permissionRoutes: (state) => state.permission.routes,
  addRoutes: (state) => state.permission.addRoutes,
  errorLogs: (state) => state.errorLog.logs,
  person: (state) => state.user.person
}
export default getters
