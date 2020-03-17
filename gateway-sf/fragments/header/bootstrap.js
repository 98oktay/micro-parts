require('ignore-styles');
require('@babel/register')({
    ignore: [ /(node_modules)/ ],
    plugins: ['@babel/plugin-proposal-class-properties'],
    presets: ['@babel/preset-env', '@babel/preset-react']
});
module.exports = require('./server.jsx');
