## Life Coach
### Code Badges
[![Build Status](https://travis-ci.org/ABarnhard/life-coach.svg)](https://travis-ci.org/ABarnhard/life-coach)
[![Coverage Status](https://coveralls.io/repos/ABarnhard/life-coach/badge.png)](https://coveralls.io/r/ABarnhard/life-coach)

### About
An app for people trying to get their lives together

### Models
```
User
--------
_id
email
password
--------
.register
.login
```

```
Goal
--------
_id
name
due
tags
userId
--------
.create
.findAllByUserId
```

### Features
- Sessions
- OOP
- Acceptance & Unit testing
- Chalk

### Running Tests
```bash
$ npm install
$ npm test
```

### Contributors
- [Adam Barnhard](https://github.com/abarnhard)

### License
[MIT](LICENSE)

