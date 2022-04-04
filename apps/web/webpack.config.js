const path = require('path');

module.exports = (config, context) => {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.scss$/,
          use: [
            {
              loader: 'sass-resources-loader',
              options: {
                resources: path.resolve(__dirname, 'src', 'assets', 'scss', '*.scss'),
              },
            },
          ],
        },
      ],
    },
    devServer: {
      ...config.devServer,
      port: process.env.NX_DEV_WEB_PORT || config.devServer?.port,
    },
  };
};
