# README

This repository hosts the source code of the OGC API - Features Micro Website: https://features.developer.ogc.org

The website is served from the [gh-pages](https://github.com/opengeospatial/ogc-features-website/tree/gh-pages) branch. Read [this note](#note-about-publishing-the-website), to understand how the website is generated. 

## Quick Start :rocket:

Clone this repository with:

`git clone https://github.com/opengeospatial/ogc-features-website.git`

Then enter the folder:

`cd ogc-features-website`

Install dependencies:

`npm install`

Start development server:

`npm start`

Once you start the development server, the site will be available at:

`http://localhost:3000`

### How the development server works

The development server is based on [livereload](https://www.npmjs.com/package/livereload) (LiveReload):

*   The site is built to the `dist/` folder and served from there on `http://localhost:3000`. A file watcher rebuilds the pages, styles, scripts, and assets in `dist/` on the fly whenever you edit files in `src/`.
*   The LiveReload client script is injected into every rendered page, and connects back to the LiveReload server (running on `http://localhost:35729/livereload.js` by default) through a websocket.
*   Whenever a generated file in `dist/` changes, the LiveReload server notifies the connected browser and the page is automatically refreshed, so the changes you make to the code are reflected in the browser.

You can change the ports with the `PORT` (website, default `3000`) and `LIVERELOAD_PORT` (LiveReload server, default `35729`) environment variables.

> [!TIP]
> You can also run `npm run start:debug` to start the development server with a debugger attached to the build scripts.

### Note about Publishing the Website

Commit all your changes to the `master` branch. **The `gh-pages` branch will be wiped each time, and generated dynamically from these [GitHub actions](https://github.com/opengeospatial/ogc-features-website/actions)**, which create a static build. In a nutshell, **you don't need to do anything to publish the website** - the republish will be triggered automatically with each push to `master`.

## Contributing 🤝

This website is a live project and we welcome contributions from the community! If you have suggestions for improvements, found a bug, or want to add new features, feel free to:

* Open an [issue](https://github.com/opengeospatial/ogc-features-website/issues) to start a discussion
* Submit a [pull request](https://github.com/opengeospatial/ogc-features-website/pulls) with your proposed changes

We appreciate your support in making this website better!


## License

This project is released under an [MIT License](./LICENSE)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
(dev-exercise-template)