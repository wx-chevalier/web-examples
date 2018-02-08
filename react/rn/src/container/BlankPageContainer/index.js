// @flow
import * as React from "react";
import BlankPage from "../../stories/screens/BlankPage";
export interface Props {
	navigation: any,
}
export interface State {}
export default class BlankPageContainer extends React.Component<Props, State> {
	render() {
		return <BlankPage navigation={this.props.navigation} />;
	}
}
