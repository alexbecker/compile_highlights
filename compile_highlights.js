#! /usr/bin/env node
var fs = require("fs");
var jsdom = require("jsdom");
var hljs = require("highlight.js");

var argv = require("minimist")(process.argv.slice(2));
var highlightCSS = argv.css || "//cdn.jsdelivr.net/highlight.js/9.2.0/styles/default.min.css";

function highlight(node) {
    var code_blocks = node.querySelectorAll("pre > code");
    for (var i=0; i<code_blocks.length; i++) {
        hljs.highlightBlock(code_blocks[i]);
    }
}

function injectDependencies(doc) {
    var head = doc.getElementsByTagName("head")[0];

    var link = doc.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("type", "text/css");
    link.setAttribute("href", highlightCSS);
    head.appendChild(link);
}

for (var i=0; i<argv._.length; i++) {
    function f() {
        var path = argv._[i];
        var raw = fs.readFileSync(path).toString();
        jsdom.env(
            raw,
            function (err, window) {
                if (err != null) {
                    console.error(err);
                    return;
                }
                global.document = window.document;
                highlight(window.document);
                injectDependencies(window.document);
                fs.writeFileSync(path, window.document.documentElement.outerHTML);
            }
        );
    }
    f();
}
