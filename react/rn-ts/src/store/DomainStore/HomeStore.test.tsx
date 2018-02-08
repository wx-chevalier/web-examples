import HomeStore from "./HomeStore";
import data from "../../container/HomeContainer/data";

describe("HomeStore", () => {
	it("should handle FETCH_LIST_SUCCESS", () => {
		const store = new HomeStore();
		store.fetchItems(data);
		const expectedArray = [
			"React Native Starter Kit",
			"React Navigation",
			"NativeBase Easy Grid",
			"NativeBase",
			"CodePush",
			"Redux",
		];
		var actualJSON = JSON.stringify(store.items);
		var expectedJSON = JSON.stringify(expectedArray);
		expect(expectedJSON).toEqual(actualJSON);
	});
});
