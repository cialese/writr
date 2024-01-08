![Writr](site/logo.png)

---

## Beautiful Website for Your Projects
[![Build](https://github.com/jaredwray/writr/actions/workflows/tests.yml/badge.svg)](https://github.com/jaredwray/writr/actions/workflows/tests.yml)
[![GitHub license](https://img.shields.io/github/license/jaredwray/writr)](https://github.com/jaredwray/writr/blob/master/LICENSE)
[![codecov](https://codecov.io/gh/jaredwray/writr/branch/master/graph/badge.svg?token=1YdMesM07X)](https://codecov.io/gh/jaredwray/writr)
[![npm](https://img.shields.io/npm/dm/writr)](https://npmjs.com/package/writr)

---
## Table of Contents
- [Features](#features)
- [Getting Started](#getting-started)
- [Using Your own Template](#using-your-own-template)
- [Building Multiple Pages](#building-multiple-pages)
- [Helper Functions for Markdown](#helper-functions-for-markdown)
- [Code of Conduct and Contributing](#code-of-conduct-and-contributing)
- [What Happened to it Generating a Blog](#what-happened-to-it-generating-a-blog)
- [License - MIT](#license)

## Features
* No configuration requrired. Just setup the folder structure with a logo, favicon, and css file. 
* Builds a static website that can be hosted anywhere.
* For more complex projects easily add a `writr.config.js` or `writr.config.ts` file to customize the build process. With PRE and POST methods. 
* Support for single page with readme or multiple pages with a table of contents.
* Will generate a sitemap.xml and robots.txt.
* Uses Github release notes to generate a changelog / releases page.
* Uses Github to show contributors and link to their profiles.
* Simple search is provided by default out of the box. 

## Getting Started 

## 1. Install Writr

> npx writr init

This will create a folder called site with the following structure:

```
site
├───site.css
├───logo.png
├───favicon.ico
├───README.md
├───writr.config.js
```
Note: for typescript do 'writr init --typescript'

## 2. Add your content

Simply replace the logo, favicon, and css file with your own. The readme is your root project readme and you just need to at build time move it over to the site folder. If you have it at the root of the project and this is a folder inside just delete the  README.md file in the site folder and writr will copy it over for you automatically.

## 3. Build your site

> npx writr

This will build your site and place it in the `dist` folder. You can then host it anywhere you like.

## Using Your own Template

If you want to use your own template you can do so by adding a `writr.config.ts` file to the root of your project. This file will be used to configure the build process.

or at the command line:

> npx writr --template path/to/template

## Building Multiple Pages

If you want to build multiple pages you can easily do that by adding in a `docs` folder to the root of the site folder. Inside of that folder you can add as many pages as you like. Each page will be a markdown file and it will generate a table of contents for you. Here is an example of what it looks like:

```
site
├───site.css
├───logo.png
├───favicon.ico
├───writr.config.ts
├───docs
│   ├───readme.md
│   ├───getting-started.md
│   ├───contributing.md
│   ├───license.md
│   ├───code-of-conduct.md
```

The `readme.md` file will be the root page and the rest will be added to the table of contents. If you want to control the title or order of the pages you can do so by setting the `title` and `order` properties in the front matter of the markdown file. Here is an example:

```md
---
title: Getting Started
order: 2
---
```

## Helper Functions for Markdown

Writr comes with some helper functions that you can use in your markdown files.
* `writrHelpers.getFrontMatter(fileName)` - Gets the front matter of a markdown file.
* `writrHelpers.setFrontMatter(fileName, frontMatter)` - Sets the front matter of a markdown file.
* `writrHelpers.createDoc(source, destination, frontMatter?, contentFn[]?)` - Creates a markdown file with the specified front matter and content. The contentFn is a function that is executed on the original content of the file. This is useful if you want to remove content from the original file.

### Remove html content

In some cases your markdown file will have html content in it such as the logo of your project or a badge. You can use the `wrtir.helpers.removeHtmlContent()` helper function to remove that content from the page. Here is an example:

```js
writr.helpers.removeHtmlContent('../readme.md', '<img src=');
```

### Get and Set the Front Matter of a Markdown File

You can use the `writrHelpers.getFrontMatter()` and `writrHelpers.setFrontMatter()` helper functions to get and set the front matter of a markdown file. Here is an example:

```js
const frontMatter = writr.helpers.getFrontMatter('../readme.md');
frontMatter.title = 'My Title';
writr.helpers.setFrontMatter('../readme.md', frontMatter);
```

## Code of Conduct and Contributing
[Code of Conduct](CODE_OF_CONDUCT.md) and [Contributing](CONTRIBUTING.md) guidelines.

## What Happened to it Generating a Blog

The original version of writr was a blog generator. Since there are plenty of blog generators out there we made the decision to make it a static site generator for open source projects. This is something that we constantly need and we hope you find it useful as well.

## License

MIT © [Jared Wray](https://jaredwray.com)
