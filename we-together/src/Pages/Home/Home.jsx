import React from "react";
import styles from "./Home.module.css";
import { Link, useHistory } from "react-router-dom";
import Card from "../../components/shared/Navigation/Card/Card";
import Button from "../../components/shared/Button/Button";

const Home = () => {
  const signInLinkStyle = {
    color: "#0077ff",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };

  const history = useHistory();
  function startRegist() {
    history.push("/authenticate");
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to We-Together!" icon="Emoji">
        <p className={styles.text}>
          We’re working hard to get Codershouse ready for everyone! While we
          wrap up the finishing youches, we’re adding people gradually to make
          sure nothing breaks :)
        </p>

        <div>
          <Button onClick={startRegist} text="Let's Go"></Button>
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
        </div>
      </Card>
    </div>
  );
};

export default Home;
