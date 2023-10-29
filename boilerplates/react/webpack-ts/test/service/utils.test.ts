import { sum } from '../../src/service/utils';

describe('test', () => {
  it('adds 1 + 2 to equal 3 in TScript', () => {
    expect(sum(1, 2)).toBe(3);
  });

  it('adds 1 + 2 to equal 3 in JavaScript', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
