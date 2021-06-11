export class Anime {
    public id: string;// ss123123
    public title: string;
    public watchUrl: string;
    public cvChar: Map<string, string> = new Map<string, string>();

    constructor(title: string, watchUrl: string) {
        this.id = Anime.getid(watchUrl)
        this.title = title
        this.watchUrl = watchUrl
    }

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