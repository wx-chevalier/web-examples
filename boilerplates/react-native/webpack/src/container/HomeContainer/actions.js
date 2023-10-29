export function listIsLoading(bool: boolean) {
	return {
		type: "LIST_IS_LOADING",
		isLoading: bool,
	};
}
export function fetchListSuccess(list: Object) {
	return {
		type: "FETCH_LIST_SUCCESS",
		list,
	};
}
export function fetchList(url: any) {
	return dispatch => {
		dispatch(fetchListSuccess((url: any)));
		dispatch(listIsLoading(false));
	};
}
