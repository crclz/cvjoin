var alist = []
document.querySelectorAll('a.pgc-item-info').forEach(x => alist.push(x.href))

var s = ""

alist.forEach(p => s += `${p}\n`)

console.log(s);