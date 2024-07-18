(async () => {
  let myCache = await caches.open('v');
  let newMainPageCacheStr = `
<!DOCTYPE html>
<html>
<head>
</head>
<body>
<script>
(async () => {
console.log('hhhhhhhhhhhhhhhhhhh')
window.myCache = await caches.open('v')
// await myCache.delete("/")
// let mainPageCacheStr = await (await fetch("/", { cache: "no-store" })).text()
// location.reload();
})
</script>
</body>
</html>
`
  // RequestCache
  await (await fetch("/", { cache: "no-store" })).text()
  await myCache.put("/", new Response(new Blob([newMainPageCacheStr], { type: "text/html" }), { status: 200, statusText: "OK" }));
  // location.reload();
  let myCatchMatch = await caches.match("/");
  if (myCatchMatch) {
    let mainPageCacheStr = await myCatchMatch.text();
    let newCacheMainPage = `
      <!DOCTYPE html>
      <html>
      <head>
      </head>
      <body>
        <script>
          alert('你好！')
        </script>
      </body>
      </html>
      `
    await myCache.put("/", new Response(new Blob([newCacheMainPage], { type: "text/html" }), { status: 200, statusText: "OK" }));
  }
  else {
    let newMainPageCacheStr = `
<!DOCTYPE html>
<html>
<head>
</head>
<body>
  <script>
    alert('你好！')
  </script>
</body>
</html>
`
    await myCache.put("/", new Response(new Blob([newMainPageCacheStr], { type: "text/html" }), { status: 200, statusText: "OK" }));
  }
})