import React from "react";
import MetaData from "../layout/MetaData";

const Login = () => {
  return (
    <>
      <MetaData http-equiv="Content-Security-Policy"   title={"Login"} />
      <div class="row wrapper">
        <div class="col-10 col-lg-5">
          <form
            class="shadow rounded bg-body"
            action="your_submit_url_here"
            method="post"
          >
            <h2 class="mb-4">Login</h2>
            <div class="mb-3">
              <label for="email_field" class="form-label">Email</label>
              <input
                type="email"
                id="email_field"
                class="form-control"
                name="email"
                value=""
              />
            </div>

            <div class="mb-3">
              <label for="password_field" class="form-label">Password</label>
              <input
                type="password"
                id="password_field"
                class="form-control"
                name="password"
                value=""
              />
            </div>

            <a href="/password/forgot" class="float-end mb-4">Forgot Password?</a>

            <button id="login_button" type="submit" class="btn w-100 py-2">
              LOGIN
            </button>

            <div class="my-3">
              <a href="/register" class="float-end">New User?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;