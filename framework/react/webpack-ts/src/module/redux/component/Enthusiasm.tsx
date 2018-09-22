import * as React from 'react';

import './Enthusiasm.scss';

export interface Props {
  name: string;
  enthusiasmLevel?: number;
  onIncrement?: () => void;
  onDecrement?: () => void;
}

export default class Enthusiasm extends React.Component<Props> {
  static defaultProps = {
    enthusiasmLevel: 0
  };

  render() {
    const { enthusiasmLevel, name, onDecrement, onIncrement } = this.props;

    if (!enthusiasmLevel) {
      return;
    }

    if (enthusiasmLevel <= 0) {
      throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
      <div className="enthu">
        <div className="greeting">Hello {name + getExclamationMarks(enthusiasmLevel)}</div>
        <div>
          <button onClick={onDecrement}>-</button>
          <button onClick={onIncrement}>+</button>
        </div>
      </div>
    );
  }
}

// helpers
function getExclamationMarks(numChars: number) {
  return Array(numChars + 1).join('!');
}
