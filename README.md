

在ant design pro中做的一个流程图组件，支持自定义颜色， 尺寸等

<!-- more -->

### demo

话不多说，先上页面截图~
<a href="http://www.zhaozhenfa1995.gitee.io/process-map" target="_blank">在线预览</a>

<img src="https://zazzzf.github.io/assets/img/Snipaste_2021-04-02_09-15-03.2df1736a.png" class="zoom-custom-imgs" />



## 参数配置

参数内置了 尺寸， 一级颜色， 二级颜色，

### Color

<img src="https://zazzzf.github.io/assets/img/Snipaste_2021-04-02_10-19-33.794bb21d.png" class="zoom-custom-imgs" />
<img src="https://zazzzf.github.io/assets/img/Snipaste_2021-04-02_10-26-34.06064abd.png" class="zoom-custom-imgs" />

### Size 

<img src="https://zazzzf.github.io/assets/img/Snipaste_2021-04-02_10-27-29.376fea56.png" class="zoom-custom-imgs" />

### 全部收起/展开

<img src="https://zazzzf.github.io/assets/img/ex.91e75c51.png" class="zoom-custom-imgs" />
<img src="https://zazzzf.github.io/assets/img/ex1.a75ce814.png" class="zoom-custom-imgs" />


## Less 变量

这个贴一下，基本包括了组件的全部颜色，连线的全部颜色，二三级块的尺寸等

```less
@lego__color--primary: #3281f6;
@process-map-color_hover: #f05b72;
@process-map-color_selected: #3281f6;
@process-map-border-width_selected: 2px;
@process-map-border-color: #b22c46;
@process-map-line-border-size: 1px;

@process-map-second-box-color: #f7acbc;
@process-map-third-box-color: #ef5b9c;
@process-map-text-color: #feeeed;
// size --large

@process-second-font-size-large: 22px;
@process-second-text-line-height-large: 33px;
@process-map-third-box_width-large: 180px;
@process-map-third-box_height-large: 100px;
@process-map-third-circle_width-large: 160px;
@process-map-third-box_margin_y-large: 20px;
@process-map-third-box_margin_x-large: 12px;
@process-map-third-box_position-large: 40px;

// size --small
@process-second-font-size-small: 16px;
@process-second-text-line-height-small: 22px;

@process-map-third-box_width-small: 136px;
@process-map-third-box_height-small: 80px;
@process-map-third-circle_width-small: 120px;

@process-map-third-box_margin_y-small: 20px;
@process-map-third-box_margin_x-small: 8px;
@process-map-third-box_position-small: 20px;


```

## 设计思路

之前一个项目，需求是需要一个这样的流程渲染组件，样式就是如图所示，点击后旁边弹出详情，外加一下自动滚动，锚点等，分析需求后发现这快基本只用来渲染数据，互动操作只有一个点击事件。

接口数据

```javascript
// 这是一个三级树状的数据
/**
  * @params {String| Number} stepCode 节点唯一id 这个可能在做自动滚动会用到
  * @params {String} stepName 节点名
  * @params {String| Number} rankType 排列方式
  */

[
  {
    'stepCode': 10100101,
    'stepName': '@cname',
    'data': [
      {
        'status': '3',
        'stepCode': 20200101,
        'stepName': '@cname',
        'rankType': 1,
        'data': [
          {
            'stepCode': 30300101,
            'stepName': '@cname',
            'rankType': 1,
          }, ...
        ]
      }, ...
    ]
  }, ...
]

```
在这里 组件的nodeData参数 跟接口返回是一样的， 有需要可以自行clone修改源码

按照接口返回数据，观察所需渲染出的页面，考虑肯定是需要用到for循环实现，但是按照节点数据又渲染不出预期的结果，
所以对接口的数据进行format

```javascript
// format.js
export default function (data) {
  if (data && data.data && data.data.length) {
    var child_list = data.data;
    var format_list = [];
    for (var i = 0; i < child_list.length; i++) {
      /**
       * 放置方式，1为串行，2为并行
       */
      if (child_list[i].rankType == '1') {
        if (format_list.length > 0) {
          if (format_list[format_list.length - 1].length === 1) {
            /**
             * 连续两行串行 为1个时候 把后一个的isOnceTwo 设置为true 用于连续两个单一块串行的判断 最后一个串行块的上连接线需要删减
             */
            child_list[i].isOnceTwo = true;
          } else {
            child_list[i].isOnceTwo = false;
          }
        }
        format_list.push([child_list[i]]);
      } else if (child_list[i].rankType == '2') {
        /**
         * 如果串行最后一个中又新增了一个并行
         * 则删除掉其 isOnceTwo属性
         */
        if (format_list.length > 0) {
          format_list[format_list.length - 1].forEach((item) => (item.isOnceTwo = false));
          format_list[format_list.length - 1].push(child_list[i]);
        }
      }
    }

    return format_list;
  } else {
    return [];
  }
};
```
```javascript
// 输出

[
    [
      {
        "status": "3",
        "stepCode": 20200101,
        "stepName": "郭平",
        "rankType": 1,
        "data": "[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]",
        "extend": false
      }
    ],
    "[{…}]",
    "[{…}]",
    "[{…}]",
    "[{…}]",
    "[{…}]",
    "[{…}, {…}]",
    "[{…}]",
    "[{…}]",
    "[{…}, {…}]",
    "[{…}, {…}]"
]
```
这里大致将所有的二级用 [ [] ]的方式输出

第一个[ ]表示横行

第二个[ ]表示行内排列的N个圆

然后开始遍历数组渲染出全部二级

```javascript
...
{this.state.data.map((i, $i) => {
        return (
            <div className={`second-box_row`}>
                {this.state.data[$i].map((t, _t) => {
                return (
                    <SecondCol>
                    ...
                    </SecondCol>
                )
                })}
            </div>
        )
    }
}

...
```

用同样的方式 渲染出3级节点，可能会疑惑为什么不format 三级的数据，是因为三级的数据在二级循环之前是拿不到的，所以只能动态使用

```javascript
...
<SecondCol>
    {formatData(t).map((n, _n) => {
        return (
            <ThirdRow >
                {n.map((m, _m) => {
                    return (
                        <ThirdCol />
                    );
                })}
            </ThirdRow>
        );
    })}
</SecondCol>
```



到这里，组件的核心设计基本上就讲完了，上面代码中去掉了类名等，组件的全部样式及连线，全部有对应的类名。全部代码可以去下面gitee/github中查看






<a href="http://www.gitee.com/zhaozhenfa1995/process-map" target="_blank">项目地址 Gitee</a>

<a href="http://www.github.com/zazzzf/process-map" target="_blank">项目地址 Github</a>


## Vue版本
:tada: Vue版本

<a href="http://www.gitee.com/zhaozhenfa1995/vue-process-map" target="_blank">vue项目地址 Gitee</a>

<a href="http://www.zhaozhenfa1995.gitee.io/vue-process-map" target="_blank">在线预览</a>

<img src="https://zazzzf.github.io/assets/img/Snipaste_2021-04-02_14-41-09.9a772e7a.png" class="zoom-custom-imgs" />

