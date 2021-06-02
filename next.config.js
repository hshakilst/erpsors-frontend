// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

const { withSentryConfig } = require('@sentry/nextjs');
const SentryCliPlugin = require("@sentry/webpack-plugin");
const path = require("path");

const moduleExports = {
  // Your existing module.exports
  webpack: (config, options) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  future: {
    webpack5: true,
  },
  images: {
    domains: ["lh3.googleusercontent.com", "s.gravatar.com"],
  },

};

const SentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
  // plugins: [
  //   new SentryCliPlugin({
  //     include: ".",
  //     ignoreFile: ".sentrycliignore",
  //     ignore: ["node_modules", "webpack.config.js"],
  //     configFile: "sentry.properties",

  //   }),
  // ],
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
