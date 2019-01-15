import { Collection } from '../../..';

interface YieldingMethodTest<C, CB = void, I = void> {
  callback<CB>(cb: CB, calls?: any): YieldingMethodTest<C, CB, I>;
  run<I>(cb: (cb: CB) => C & Iterable<I>): YieldingMethodTest<C, CB, I>;
  expectCalls(): YieldingMethodTest<C, CB, I>;
}

interface MethodTest<C, CB = void, R = void> {
  callback<CB>(cb: CB, calls?: any): MethodTest<C, CB, R>;
  run(cb: (cb: CB) => R): MethodTest<C, CB, R>;
  expectCalls(calls: any): MethodTest<C, CB, R>;
  expectReturns<R>(returnValue: R): MethodTest<C, CB, R>;
  expectCollectionYields<I>(shouldYield: Iterable<I>): YieldingMethodTest<C, CB, I>;
}

declare function makeTestMethod<C>(CollectionConstructor: {
  prototype: C;
}): (name: string, cb: (mt: MethodTest<C>) => void) => void;

export default makeTestMethod;
