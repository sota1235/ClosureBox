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

class Container {
  container: RegistedInstance;
  strictCheck: boolean;

  constructor() {
    this.strictCheck = false;
  }

  get<T>(modulePath: string): T {
    const value: InstanceInfo = this.container[modulePath];

    if (!value) {
      throw new Error(`Instance not found - ${modulePath}`);
    }

    const instance: T = value.closuer(this);

    if (value.strict && this.strictCheck) {
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

  enableStrictChecking(): void {
    this.strictCheck = true;
    return this;
  }

  dump(): void {
    console.log(this.container);
  }
}

// Export as singleton instance
export default new Container();
