export default {
  queryRouteList: "/routes",

  queryUserInfo: "/user/getUserInfo",
  logoutUser: "/user/logout",
  loginUser: "POST /user/login",

  queryUser: "/user/getUser/:id",
  queryUserList: "/user/getUsers",
  updateUser: "PUT /user",
  createUser: "POST /user",
  removeUser: "DELETE /user/:id",
  removeUserList: "POST /users/delete",

  // Channels
  getAllChannelName: "/channel/getAllChannelName",
  getChannels: "/channel/getChannels",
  addChannel: "POST /channel",
  updateChannel: "PUT /channel",
  deleteChannel: "DELETE /channel",
  deleteChannelBatch: "DELETE /channel/deleteChannelBatch",

  queryPostList: "/income",

  queryDashboard: "/dashboard"
};
