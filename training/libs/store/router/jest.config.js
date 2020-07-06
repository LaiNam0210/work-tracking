module.exports = {
  name: 'store-router',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/store/router',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
