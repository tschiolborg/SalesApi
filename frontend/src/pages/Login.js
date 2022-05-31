import { useEffect, useState } from "react";
import { useAuthActions, useAuthState } from "use-eazy-auth";
import logo from "../logo2.png"

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
                    <img src={logo} className="logo_front_page" />
                    <h4 className="mt-4">Veuillez vous connecter</h4>
                </div>
                <div className="form-group">
                    <input
                        placeholder="nom d'utilisateur"
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
                        placeholder="mot de passe"
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
                    {!loginLoading ? "Connexion!" : "Connecté..."}
                </button>
                {loginError && (
                    <div className="alert alert-danger mt-3">
                        Mauvaise combinaison de nom d'utilisateur et de mot de passe.
                    </div>
                )}
            </div>
        </form>
    )

}

