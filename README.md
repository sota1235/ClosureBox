ClosureBox
====

Simple DI container with flow for Node.js

### Description

Simple DI container with using flow.

### Requirement

You need to remove flow annotation with using [transform-flow-strip-types](https://babeljs.io/docs/plugins/transform-flow-strip-types/) plugin or [flow-remove-types](https://github.com/flowtype/flow-remove-types).

### Usage

Exported container is singleton instance.

Set instance.

```javascript
import UserRepository from 'repositories/user-repository';
import AuthService from 'services/auth-service';
import Container from 'closure-box';

Container
  .set('UserRepositoryInterface', () => {
    return new UserRepository();
  })
  .set('services/auth-service', (container: type of Container) => {
    return new AuthService(container.get('UserRepositoryInterface'));
  });
```

Get instance.

```javascript
import AuthService from 'services/auth-service';
import Container from 'closure-box';

const authService: AuthService = Container.get('services/auth-service');
```

Just it.

### Install

TBD

### Contribution

Please give me Pull Request :)

### Licence

This software is released under the MIT License, see LICENSE.txt.

## Author

[@sota1235](https://github.com/sota1235)
