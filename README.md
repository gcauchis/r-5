[![Build status](https://ci.appveyor.com/api/projects/status/suqyuk6afshldgua?svg=true)](https://ci.appveyor.com/project/gcauchis/r-5) [![Build Status](https://travis-ci.com/gcauchis/r-5.svg?branch=master)](https://travis-ci.com/gcauchis/r-5) [![Known Vulnerabilities](https://snyk.io/test/github/gcauchis/r-5/badge.svg?targetFile=package.json)](https://snyk.io/test/github/gcauchis/r-5?targetFile=package.json) [![Total alerts](https://img.shields.io/lgtm/alerts/g/gcauchis/r-5.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/gcauchis/r-5/alerts/)
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/gcauchis/r-5.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/gcauchis/r-5/context:javascript) [![build](https://github.com/gcauchis/r-5/actions/workflows/main.yml/badge.svg)](https://github.com/gcauchis/r-5/actions)

# R-5
[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/r-5)

# Getting started
Require `npm` to be installed. See [https://nodejs.org]().
## Install dependency
`npm install`
## Run
### Basic angular run for dev and real time modifications
`npm run start:standard`

Then open [http://localhost:4200/]().
### Run in Electron
`npm run start:electron`

The Electron container will be opened.
## Build
### Localy
`npm run build:prod:electron` will build an executable for your current environnement.

### Windows and unix using Docker (work in progress)
Required `docker` to be installed. See [https://www.docker.com]().
#### From local
`docker run -v ${PWD}:/project electronuserland/builder:wine /bin/bash -c "npm install && npm run build:prod:electron:win:linux"`
#### From GitHub
`docker run -v ~/.cache/electron:/root/.cache/electron -v ~/.cache/electron-builder:/root/.cache/electron-builder electronuserland/builder:wine /bin/bash -c "git clone https://github.com/gcauchis/r-5.git && cd r-5 && npm install && npm run build:prod:electron:win:linux"`
