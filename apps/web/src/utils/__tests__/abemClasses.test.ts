import { expect } from '@jest/globals';

import { abemClasses } from '../abemClasses';

describe('abemClasses', () => {
  it('joins values of class names and ignore falsy values', () => {
    expect(abemClasses('a-root', false, undefined, 'modifier')).toEqual('a-root -modifier');
  });

  it('should be trimmed', () => {
    expect(abemClasses('a-root', ' ')).toEqual('a-root');
    expect(abemClasses('a-root', 'modifier ')).toEqual('a-root -modifier');
    expect(abemClasses('a-root ', 'modifier')).toEqual('a-root -modifier');
  });
});
