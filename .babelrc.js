const { NODE_ENV } = process.env;

module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: NODE_ENV === 'test' ? 'auto' : false,
      },
    ],
  ],
};
