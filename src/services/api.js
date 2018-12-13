export default {
  queryRouteList: "/routes",

  queryUserInfo: "/user/getUserInfo",
  logoutUser: "/user/logout",
  loginUser: "POST /user/login",

  queryUser: "/user/getUser/:id",
  queryUserList: "/user/getUsers",
  updateUser: "Patch /user/:id",
  createUser: "POST /user/:id",
  removeUser: "DELETE /user/:id",
  removeUserList: "POST /users/delete",

  // Channels
  getChannel: "/channel",
  getAllChannel: "/channel/getAllChannel",
  addChannel: "POST /channel",
  updateChannel: "PUT /channel",
  deleteChannel: "DELETE /channel",
  deleteChannelBatch: "DELETE /channel/deleteChannelBatch",

  queryPostList: "/income",

  queryDashboard: "/dashboard"
};
