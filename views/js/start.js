const root = document.querySelector('.root')
function loadScript(url, callback){
    const head = document.getElementsByTagName('head')[0];
    const script = document.createElement('script')
    script.type = 'text/javascript';
    script.src = url;
    script.onreadystatechange = callback;
    script.onload = callback;
    head.appendChild(script)
}

loadScript('app/home.js',()=>{
    generatePage(root, generatePageFuncs)
})
