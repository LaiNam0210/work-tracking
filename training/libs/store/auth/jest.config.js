module.exports = {
  name: 'store-auth',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/store/auth',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js'
  ]
};
