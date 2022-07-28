import React from "react";
import Card from "../../../components/shared/Navigation/Card/Card";
import Button from "../../../components/shared/Button/Button";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setName } from "../../../store/activateSlice";
import styles from "./StepName.module.css";
import TextInput from "../../../components/shared/TextInput/TextInput";

const StepName = ({ onNext }) => {
  const { name } = useSelector((state) => state.activate);
  const dispatch = useDispatch();
  const [fullname, setFullname] = useState(name);

  function nextStep() {
    if (!fullname) {
      return;
    }

    dispatch(setName(fullname));
    onNext();
  }

  return (
    <>
      <Card title="What's your full name?" icon="smart_logo">
        <TextInput
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />
        <p className={styles.paragraph}>
          People use real names at codershouse :)
        </p>
        <div>
          <Button text="Next" onClick={nextStep}></Button>
        </div>
      </Card>
    </>
  );
};

export default StepName;
