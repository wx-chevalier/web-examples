import * as React from 'react';
import * as enzyme from 'enzyme';
import Enthusiasm from '../src/module/redux/component/Enthusiasm';

it('renders the correct text when no enthusiasm level is given', () => {
  const enthusiasm = enzyme.shallow(<Enthusiasm name="Daniel" />);
  expect(enthusiasm.find('.greeting').text()).toEqual('Enthusiasm Daniel!');
});

it('renders the correct text with an explicit enthusiasm of 1', () => {
  const enthusiasm = enzyme.shallow(<Enthusiasm name="Daniel" enthusiasmLevel={1} />);
  expect(enthusiasm.find('.greeting').text()).toEqual('Enthusiasm Daniel!');
});

it('renders the correct text with an explicit enthusiasm level of 5', () => {
  const enthusiasm = enzyme.shallow(<Enthusiasm name="Daniel" enthusiasmLevel={5} />);
  expect(enthusiasm.find('.greeting').text()).toEqual('Enthusiasm Daniel!!!!!');
});

it('throws when the enthusiasm level is 0', () => {
  expect(() => {
    enzyme.shallow(<Enthusiasm name="Daniel" enthusiasmLevel={0} />);
  }).toThrow();
});

it('throws when the enthusiasm level is negative', () => {
  expect(() => {
    enzyme.shallow(<Enthusiasm name="Daniel" enthusiasmLevel={-1} />);
  }).toThrow();
});
