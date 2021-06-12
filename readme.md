# CV Join

当你观看一部新的番剧时，如果想要知道当前番剧中的声优与之前看过的所有番剧中的声优有哪些重合，就可以使用本应用快捷地进行查询。

## 简介

网址： https://crclz.github.io/cvjoin

查询服务托管在github pages上，是一个纯前端的项目，使用`Angular`编写。

数据爬虫采用`Python`编写。数据来源是`bilibili`。

## 使用方法

**导入观看历史**

首先来到b站[番剧页面](https://www.bilibili.com/anime)，点击右下角**我的追番-更多**。

来到追番页面后，将右侧**筛选**选择为“看过”。

可选：打开**每一个**番剧，复制浏览器地址，例如。`https://www.bilibili.com/bangumi/play/ss1057/`

当然，这样工作量有点大。你也可以使用脚本的方式进行快捷操作：复制以下JS代码，使用浏览器的F12开发工具运行。首先复制代码，然后打开刚刚的b站页面，F12 - 控制台或console - 粘贴 - 回车运行。如果实在不知道如何运行脚本，请使用搜索引擎。

运行以下代码：

```js
var interval = 2000;

async function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function isSinglePage() {
    return document.querySelectorAll('.bangumi-pagelistbox a').length == 0;
}

function firstLinkIsPage1() {
    var first = document.querySelectorAll('.bangumi-pagelistbox a')[0]
    return first.text == '1'
}

async function ensurePage1() {
    if (!firstLinkIsPage1()) {
        var link = document.querySelectorAll('.bangumi-pagelistbox a')[1]
        if (link.text != '1') {
            throw '解析错误';
        }
        link.click();
        await delay(interval)
    }
}

async function mainFunc() {
    var alist = []

    if (isSinglePage()) {
        document.querySelectorAll('a.pgc-item-info').forEach(x => alist.push(x.href))

    } else {
        await ensurePage1();
        while (true) {
            document.querySelectorAll('a.pgc-item-info').forEach(x => alist.push(x.href))

            // next page
            var links = document.querySelectorAll('.bangumi-pagelistbox a')
            var lastLink = links[links.length - 1]

            if (lastLink.text != "下一页") {
                break;
            }
            lastLink.click();
            await delay(interval);
        }
    }
    var s = ""
    alist.forEach(p => s += `${p}\n`)
    console.log(s);
}
mainFunc()
```

运行代码后，等待一定时间，直到页面停止变化。这就代表复制已经完成。你会得到类似于下面的控制台输出：

```
https://www.bilibili.com/bangumi/play/ss1111/
https://www.bilibili.com/bangumi/play/ss2222/
https://www.bilibili.com/bangumi/play/ss3333/
```

接着，打开 https://crclz.github.io/cvjoin ，也就是我们的查询页面。点击上方的“添加已看作品”。

将刚刚的输出粘贴到输入框里面，点击导入。

## 进行查询

点击上方的“查询关联”链接。

在输入框内输入你准备查询的番剧的名字。然后在结果中选择。

**然后，就可以查看结果了。**

目前，查询服务收录了追番人数前500的番剧。如果有需求，可以在ISSUE中提出。