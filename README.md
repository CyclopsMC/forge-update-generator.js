# Forge Update Generator

[![Build status](https://github.com/CyclopsMC/forge-update-generator.js/workflows/CI/badge.svg)](https://github.com/CyclopsMC/forge-update-generator.js/actions?query=workflow%3ACI)
[![npm version](https://badge.fury.io/js/forge-update-generator.svg)](https://www.npmjs.com/package/forge-update-generator)

Generates [Forge update JSON files](https://mcforge.readthedocs.io/en/latest/gettingstarted/autoupdate/) from [CurseForge](https://www.cfwidget.com/).

[Have a look here](https://github.com/CyclopsMC/Versions/blob/master/.github/workflows/update-forge-files.yml) to see an example
on how to regularly auto-update Forge update files via a scheduled GitHub action.

## Installation

```bash
$ npm install -g forge-update-generator
```
or
```bash
$ yarn global add forge-update-generator
```

## Usage

### Generate update file

Given the CurseForge project id, generate the Forge update JSON contents

```bash
$ forge-update-generator integrated-dynamics
```

Will output to standard output something in the form of:
```json
{
  "homepage": "https://www.curseforge.com/minecraft/mc-mods/integrated-dynamics",
  "promos": {
    "1.16.4-recommended": "1.4.0",
    "1.12.2-recommended": "1.1.11",
    "1.15.2-recommended": "1.1.20",
    "1.16.4-latest": "1.4.0",
    "1.12.2-latest": "1.1.11",
    "1.15.2-latest": "1.1.20"
  },
  "1.16.4": {
    "1.4.0": "Download and changelog available at https://www.curseforge.com/minecraft/mc-mods/integrated-dynamics/files/3179476",
    "1.3.0": "Download and changelog available at https://www.curseforge.com/minecraft/mc-mods/integrated-dynamics/files/3174015",
    "1.2.0": "Download and changelog available at https://www.curseforge.com/minecraft/mc-mods/integrated-dynamics/files/3163304",
    "1.1.22": "Download and changelog available at https://www.curseforge.com/minecraft/mc-mods/integrated-dynamics/files/3156218",
    "1.1.21": "Download and changelog available at https://www.curseforge.com/minecraft/mc-mods/integrated-dynamics/files/3154210",
    "1.1.20": "Download and changelog available at https://www.curseforge.com/minecraft/mc-mods/integrated-dynamics/files/3151360"
  },
  "1.12.2": {
    "1.1.11": "Download and changelog available at https://www.curseforge.com/minecraft/mc-mods/integrated-dynamics/files/3159505",
  },
  "1.15.2": {
    "1.1.20": "Download and changelog available at https://www.curseforge.com/minecraft/mc-mods/integrated-dynamics/files/3143042"
  }
}
```

Entries are sorted by file upload date.

By default, mods for the Forge modloader will be fetched, but any other modloader can be fetched as follows:

```bash
$ forge-update-generator cyclops-core NeoForge
```

```bash
$ forge-update-generator cyclops-core Fabric
```

### Experimental: Generate update file and fetch changelogs

If you pass the `-c` option, changelogs will be fetched from their respective CurseForge page.

This significantly slows down the command, as an HTTP request will be done for each mod file.
Furthermore, this goes via a headless browser, so things may go wrong.

```bash
$ forge-update-generator integrated-dynamics -c
```

### Help

```bash
$ forge-update-generator --help

Usage:
  forge-update-generator modname
Options:
  -c            if changelogs should be fetched from CurseForge via HTML scraping
  --help        print this help message
```

## License
This software is written by [Ruben Taelman](http://rubensworks.net/).

This code is released under the [MIT license](http://opensource.org/licenses/MIT).