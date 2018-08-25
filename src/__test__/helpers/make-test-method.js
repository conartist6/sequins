class MethodTest {
  constructor(ConstructorType, testName) {
    this._testName = testName;
    this._ConstructorType = ConstructorType;
  }

  callback(method, calls) {
    this._method = method;
    this._methodMock = jest.fn(method);
    if (arguments.length > 1) {
      this._calls = calls;
    }
    return this;
  }

  expectCalls(calls) {
    this._calls = calls;
    return this;
  }

  run(callback) {
    this._runCallback = callback;

    return this;
  }

  expectCollectionYields(values) {
    this._expectedCollectionValues = values;
    return this;
  }

  expectReturns(returns) {
    this._expectedReturn = returns;
    return this;
  }

  __exec() {
    if (this._runCallback.length > 0 && !('_method' in this)) {
      throw new Error('run() called without any callback()');
    }

    const result = this._runCallback(this._methodMock);
    this._checkCollectionYields(result);
    this._checkReturn(result);
    this._checkCalls();
  }

  _checkReturn(result) {
    if (this.hasOwnProperty('_expectedReturn')) {
      expect(result).toEqual(this._expectedReturn);
    }
  }

  _checkCollectionYields(result) {
    if (this.hasOwnProperty('_expectedCollectionValues')) {
      expect(result).toBeInstanceOf(this._ConstructorType);
      expect(result).toBeIterable();
      expect(Array.from(result)).toEqual(Array.from(this._expectedCollectionValues));
    }
  }

  _checkCalls() {
    if (this.hasOwnProperty('_calls')) {
      expect(this._methodMock.mock.calls).toEqual(this._calls);
    }
  }
}

// Create a DSL on top of Jasmine in order to ensure there is one syntax
// in which test case can be written which will make reasonable assertions
// about a method's behavior both when it is being called on a Concrete type
// and when it is being called on a Sequence.
export default ConstructorType => {
  function testMethod(methodName, it = global.it) {
    const methodTest = new MethodTest(ConstructorType, methodName);

    it('can ' + methodName, function() {
      methodTest.__exec();
    });

    return methodTest;
  }

  testMethod.skip = function(methodName) {
    return testMethod(methodName, it.skip);
  };
  testMethod.only = function(methodName) {
    return testMethod(methodName, it.only);
  };
  return testMethod;
};
