---
layout: post
title: "Getting started with WebAssembly!"
date: 2017-06-29
author: "mobihack"
category: WebAssembly
tags: [js,javascript,webassembly,intro]
comments: true
image:
  path: /static/article-pics/getting-started-webassembly.png
  height: 800
  width: 800
toc: true
tocCustom:
  min: 2
  max: 2
---


> WebAssembly or wasm is a new portable, size- and load-time-efficient format suitable for compilation to the web. WebAssembly is currently being designed as an open standard by a W3C Community Group that includes representatives from all major browsers. 

WebAssembly is a new technology that makes it possible to run highly performance, low-level code in the browser itself. It can be used to bring large C and C++ codebases like games, physics engines and even desktop apps to the web platform.

## How does WebAssembly work?


We will start with a quick overview of what WebAssembly actually does. We'll try not to get too technical here.

In Web Browsers, JavaScript is executed in a virtual machine (VM) which optimizes your code and squeezes every ounce of performance. Without a doubt, JavaScript is one of the fastest dynamic languages around. Even though it is fast, JavaScript wouldn't be able to compete with the speed of raw C/C++ code. This is where WebAssembly comes in.

WebAssembly runs in the same VM as JavaScript but performs much better. The two can communicate freely and don't exclude each other. This way you can have the best of both worlds - JavaScript's huge ecosystem and friendly syntax, combined with the near-native performance of WebAssembly.

We can write WebAssembly modules in C and compile them to .wasm files. These wasm files aren't recognized by the browser directly, so they need something called JavaScript glue code to work in the browser.

 ![Web Assembly Workflow.jpg](/static/article-pics/webassembly-flow.jpg)

In the future, these steps would be redundant and could be replaced by WebAssembly frameworks and native wasm module support.

## Using WebAssembly?

The initial version of WebAssembly has reached cross-browser consensus. That means WebAssembly CG members representing four browsers, Chrome, Edge, Firefox, and WebKit, have reached a consensus that the design of the initial (MVP) WebAssembly API and the binary format is complete to the extent that no further design work is possible without implementation experience and significant usage. This marks the end of the Browser Preview and signals that browsers can begin shipping WebAssembly on-by-default. As of right now, WebAssembly can be used in Chrome and Firefox, with Edge and Safari support almost complete as well. This means that very soon, you will be able to run wasm in every popular web browser.

