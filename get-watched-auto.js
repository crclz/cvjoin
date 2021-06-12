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