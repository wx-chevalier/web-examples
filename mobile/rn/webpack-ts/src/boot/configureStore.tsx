import MainStore from "../store/DomainStore/HomeStore";
import LoginStore from "../store/ViewStore/LoginViewStore";

export default function() {
	const mainStore = new MainStore();
	const loginForm = new LoginStore();

	return {
		loginForm,
		mainStore,
	};
}
