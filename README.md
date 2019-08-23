# status-mapper
A customizable status mapper

[![Build Status](https://travis-ci.org/janis-commerce/status-mapper.svg?branch=master)](https://travis-ci.org/janis-commerce/status-mapper)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/status-mapper/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/status-mapper?branch=master)



## Installation
```sh
npm install @janiscommerce/status-mapper
```

## Usage
```js
const StatusMapper = require('@janiscommerce/status-mapper');
```

## Examples
```js
const statusMapper = new StatusMapper();

// Status
statusMapper.map('active'); // return 1
statusMapper.map(1); // return 'active'

statusMapper.set('example', 20);
statusMapper.map('example'); // return 20

statusMapper.replace({ example: 30 }); // replace all statuses
statusMapper.map('example'); // return 30

// Colors
statusMapper.mapToColor('active'); // return 'green'
statusMapper.mapToColor(1); // return 'green'

statusMapper.setColor('example', 'black');
statusMapper.mapToColor('example'); // return 'black'

statusMapper.replaceColor({ example: 'white' }); // replace all status colors
statusMapper.mapToColor('example'); // return 'white'
```