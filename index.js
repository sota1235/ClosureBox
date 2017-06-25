/**
 * @flow
 * @fileoverview Container for getting instance.
 */
type InstanceInfo = {
  strict: boolean,
  closuer: Function,
};

type RegistedInstance = {
  [string]: InstanceInfo,
};

const isProduction = process.env.NODE_ENV === 'production';

class Container {
  container: RegistedInstance;

  get<T>(modulePath: string): T {
    const value: InstanceInfo = this.container[modulePath];

    if (!value) {
      throw new Error(`Instance not found - ${modulePath}`);
    }

    const instance: T = value.closuer(this);

    if (value.strict && isProduction) {
      const Target = require(modulePath); // eslint-disable-line global-require, import/no-dynamic-require

      if (!(instance instanceof Target)) {
        throw new Error(`modulePath does not match instance type - ${modulePath}`);
      }
    }

    return instance;
  }

  set(modulePath: string, closuer: Function, strict: boolean = false): Container {
    this.container = Object.assign({}, this.container, {
      [modulePath]: {
        strict,
        closuer,
      },
    });

    return this;
  }

  dump() {
    console.log(this.container);
  }
}

// Export as singleton instance
export default new Container();
