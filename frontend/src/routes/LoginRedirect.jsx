import React, { useEffect, useContext } from "react";
import { UserContext } from "../context";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginRedirect = () => {
  const { user, setUser } = useContext(UserContext);
  let navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      axios
        .get("/user_logged_in")
        .then((res) => {
          let data = res.data;
          // setting user from login data
          if (data.netid) {
            setUser({ netid: data.netid, admin: data.admin });
          }
        })
        .catch((error) => {
          console.log(error);
        });
      navigate("/search");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      If this page doesn't redirect in a couple seconds, click{" "}
      <a href="/">here</a>
    </div>
  );
};

export default LoginRedirect;
