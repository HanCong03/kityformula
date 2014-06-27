# Kity Formula

Kity Formula 是一个为降低在WEB上编辑和呈现数学公式的复杂度而产生的项目。利用Kity Formula，你可以毫不费力地在你的WEB页面中呈现出效果理想的数学公式，不仅如此，Kity Formula还能在你的页面内创建一个编辑器，以帮助你的用户以极低的成本创建数学公式。

## 内容导航
* [项目简介](#项目简介)
* [快速入门](#快速入门)
* []

## 项目简介
Kity Formula 包含有3个完整的子项目，分别是：
* [kf-render](https://github.com/fex-team/kf-render) —— 数学公式呈现引擎，负责在页面指定页面区域内渲染公式图形。
* [kf-parser](https://github.com/fex-team/kf-parser) —— 数学公式解析器，负责把各种“表示法”表示的公式解析成为kf-render可以理解的格式。
* [kf-editor](https://github.com/fex-team/kf-editor) —— 数学公式编辑器，提供了一个简单易用的数学公式编辑器。

## 快速入门
你可以通过以下途径获取最新的发行版:

- 下载最新的版本
- 克隆源码仓库到本地，然后执行编译。

然后参考[Getting Started](http://fex-team.github.io/kityformula/getting-started.html)的示例和说明开始使用KFR。

## Bug和功能性建议
你可以在[issues](https://github.com/fex-team/kityformula/issues)中向我们提出在使用过程中遇到的BUG以及功能性建议。

## 兼容性列表
Kity Formula Render 支持以下浏览器：

![Browser](http://fex-team.github.io/kityformula/assets/images/browser.png) 

以及其他极具特色的浏览器，比如：搜狗浏览器、360浏览器等。


## 特性

### 简单

Kity Formula Render 提供了一个简单的解决方案，可以使你完全独立于服务器端渲染公式，而且你可以非常容易地把 Kity Formula Render 集成到你的应用中。

### 灵活

Kity Formula Render 提供了一个非常灵活的公式呈现和存储方案，以方便你在自己的应用中呈现公式。

你可以使用Kity Formula的子项目Kity Formula Parser（KFP）提供的解析器来完成从各种公式表示法到可视化公式的转换，也可以直接使用 Kity Formula Render 提供的API，以编程的方式来构建一个公式。

在服务器端存储方面，你可以结合解析器KFP在服务器端存储公式的原始表达式，也可以存储图片的base64编码，或者直接把图片以二进制的方式保存到服务器上。


### 美观

Kity Formula Render 渲染出来的公式效果接近于纸质出版物的效果，可以使你的应用表现得更专业。

## 版权与许可
Kity Formula 相关的代码和文档版权属于百度，代码发布在[MIT](https://github.com/fex-team/kityformula/blob/master/LICENSE.md)许可下。