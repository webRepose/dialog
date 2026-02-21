import Style from "../styles/s-components/choicebtn.module.scss";

const ChoiceButton = ({ option, onClick }) => {
  return (
    <button
      className={Style.button}
      onClick={onClick}
    >
      {option.text}
    </button>
  );
};

export default ChoiceButton;
