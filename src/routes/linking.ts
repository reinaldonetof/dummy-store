export const linking = {
  prefixes: ["dummystore://"],
  config: {
    screens: {
      Home: {
        path: "home/:categorySlug",
      },
      Detail: {
        path: "detail/:productId",
      },
    },
  },
};
