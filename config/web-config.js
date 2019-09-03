let dev = {
  db:{
    DB_PATH:"mongodb://127.0.0.1:27017/magpie_default",
    secret:'meansecure'
  },
  app: {
    PORT: 4000,
    BUILD_PATH:"bldfiles_dev"
  }
};
let prod = {
  db:{
    DB_PATH:"mongodb://{username}:{password}@{host}:27017/{database}?authMechanism=SCRAM-SHA-1",
    secret:'{secret}'
  },
  app: {
    PORT: "{port}",
    BUILD_PATH:"{build_path}"
  }
};
let staging = {
  db:{
    DB_PATH:"mongodb://{username}:{password}@{host}:27017/{database}?authMechanism=SCRAM-SHA-1",
    secret:'{secret}'
  },
  app: {
    PORT: "{port}",
    BUILD_PATH:"{build_path}"
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
