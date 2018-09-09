const { equals } = require('expect/build/jasmine_utils');

expect.extend({
  toBeIterable(received, argument) {
    let pass = Symbol.iterator in received;

    if (pass && argument && typeof argument.asymmetricMatch === 'function') {
      return { pass: argument.asymmetricMatch(received[Symbol.iterator]()), message: () => 'meh' };
    }

    return {
      message: () =>
        this.utils.matcherHint(`${pass ? '.not' : ''}.toBeIterable`) +
        '\n\n' +
        `expected${
          pass ? ' not' : ''
        } to find a [Symbol.iterator] property, but Symbol.iterator was:\n` +
        `  ${this.utils.printReceived(received)}`,
      pass,
    };
  },

  yields(received, ...args) {
    let pass = args.reduce((pass, arg) => {
      return pass && arg === received.next().value;
    }, true);
    const done = received.next();
    pass = pass && done.done;
    return {
      message: () => `Didn't do the thing.`,
      pass,
    };
  },

  yieldsEqual(received, ...args) {
    let pass = args.reduce((pass, arg) => {
      return pass && equals(arg, received.next().value);
    }, true);
    const done = received.next();
    pass = pass && done.done;
    return {
      message: () => `Didn't do the thing.`,
      pass,
    };
  },
});
