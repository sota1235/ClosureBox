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

#### Strict mode

If you want to check type of instance, you can do it with enabling strict mode.

Firstly, please enable strict mode for Container instance.

```javascript
import Container from 'closure-box';

Container.enableStrictMode();
```

Secondly, pass boolean value when set instance into Container.

```javascript
import UserRepository from 'repositories/user-repository';
import Container from 'closure-box';

Container
  .set('repositories/user-repository', () => {
    return new UserRepository();
  }, true); // 3rd argument required
```

Completed!
If you did it, Container check type of instance when **getting instance**.

Container will compare instance obtained by registered function with instance obtained from key name.

### Install

```
yarn add closure-box
# or
npm i -S closure-box
```

### Contribution

Please give me Pull Request :)

### Licence

This software is released under the MIT License, see LICENSE.txt.

## Author

[@sota1235](https://github.com/sota1235)
