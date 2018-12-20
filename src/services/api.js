export default {
  queryRouteList: "/routes",

  queryUserInfo: "/user/getLogonUserInfo",
  logoutUser: "/user/logout",
  loginUser: "POST /user/login",

  queryUser: "/user/getUser/:id",
  queryUserList: "/user/getUsers",
  updateUser: "PUT /user",
  createUser: "POST /user",
  removeUser: "DELETE /user/:id",
  removeUserList: "DELETE /user/deleteUserBatch",
  editUser: "POST /user/editUser",

  // Channels
  getChannelDict: "/channel/getChannelDict",
  getChannels: "/channel/getChannels",
  addChannel: "POST /channel",
  updateChannel: "PUT /channel",
  deleteChannel: "DELETE /channel",
  deleteChannelBatch: "DELETE /channel/deleteChannelBatch",

  // income
  queryIncomeList: "/income",
  addIncome: "POST /income",

  queryDashboard: "/dashboard"
};
