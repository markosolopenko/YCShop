import { ReactComponent as DeleteIcon } from "../../assets/trash-alt-solid.svg";
import s from "./DeleteButton.module.scss";
import { TDeleteButton } from "./types";

export const DeleteButton: React.FC<TDeleteButton> = ({ onClick }) => {
  return (
    <button className={s["delete-btn"]} onClick={onClick}>
      <DeleteIcon className={s["delete-btn__icon"]} />
    </button>
  );
};
