/* eslint-disable @typescript-eslint/no-explicit-any */
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  type?: string;
}
const Button: React.FC<ButtonProps> = ({ children, onClick, type }) => {
  return (
    <button onClick={onClick} className={`${styles.button} ${styles.type}`}>
      {children}
    </button>
  );
};

export default Button;
