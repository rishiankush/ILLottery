
import Welcome from "../containers/Welcome";
import Loader from "../components/common/Loader";
import Signup from "../containers/Signup";
import Login from "../containers/Login";

// export list of routes.
export default routes = {
	Loader : { screen: Loader },
	Welcome	: { screen: Welcome },
	Signup	: { screen: Signup },
	Login	: { screen: Login },
};
