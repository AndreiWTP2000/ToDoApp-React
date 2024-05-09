import { useState } from "react";
import { useCookies } from "react-cookie";
import Loading from "./Loader";
const Auth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null);
  const [error, setError] = useState(null);
  const [isLogIn, setIsLogIn] = useState(true);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loader, setLoader] = useState(false);
  const viewLogIn = (status) => {
    setIsLogIn(status);
    setError(null);
  };

  const handleSubmit = async (e, endpoint) => {
    setLoader(true);
    e.preventDefault();
    if (!isLogIn && password !== confirmPassword) {
      setError("Make sure the passwords match!");
      setTimeout(() => {
        setLoader(false);
      }, 500);
      return;
    }

    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const data = await response.json();
    if (data.detail) {
      setError(data.detail);
      setTimeout(() => {
        setLoader(false);
      }, 500);
    } else {
      setCookie("Email", data.email);
      setCookie("AuthToken", data.token);
      setTimeout(() => {
        setLoader(false);
      }, 500);

      window.location.reload();
    }
  };
  return (
    <>
      {loader && <Loading />}
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
              <div
                className="card bg-dark text-white"
                style={{ borderRadius: "1rem" }}
              >
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">
                      {isLogIn ? "Log In" : "Sign Up"}
                    </h2>
                    <p className="text-white-50 mb-5">
                      {isLogIn
                        ? "Please enter your login and password!"
                        : "Please create your account."}
                    </p>
                    <form>
                      <div className="form-outline form-white mb-4">
                        <input
                          type="email"
                          id="typeEmailX"
                          className="form-control form-control-lg"
                          placeholder="Email"
                          onChange={(e) => setEmail(e.target.value)}
                          pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                          title="Please enter a valid email address."
                        />
                        <label className="form-label" htmlFor="typeEmailX">
                          Email
                        </label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          id="PasswordX"
                          className="form-control form-control-lg"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                        />
                        <label className="form-label" htmlFor="PasswordX">
                          Password
                        </label>
                      </div>
                      {!isLogIn && (
                        <div className="form-outline form-white mb-4">
                          <input
                            type="password"
                            className="form-control form-control-lg"
                            placeholder="Confirm Password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                          />
                          <label
                            className="form-label"
                            htmlFor="confirmPasswordX"
                          >
                            Confirm Password
                          </label>
                        </div>
                      )}

                      <button
                        className="btn btn-outline-light btn-lg px-5"
                        type="submit"
                        onClick={(e) => {
                          handleSubmit(e, isLogIn ? "login" : "signup");
                          setPassword("");
                          setConfirmPassword("");
                        }}
                      >
                        {isLogIn ? "Log In" : "Sign Up"}
                      </button>
                      <p className="text-danger">{error ? error : " "}</p>
                    </form>
                  </div>
                  <div>
                    <p className="mb-0">
                      {isLogIn
                        ? "Don't have an account?"
                        : "Already have an account?"}
                      <a
                        href="#"
                        className="text-white-50 fw-bold"
                        onClick={() => {
                          setIsLogIn((prevIsLogIn) => !prevIsLogIn);
                          setError(null);
                        }}
                      >
                        {isLogIn ? "Sign Up" : "Log In"}
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
