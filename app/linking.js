const config = {
  screens: {
    Splash: {
      path: 'Splash',
    },
    Home: {
      path: 'Home',
    },
    Profile: {
      path: 'Profile',
    },
    Login: {
      path: 'Login',
    },
    Main: {
      path: 'Main',
    },
    Catalog: {
      path: 'Catalog',
    },
    Product: {
      path: 'Product/:id',
      parse: {
        id: (id) => `${id}`,
      },
    },
    Cart: {
      path: 'Cart',
    },
    Gifts: {
      path: 'Gifts',
    },
    GiftDetails: {
      path: 'GiftDetails',
    },
    ProductSummary: {
      path: 'ProductSummary',
    },
    GiftSummary: {
      path: 'GiftSummary',
    },
    OrdersHistory: {
      path: 'OrdersHistory',
    },
    Notifications: {
      path: 'Notifications',
    },
  },
};

const linking = {
  prefixes: ['iwalane://app'],
  config,
};

export default linking;
