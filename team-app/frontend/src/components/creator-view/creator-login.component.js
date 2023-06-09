import { Component } from "react";
import Swal from "sweetalert2";
import "../Styles.css";

export default class creatorLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    const { email, password } = this.state;
    console.log('handleSubmit email=' + email + ' password=' + password);
    if(window.localStorage.getItem("activityEmail")){ // check email in localstorage
      window.localStorage.removeItem("activityEmail"); // remove old email
      window.localStorage.setItem("activityEmail",email)
    }else{
      window.localStorage.setItem("activityEmail",email)
    }

    fetch("http://localhost:5000/creatorUsers/login-creator", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "creatorReg");
        if (data.status === "ok") {
          Swal.fire({
            title: "Login Successfully",
            showConfirmButton: true,
          }).then((result) => {
            if (result.isConfirmed) {
              window.localStorage.setItem("token", data.data);

              window.location = "/activitylist/";
              var code = window.localStorage.getItem("ActCode");
              console.log("Codell : ", code);
              // axios.get("http://localhost:5000/activity/").then((res) => {
              //   let i;
              //   for (i = 0; i < res.data.length; i++) {
              //     if (code === encodeNumber(res.data[i].actName)) {
              //       // window.location = "/creatorActivityId/" + res.data[i]._id;
              //       break;
              //     } else {
              //     }
              //   }
              // });
              // console.log(window.localStorage.getItem("token"));
            }
          });
        } else if (data.status === "error") {
          Swal.fire({
            title: "Login Failed",
            showConfirmButton: true,
          });
        }
      });
  }
  render() {
    return (
      <main>
        <div className="px-40 mt-20 ">
          <div className="row" class="flex justify-center w-auto bg-white shadow">
            <div className="column bg-FAE7E7 shadow">
              <div class="center">
                <br></br> <br></br><br></br>
                <div className="text-36px">want to create a</div>
                <div class="text-48px color-E22637">NEW ACTIVITY?</div>         
                <div className="text-24px">&nbsp;You must log in first!</div>
              </div>
            </div>

            <div className="column">
              <div class="vl"></div>
              <div class="forms">
                <div class="form-content">
                  <div class="signup-form">
                    <div class="title">Log In</div>
                    <form onSubmit={this.handleSubmit}>
                      <div class="input-boxes">
                        <div class="input-box">
                          <input
                            type="text"
                            placeholder="Enter your email"
                            required
                            autoComplete="off"
                            onChange={(e) => 
                              this.setState({ email: e.target.value })
                            }
                          ></input>
                        </div>

                        <div class="input-box">
                          <input
                            placeholder="Enter your password"
                            
                            type="password"
                  required
                  onChange={(e) => this.setState({ password: e.target.value })}></input>
                        </div>

                        <div class="button input-box">
                          <input type="submit" value="Submit"></input>
                        </div>
                        <div class="text sign-up-text">
                          Don't have an account yet?&nbsp;
                          <a
                            className="underline text-blue-400"
                            href="/creatorSignup"
                          >
                            Sign up now
                          </a>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }
}
