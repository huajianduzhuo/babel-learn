# babel

babel 使用：[https://babeljs.io/docs/en/usage](https://babeljs.io/docs/en/usage)

babel包含

* plugin： 新语法的转换（如箭头函数等）
* polyfill：新增feature的polyfill（如Promise、Array.from等）

## plugin 和 preset

每一个新的语法用一个 plugin 来转换。

preset 用来提前定义好包含多个 plugin 的集合。

preset-env 是一个智能的preset，它可以根据 
.browserslist 中定义的需要兼容到的环境，从内置的mapping中解析出一个plugin list。

> preset-env 不支持 stage-x plugins。

### 使用 stsge-x plugin

需要使用 stage-0 到 stage-3 的 plugin 时，需要自己引入依赖的 plugin，并且在配置文件中配置。如使用 `obj::fn()` 这种语法时，需要引入 `@babel/plugin-proposal-function-bind`，并且添加配置：

```json
{
  "plugins": [
    "@babel/plugin-proposal-function-bind"
  ]
}
```

## polyfill

polyfill 用来支持一些新的类型和新的方法。如 Promise、Array.from、Symbol等。

使用 polyfill 有两种方式：

### 使用 @babel/polyfill

@babel/polyfill 包含了所有需要的polyfill（stage-4以下），使用这种方式，需要在代码的入口文件处，通过 `require("@babel/polyfill")` 引入polyfill。

> 不支持 stage-0 到 stage-3 的proposal。

这种方式会在项目代码中引入所有的polyfill，但是项目中不一定全部会用到，所以可以使用第二种方式。

### 使用 core-js

built-in 方式。

引入 `core-js` 和 `regenerator-runtime`，在使用需要 polyfill的功能时，直接从 core-js 中 require。

这样不会污染全局环境的原生对象，而且只引入需要的polyfill，可以避免项目size过大。

当使用 preset-env 时，可以通过配置 `useBuiltIns`，方便的使用。

```json
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "useBuiltIns": "usage",
        "corejs": {
          "version": 3,
          "proposals": false
        }
      }
    ]
  ]
}
```

`corejs` 用来指定 core-js 的版本，必须与 package.json 的 dependencies 中的 core-js 的版本一致。

> `proposals` 默认为 false，只支持 stage-4 以下的 proposal。如果需要支持 stage-0 到 stage-4 的proposal，可以将该属性改为 true。

查看 core-js 的使用方式及支持的proposal：[https://github.com/zloirock/core-js](https://github.com/zloirock/core-js)

