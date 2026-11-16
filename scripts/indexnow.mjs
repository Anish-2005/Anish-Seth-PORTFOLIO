// Ping IndexNow (Bing, Yandex, Seznam, Naver...) with every URL in the live sitemap so new or
// changed pages get recrawled within minutes. Run after a production deploy: npm run indexnow
// The key is public by design; it's served at /<key>.txt to prove ownership of the domain.
const HOST = "anishseth.xyz";
const KEY = "22f3ac0acab5539575d1a0850f357291";

const xml = await fetch(`https://${HOST}/sitemap.xml`).then((r) => r.text());
const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
