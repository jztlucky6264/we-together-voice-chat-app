import React from "react";
import Card from "../../../components/shared/Navigation/Card/Card";
import Button from "../../../components/shared/Button/Button";
import styles from "./StepAvatar.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";

const StepAvatar = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);
  const [image, setImage] = useState("/images/avatar.png");

  function captureImage(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    setImage(e.target.value);
  }
  function submit() {}

  return (
    <>
      <Card title={`Okey, ${name}`} icon="monkey_emoji">
        <p className={styles.subHeading}>How’s this photo?</p>
        <div className={styles.avatarWrapper}>
          <img className={styles.avatarImage} src={image} alt="avatar" />
        </div>
        <div>
          <input
            onChange={captureImage}
            id="avatarInput"
            type="file"
            className={styles.avatarInput}
          />
          <label className={styles.avatarLabel} htmlFor="avatarInput">
            choose a different photo
          </label>
        </div>

        <div>
          <Button text="Next" onClick={submit}></Button>
        </div>
      </Card>
    </>
  );
};

export default StepAvatar;