For more info:
* [CanIUse? #wasm](http://caniuse.com/#feat=wasm)
* [WebAssembly Roadmap](http://webassembly.org/roadmap/)

## Prerequisite

You will need some tools for writing Web Assembly. Most of the tools needed are quite common and there is high chance that these tools would be already installed on your computer.

* Browser with support for WebAssembly, an up-to-date Chrome or Firefox should do the trick. [CanIUse? #wasm](http://caniuse.com/#feat=wasm)
* C to WebAssembly compiler.
We will be using Emscripten portable. [Download Emscripten](https://kripken.github.io/emscripten-site/docs/getting_started/downloads.html)
* A compiler for C (GCC on Linux, Xcode on OS X, Visual Studio for Windows).
* Simple local web server to run the example (e.g. `python -m SimpleHTTPServer 9000` or you can use Apache if you already have it installed)

## 1. Hello World!

We will create a simple wasm code that will output Hello World string.

### Step 1: Writing C Code

```c
#include <stdio.h>
int main(int argc, char ** argv) {
printf("Hello world!\n");
}
```

As you can see we have written a small c program that will print <em>Hello world</em> when the program is ran.

Save this file as hello.c

### Step 2: Compile Code:

Now that we have our simple c program, we need to compile it into wasm. Not only that, but we also need to generate JavaScript glue code that will help us actually run it.

Here we have to use the Emscripten compiler. There are tons of CLI options available and lots of different approaches. We found the following combination most user-friendly:

```bash
emcc hello.c -s WASM=1 -O3 -o hello.js
```

Here is a list of all the things we are doing:

* `emcc` - The Emscripten compiler.
* `hello.c` - Our input C code file.
* `-s WASM=1` - Specify we are working with WebAssembly.
* `-03` - The level of code optimization we want. 3 is a pretty high level for optimization.
* `-o hello.js` - Tells emcc to output to a JS file with all the needed glue code for our wasm module.

After running the command, in our working directory will be added two files: `hello.wasm` and `hello.js`. They hold the WebAssembly module and its glue code, respectively.

> Although these emcc options work well for our tutorial, in more complex situations a different approach might be better. Also these options could change after time. You can read more [here](http://kripken.github.io/emscripten-site/docs/tools_reference/emcc.html#emccdoc).

### Step 3: Load WebAssembly onto Browser

Finally, we are back to the world of HTML. We will create a basic `index.html` and include the generated js file in a script tag.

```html
<!DOCTYPE html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>WebAssembly - Hello World Example</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>

    <!-- Include the JavaScript glue code. -->
    <!-- This will load the WebAssembly module and run it --> 
    <script src="hello.js"></script>

  </body>
</html> 
```

Because of cross-origin issues, we will need a local web server to run the project. On Linux/OS X you can start one by running the following code in the project directory:

```bash
python -m SimpleHTTPServer 9000
```

Now in the browser, go to `localhost:9000` to view the app. If you open the browser console, there should be the greeting message we `printf`-ed in the main of our C code:

```
Hello World
```

## 2. Dice Roll!


We will now create another simple wasm code that picks a random number between 1 and 6.

### Step 1: Writing C Code

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <emscripten/emscripten.h>

int main(int argc, char ** argv) {
    printf("WebAssembly module loaded\n");
}

int EMSCRIPTEN_KEEPALIVE roll_dice() {
    srand ( time(NULL) );
    return rand() % 6 + 1;
}
```

When we compile to wasm and load this code into the browser, the main will be automatically executed. The printf inside of it will be translated into a console.log and called. 

We want the roll_dice function to be available in the JavaScript whenever we need it to. To tell the Emscripten compiler our intentions we have to add EMSCRIPTEN_KEEPALIVE.

Save this file as `dice-roll.c`

### Step 2: Compile Code:

```bash
emcc dice-roll.c -s WASM=1 -O3 -o dice-roll.js
```

### Step 3: Load WebAssembly onto Browser

Finally, we are back to the world of HTML. We will create a basic `index.html` and include the generated js file in a script tag.

```html
<!DOCTYPE html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>WebAssembly - Dice Roll</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
  </head>
  <body>

    <!-- Include the JavaScript glue code. -->
    <!-- This will load the WebAssembly module and run it --> 
    <script src="dice-roll.js"></script>

  </body>
</html> 
```

To run code:

```bash
python -m SimpleHTTPServer 9000
```

Now in the browser, go to `localhost:9000` to view the app. If you open the browser console, there should be the message we `printf`-ed in the main of our C code:

```
WebAssembly module loaded
```

### Step 4: Call WebAssembly Functions

Now we are gonna try and connect JavaScript and WebAssembly. This is actually very easy tanks to the JavaScript glue code generated from Emscripten. It handles all the hard work for us.

There is a pretty powerful API for working with WebAssembly in the browser. We won't get into it in detail as it is way beyond the scope of this tutorial. The only parts we will need are the [Module](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/Module) interface and its `ccall` method. This method allows us to call a function from the C code by name, and use it just like a JS one.

```javascript
var result = Module.ccall(
    'funcName',     // name of C function 
    'number',       // return type
    ['number'],     // argument types
    [42]);          // arguments
```

After the `ccall`, in result we will have whatever is returned from the respective C function. All arguments apart from the first one are optional.

A shortened version is also available for use:

```javascript
// Call a C function by adding an underscore in front of its name:
var result = _funcName();
```

Our `roll_dice` C function doesn't require any parameters. Calling it in the JavaScript code is super easy:

```javascript
// When a HTML dice is clicked, it's value will change.
var dice = document.querySelector('.dice');

dice.addEventListener('click', function(){

    // Make a call to the roll_dice function from the C code.
    var result = _roll_dice();
    dice.className = "dice dice-" + result;                   

});
```

We could just use:
```html
    <script type="text/javascript">
    	console.log(_roll_dice());
    </script>

```

This would print the random number to console log.

This could be coupled with some more code to show a working Roll Dice.

## Conclusion

We may still be in the early stages of WebAssembly but the new standard is clearly a huge step forward in the right direction. The ability to run high performant low-level code in the browser will give way to new apps and web experiences not possible with JavaScript alone.

Admittedly, working with WebAssembly is a bit tedious at the moment. The documentation is split over several places, tools are difficult to use, and you need JavaScript glue code to require wasm modules. All of these issues should be resolved as more and more people get into the new platform.

* [WebAssembly official website](http://webassembly.org/)
* [WebAssembly on MDN](https://developer.mozilla.org/en-US/docs/WebAssembly)
* [Emscripten](https://kripken.github.io/emscripten-site/index.html) official website
* [Awesome WASM](https://github.com/mbasso/awesome-wasm) is a curated list of awesome things regarding WebAssembly (wasm) ecosystem.
