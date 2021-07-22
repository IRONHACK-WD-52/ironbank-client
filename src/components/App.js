import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../routeComponents/Home";
import AuthRouter from "../routeComponents/auth/AuthRouter";

import { AuthContextComponent } from "../contexts/authContext";

import Profile from "../routeComponents/auth/Profile";
import EditProfile from "../routeComponents/auth/EditProfile";
import ProtectedRoute from "../routeComponents/auth/PrivateRoute";

import CreateAccount from "../routeComponents/account/CreateAccount";
import AccountDetails from "../routeComponents/account/AccountDetails";
import DeleteAccount from "../routeComponents/account/DeleteAccount";
import CreateCard from "../routeComponents/account/CreateCard";
import CardDetails from "../routeComponents/account/CardDetails";

import CreateTransaction from "../routeComponents/transaction/CreateTransaction";
import AllTransactions from "../routeComponents/transaction/AllTransactions";

function App() {
  return (
    <BrowserRouter>
      <AuthContextComponent>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/auth" component={AuthRouter} />
          <ProtectedRoute exact path="/profile" component={Profile} />
          <ProtectedRoute exact path="/profile/edit" component={EditProfile} />
          <ProtectedRoute
            exact
            path="/account/create"
            component={CreateAccount}
          />
          <Route exact path="/account/:id" component={AccountDetails} />
          <ProtectedRoute
            exact
            path="/:accountId/transaction/create"
            component={CreateTransaction}
          />
          <ProtectedRoute
            exact
            path="/:accountId/transaction"
            component={AllTransactions}
          />
          <ProtectedRoute
            exact
            path="/account/:id/delete"
            component={DeleteAccount}
          />
          <ProtectedRoute
            exact
            path="/:accountId/card/create"
            component={CreateCard}
          />
          <ProtectedRoute
            exact
            path="/:accountId/card"
            component={CardDetails}
          />
        </Switch>
      </AuthContextComponent>
    </BrowserRouter>
  );
}

export default App;
