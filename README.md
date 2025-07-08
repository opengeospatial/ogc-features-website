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

The hot reload will ensure that the changes you do on the code will be reflected on the browser.

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