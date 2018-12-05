import { Mock, Constant } from './_utils'

const { ApiPrefix, Color } = Constant

const Dashboard = Mock.mock({
  // 'sales|8': [
  //   {
  //     'name|+1': 2008,
  //     'Clothes|200-500': 1,
  //     'Food|180-400': 1,
  //     'Electronics|300-550': 1,
  //   },
  // ],
  // cpu: {
  //   'usage|50-600': 1,
  //   space: 825,
  //   'cpu|40-90': 1,
  //   'data|20': [
  //     {
  //       'cpu|20-80': 1,
  //     },
  //   ],
  // },
  // browser: [
  //   {
  //     name: 'Google Chrome',
  //     percent: 43.3,
  //     status: 1,
  //   },
  //   {
  //     name: 'Mozilla Firefox',
  //     percent: 33.4,
  //     status: 2,
  //   },
  //   {
  //     name: 'Apple Safari',
  //     percent: 34.6,
  //     status: 3,
  //   },
  //   {
  //     name: 'Internet Explorer',
  //     percent: 12.3,
  //     status: 4,
  //   },
  //   {
  //     name: 'Opera Mini',
  //     percent: 3.3,
  //     status: 1,
  //   },
  //   {
  //     name: 'Chromium',
  //     percent: 2.53,
  //     status: 1,
  //   },
  // ],
  // user: {
  //   name: 'github',
  //   sales: 3241,
  //   sold: 3556,
  // },
  // 'completed|30': [
  //   {
  //     'name|+1': 28,
  //     'PV|25000-130000': 1,
  //     'UV|25000-130000': 1,
  //   },
  // ],
  completed: [
    {
      'name': 22,
      'pv': 0,
      'uv': 0,
    },
    {
      'name': 23,
      'pv': 0,
      'uv': 0,
    },
    {
      'name': 24,
      'pv': 0,
      'uv': 0,
    },
    {
      'name': 25,
      'pv': 0,
      'uv': 0,
    },
    {
      'name': 26,
      'pv': 234,
      'uv': 234,
    },
    {
      'name': 27,
      'pv': 534,
      'uv': 434,
    },
    {
      'name': 27,
      'pv': 1534,
      'uv': 634,
    },
    {
      'name': 28,
      'pv': 2534,
      'uv': 1034,
    },
    {
      'name': 29,
      'pv': 4534,
      'uv': 2034,
    },
    {
      'name': 30,
      'pv': 5534,
      'uv': 2355,
    },
    {
      'name': 1,
      'pv': 5790,
      'uv': 2389,
    },
    {
      'name': 2,
      'pv': 8563,
      'uv': 3389,
    },
    {
      'name': 4,
      'pv': 10563,
      'uv': 3889,
    },
    {
      'name': 5,
      'pv': 10563,
      'uv': 3889,
    },
    {
      'name': 6,
      'pv': 10593,
      'uv': 3899,
    },
    {
      'name': 7,
      'pv': 11593,
      'uv': 4899,
    },
    {
      'name': 8,
      'pv': 9593,
      'uv': 4699,
    },
    {
      'name': 9,
      'pv': 6593,
      'uv': 2899,
    },
  ],
  // 'comments|5': [
  //   {
  //     name: '@last',
  //     'status|1-3': 1,
  //     content: '@sentence',
  //     avatar() {
  //       return Mock.Random.image(
  //         '48x48',
  //         Mock.Random.color(),
  //         '#757575',
  //         'png',
  //         this.name.substr(0, 1)
  //       )
  //     },
  //     date() {
  //       return `2016-${Mock.Random.date('MM-dd')} ${Mock.Random.time(
  //         'HH:mm:ss'
  //       )}`
  //     },
  //   },
  // ],
  // 'recentSales|36': [
  //   {
  //     'id|+1': 1,
  //     name: '@last',
  //     'status|1-4': 1,
  //     date() {
  //       return `${Mock.Random.integer(2015, 2016)}-${Mock.Random.date(
  //         'MM-dd'
  //       )} ${Mock.Random.time('HH:mm:ss')}`
  //     },
  //     'price|10-200.1-2': 1,
  //   },
  // ],
  // quote: {
  //   name: 'Joho Doe',
  //   title: 'Graphic Designer',
  //   content:
  //     "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.",
  //   avatar:
  //     'http://img.hb.aicdn.com/bc442cf0cc6f7940dcc567e465048d1a8d634493198c4-sPx5BR_fw236',
  // },
  numbers: [
    {
      icon: 'dollar',
      color: Color.green,
      title: 'Yesterday Income',
      number: 2781,
    },
    {
      icon: 'area-chart',
      color: Color.grass,
      title: 'Yesterday PV',
      number: 3241,
    },
    {
      icon: 'area-chart',
      color: Color.sky,
      title: 'Yesterday UV',
      number: 2553,
    },
    // {
    //   icon: 'shopping-cart',
    //   color: Color.red,
    //   title: 'Referrals',
    //   number: 4324,
    // },
  ],
})

module.exports = {
  [`GET ${ApiPrefix}/dashboard`](req, res) {
    const response = {}
    response.data = Dashboard;
    res.json(response)
  },
}
