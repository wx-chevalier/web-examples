import React from "react";
import Sidebar from "../index";
// Note: test renderer must be required after react-native.
import renderer from "react-test-renderer";

const navigation = { navigate: jest.fn() };

it("renders correctly", () => {
	const tree = renderer.create(<Sidebar navigation={navigation} />).toJSON();
	expect(tree).toMatchSnapshot();
});
