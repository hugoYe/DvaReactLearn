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
  getUserDict: "/user/getUserDict",

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
  deleteIncome: "DELETE /income",
  updateIncome: "PUT /income",
  getUserAndChannelDict: "/income/getUserAndChannelDict",

  downloadReport: "/reports/exportEverydayIncome",

  queryDashboard: "/dashboard",

  //--------------- 以下为广告业务相应接口 ---------------//
  queryAdvertisersList: "/advertiser/getAdvertiserList",
  createAdvertiser: "POST /advertiser",
  deleteAdvertiser: "DELETE /advertiser",
  updateAdvertiser: "PUT /advertiser",
  getAdvertiserDict: "/advertiser/getAdvertiserDict",

  queryCustomersList: "/customer/getCustomerList",
  createCustomer: "POST /customer",
  deleteCustomer: "DELETE /customer",
  updateCustomer: "PUT /customer",
  getCustomerDict: "/customer/getCustomerDict"
};
