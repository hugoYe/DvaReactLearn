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
  queryChannelList: "/channels/queryChannelList",
  createChannel: "POST /channels/createChannel",
  updateChannel: "Patch /channels/updateChannel",
  removeChannel: "DELETE /channels/removeChannel",
  removeChannelList: "POST /channels/removeChannelList",

  queryPostList: "/income",

  queryDashboard: "/dashboard"
};
