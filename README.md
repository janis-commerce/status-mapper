# status-mapper

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
// Status
StatusMapper.map('active'); // return 1
StatusMapper.map(1); // return 'active'

StatusMapper.add('example', 20);
StatusMapper.map('example'); // return 20

StatusMapper.replace({ example: 30 });
StatusMapper.map('example'); // return 30

// Colors
StatusMapper.mapToColor('active'); // return 'green'
StatusMapper.mapToColor(1); // return 'green'

StatusMapper.addColor('example', 'black');
StatusMapper.mapToColor('example'); // return 'black'

StatusMapper.replaceColor({ example: 'white' });
StatusMapper.mapToColor('example'); // return 'white'
```