var script = document.createElement('script'); 
script.src="https://cdn.jsdelivr.net/npm/eruda"; 
document.body.append(script);
script.src="https://aaa/aa.js"; 
document.body.append(script);
function aaa(a,b=a){
    console.log(a,b);
}