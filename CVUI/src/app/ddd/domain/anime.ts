export class Anime {
    public title: string = "";
    public watchUrl: string = "";
    public cvChar: Map<string, string> = new Map<string, string>();

    // https://www.bilibili.com/bangumi/play/ss26801
    public static getid(url: string): string {
        var r = /bangumi\/play\/(ss[\d]+)/
        var m = url.match(r)
        if (m != null) {
            return m[1];
        } else {
            throw "Cannot get ssid from " + url
        }
    }
}