const path = require("path");
const { withSentryConfig } = require("@sentry/nextjs");
const SentryWebpackPlugin = require("@sentry/webpack-plugin");

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
  configureWebpack: {
    plugins: [
      new SentryWebpackPlugin({
        // sentry-cli configuration
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: process.env.SENTRY_ORG,
        project: process.env.SENTRY_PROJECT,
        release: process.env.VERCEL_GIT_COMMIT_SHA,

        // webpack specific configuration
        include: ".",
        ignore: ["node_modules", "webpack.config.js"],
      }),
    ],
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
  silent: true,
};

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(moduleExports, SentryWebpackPluginOptions);
