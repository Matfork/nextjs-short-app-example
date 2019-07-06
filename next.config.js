require('dotenv').config();

const path = require('path');
const Dotenv = require('dotenv-webpack');
const withTypescript = require('@zeit/next-typescript');
const withSass = require('@zeit/next-sass');

// fix: prevents error when .css|.less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.css'] = file => {};
  require.extensions['.less'] = file => {};
}

module.exports = withSass(
  withTypescript({
    publicRuntimeConfig: {
      localeSubpaths:
        typeof process.env.LOCALE_SUBPATHS === 'string'
          ? process.env.LOCALE_SUBPATHS
          : 'none'
    },
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      };
    },
    webpack: (config, options) => {
      // Fixes npm packages that depend on `fs` module
      config.node = {
        fs: 'empty'
      };

      config.plugins.push(
        // Read the .env file
        new Dotenv({
          path: path.join(__dirname, '.env'),
          systemvars: true
        })
      );

      return config;
    }
  })
);
