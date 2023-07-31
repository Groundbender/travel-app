import React from "react";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <Button
      type="back"
      onClick={(e: React.SyntheticEvent) => {
        e.preventDefault();
        navigate(-1);
      }}
    >
      &larr;Back
    </Button>
  );
};

export default BackButton;
