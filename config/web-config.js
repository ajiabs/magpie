let dev = {
  db:{
    DB_PATH:"mongodb://127.0.0.1:27017/magpie_default",
    secret:'meansecure'
  },
  app: {
    PORT: 4000
  }
};
let prod = {
  db:{
    DB_PATH:"mongodb://127.0.0.1:27017/magpie_default",
    secret:'meansecure'
  },
  app: {
    PORT: 4001
  }
};
let staging = {
  db:{
    DB_PATH:"mongodb://127.0.0.1:27017/magpie_default",
    secret:'meansecure'
  },
  app: {
    PORT: 4002
  }
};
let config = "";
switch (process.env.NODE_APP_STAGE) {
  case 'production':
    config = prod;
    break;
  case 'development':
    config = dev;
    break;
  case 'staging':
    config = staging;
    break;
  default:
    config = dev;

}


module.exports = {
  ...config
};