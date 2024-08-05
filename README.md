# process-conditional-compilation-loader

处理uniapp条件编译loader


## Installation

```sh
npm install process-conditional-compilation-loader --save-dev
```
## Usage
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader:'process-conditional-compilation-loader',
          }
        ]
      }
    ]
  }
};
```

