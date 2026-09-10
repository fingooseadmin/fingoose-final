import { readFile, readdir, access } from "node:fs/promises";
import path from "node:path";
const root = path.resolve("out");
const origin = "https://fingoose.org";
const routes = ["/","/about/","/join-us/","/impact/","/resources/","/resources/books/","/resources/curriculum/","/resources/workshops/","/resources/autism-kit/","/course/","/contact/","/donate/"];
const failures = [], titles = new Set();
const sitemap = await readFile(path.join(root,"sitemap.xml"),"utf8");
const checked = new Set();
for (const route of routes) {
  const html = await readFile(path.join(root,route,"index.html"),"utf8");
  const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1];
  if(!title || titles.has(title)) failures.push(route+": missing or duplicate title");
  titles.add(title);
  if((html.match(/<h1[\s>]/g)||[]).length!==1) failures.push(route+": expected exactly one main heading");
  if(!html.includes('id="main-content"')) failures.push(route+": missing skip-navigation target");
  if(!html.includes('rel="canonical" href="'+origin+route+'"')) failures.push(route+": wrong canonical");
  if(!html.match(/<meta name="description" content="[^"]+"/)) failures.push(route+": missing description");
  if(!sitemap.includes("<loc>"+origin+route+"</loc>")) failures.push(route+": missing sitemap entry");
  for(const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try{ JSON.parse(match[1]); }catch{failures.push(route+": invalid structured data");}
  }
  for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = new URL(match[1].replaceAll("&amp;","&"),origin+route);
    if(url.origin!==origin)continue;
    const pathname = decodeURIComponent(url.pathname);
    if(checked.has(pathname))continue;
    checked.add(pathname);
    const file = path.join(root,pathname, path.extname(pathname)?"":"index.html");
    try{await access(file);}catch{failures.push(route+": missing internal target "+pathname);}
  }
}
await access(path.join(root,"index.txt")).catch(()=>failures.push("Missing Next.js navigation payload"));
await access(path.join(root,"google07be475b4517ebd9.html")).catch(()=>failures.push("Missing Google verification file"));
if(failures.length) { console.error(failures.join("\n")); process.exitCode=1; }
else console.log("Verified "+routes.length+" pages: unique titles, canonicals, descriptions, structured data, sitemap, internal targets, and navigation payloads.");

