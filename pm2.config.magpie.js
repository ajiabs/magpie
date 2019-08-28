module.exports = {
apps : [{
name: "magpie",
script: "./magpie_server.js",
env: {
NODE_APP_STAGE: "development",
},
env_production: {
NODE_APP_STAGE: "production",
},
env_staging: {
NODE_APP_STAGE: "staging",
}
}]
}
