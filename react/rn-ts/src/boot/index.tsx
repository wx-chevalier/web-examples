import config from "./configureStore";
import app from "./setup";

export default function() {
	const stores = config();
	return app(stores);
}
