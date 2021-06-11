import { Anime } from './anime';

describe('Anime', () => {
  it('should create an instance', () => {
    expect(new Anime()).toBeTruthy();
  });
});

describe("Anime.getssid", () => {
  it('should get ssid', () => {
    var url = 'https://www.bilibili.com/bangumi/play/ss26801'
    expect(Anime.getid(url)).toEqual('ss26801')
  })
})