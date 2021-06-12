import json

"""
https://raw.githubusercontent.com/gumblex/zhconv/master/zhconv/zhcdict.json
"""

data = json.load(open('zhcdict.json', 'r', encoding='utf8'))

single = dict()


for trad, simp in data['zh2Hans'].items():
    if len(trad) == 1:
        if len(simp) == 1:
            single[trad] = simp
        else:
            print("WARN", trad, simp)


def normalize(s, empty_when_err=True):
    new_s = ""
    for c in list(s):
        if c in single:
            new_s += single[c]
        else:
            new_s += c

    new_s = new_s.strip()
    if len(new_s) == 0 and empty_when_err:
        raise Exception("Empty cv name")
    return new_s
