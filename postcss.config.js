const path = require('path');

module.exports = {
  plugins: [
    'postcss-flexbugs-fixes',
    [
      'postcss-preset-env',
      {
        autoprefixer: {
          flexbox: 'no-2009'
        },
        stage: 3,
        features: {
          'custom-properties': false
        }
      }
    ],
    [
      'postcss-mixins',
      {
        mixinsDir: path.join(__dirname, 'styles')
      }
    ],
    'postcss-simple-vars',
    'postcss-nested',
    'autoprefixer'
  ]
}
