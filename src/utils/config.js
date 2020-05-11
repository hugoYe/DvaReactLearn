module.exports = {
  siteName: "HNMobi AD",
  copyright: "© Copyright 2020 By HNMobi AD Tech.",
  logoPath: "/logo.svg",
  apiPrefix: "/api/v1",
  fixedHeader: false, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: "primary",
      include: [/.*/],
      exlude: [/(\/(en|zh))*\/login/]
    }
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      {
        key: "en",
        title: "English",
        flag: "/america.svg"
      },
      {
        key: "zh",
        title: "中文",
        flag: "/china.svg"
      }
    ],
    defaultLanguage: "zh"
  }
};
