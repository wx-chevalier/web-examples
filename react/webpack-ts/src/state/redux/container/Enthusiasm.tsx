import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import Enthusiasm, { Props } from '../component/Enthusiasm';

import * as actions from '../action';
import { StoreState } from '../store';

export function mapStateToProps({ enthusiasmLevel, languageName }: StoreState) {
  return {
    enthusiasmLevel,
    name: languageName
  };
}

export function mapDispatchToProps(dispatch: Dispatch<actions.EnthusiasmAction>) {
  return {
    onIncrement: () => dispatch(actions.incrementEnthusiasm()),
    onDecrement: () => dispatch(actions.decrementEnthusiasm())
  };
}

export default connect<Partial<Props>>(
  mapStateToProps,
  mapDispatchToProps
)(Enthusiasm);
