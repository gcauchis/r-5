# R-5

[![build](https://github.com/gcauchis/r-5/actions/workflows/electronBuild.yml/badge.svg)](https://github.com/gcauchis/r-5/actions)
[![Known Vulnerabilities](https://snyk.io/test/github/gcauchis/r-5/badge.svg?targetFile=package.json)](https://snyk.io/test/github/gcauchis/r-5?targetFile=package.json)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=gcauchis_r-5&metric=ncloc)](https://sonarcloud.io/dashboard?id=gcauchis_r-5)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=gcauchis_r-5&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=gcauchis_r-5)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=gcauchis_r-5&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=gcauchis_r-5)

## Getting started

Require `npm` to be installed. See [https://nodejs.org](https://nodejs.org).

## Install dependency

`npm install`

## Run

### Basic angular run for dev and real time modifications

`npm run start:standard`

Then open [http://localhost:4200/](http://localhost:4200/).

### Run in Electron

`npm run start:electron`

The Electron container will be opened.

## Build

### Localy

`npm run build:prod:electron` will build an executable for your current environnement.
