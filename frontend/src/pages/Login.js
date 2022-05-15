import { useEffect, useState } from "react";
import { useAuthActions, useAuthState } from "use-eazy-auth";

export default function Login() {
    const { loginLoading, loginError } = useAuthState()
    const { login, clearLoginError } = useAuthActions()

    // clear login error 
    useEffect(() => () => clearLoginError(), [clearLoginError])

    const [username, setUsername] = useState("")
    const [password, setpassword] = useState("")

    return (
        <form
            className="row mt-5 p-2"
            onSubmit={e => {
                e.preventDefault()
                if (username !== "" && password !== "") {
                    login({ username, password })
                }
            }}
        >
            <div className="col-md-4 offset-md-4">
                <div className="mb-3">
                    <h1>Sales Api</h1>
                    <h2 className="mt-4">Please Log In</h2>
                </div>
                <div className="form-group">
                    <input
                        placeholder="@username"
                        className="form-control"
                        type="text"
                        value={username}
                        onChange={e => {
                            clearLoginError()
                            setUsername(e.target.value)
                        }}
                    />
                </div>
                <br></br>
                <div className="form-group">
                    <input
                        placeholder="password"
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={e => {
                            clearLoginError()
                            setpassword(e.target.value)
                        }}
                    />
                </div>
                <br></br>
                <button className="btn btn-light" disabled={loginLoading}>
                    {!loginLoading ? "Login!" : "Logged in..."}
                </button>
                {loginError && (
                    <div className="alert alert-danger mt-3">
                        Wrong combination of username and password
                    </div>
                )}
            </div>
        </form>
    )

}

