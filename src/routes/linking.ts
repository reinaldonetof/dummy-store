export const linking = {
  prefixes: ["dummystore://"],
  config: {
    screens: {
      Home: {
        path: "home",
      },
      Detail: {
        path: "detail/:productId",
      },
    },
  },
};
