import styles from "./Button.module.css";
interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type: "primary" | "back" | "position";
}
const Button: React.FC<ButtonProps> = ({ children, onClick, type }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.btn} ${type ? styles[type] : ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
