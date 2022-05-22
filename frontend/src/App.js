import { BrowserRouter as Router, Switch } from "react-router-dom";
import Auth, { useAuthActions } from "use-eazy-auth";
import { AuthRoute, GuestRoute } from "use-eazy-auth/routes";
import { ConfigureRj } from "react-rocketjump";
import { map } from "rxjs/operators";
import { ajax } from "rxjs/ajax";
import Login from "./pages/Login";
import Products from "./pages/Products";
import Summary from "./pages/Summary";
import EndOfDay from "./pages/EndOfDay";

const login = (credentials = {}) =>
  ajax({
    url: "/token/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  }).pipe(
    map(({ response }) => ({
      accessToken: response.access,
      refreshToken: response.refresh,
    }))
  )

const me = token =>
  ajax.getJSON("/me/", {
    Authorization: `Bearer ${token}`,
  })

const refresh = refreshToken =>
  ajax({
    url: "/token/refresh/",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: { refresh: refreshToken },
  }).pipe(
    map(({ response }) => ({
      refreshToken,
      accessToken: response.access,
    }))
  )

function ConfigureAuth({ children }) {
  const { callAuthApiObserverable } = useAuthActions()
  return (
    <ConfigureRj effectCaller={callAuthApiObserverable}>{children}</ConfigureRj>
  )
}

export default function App() {
  return (
    <Auth loginCall={login} meCall={me} refreshTokenCall={refresh}>
      <ConfigureAuth>
        <Router>
          <Switch>
            <GuestRoute path="/login" redirectTo="/">
              <Login />
            </GuestRoute>
            <AuthRoute path="/" exact redirectTo="/login">
              <Products />
            </AuthRoute>
            <AuthRoute path="/summary" exact redirectTo="/login">
              <Summary />
            </AuthRoute>
            <AuthRoute path="/end-of-day" exact redirectTo="/login">
              <EndOfDay />
            </AuthRoute>
          </Switch>
        </Router>
      </ConfigureAuth>
    </Auth>
  )
}
