//Load markdown it and container plugin
var md = window.markdownit()
md.set({ html: true, javascript: true, code:false })
var container = window.markdownitContainer;

//Rendererfunc
function doRendering(md_text) {

 var markdown = md_text;
 return md.render(markdown);
}

// Parse Markdown
function includeHTML(filenum = linkfile) {
    var z, xhttp;
    var rand = Math.floor(Math.random() * 100000) //gennerate a random number to append to prevent cache of markdown file
    /*loop through a collection of all HTML elements:*/
    z = document.getElementById("maincontent");
    file =  "pages/"+filenum + ".md" + '?v=' + rand;
    if (file) {
        /*make an HTTP request using the attribute value as the file name:*/
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status == 200) { z.innerHTML =  doRendering(this.responseText);  processstyles();}
                if (this.status == 404) { z.innerHTML = `
                <h1 id='part0'>This page does not exist.</h1><br> 
                <center> If you believe this is a mistake, try a hard refresh with Ctrl + Shift +R </center>`; }

                /*remove the attribute, and call this function once more:*/
            }
        }
        xhttp.open("GET", file, true);
        xhttp.send();
        /*exit the function:*/
        return;
    }

};
