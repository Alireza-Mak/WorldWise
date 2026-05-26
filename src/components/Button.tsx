import styles from "./Button.module.css";
type Props = {
    children: React.ReactNode;
    OnBtnClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    type?: string;
};

const Button = ({ children, OnBtnClick, type }: Props) => {
    return (
        <button
            onClick={OnBtnClick}
            className={`${styles.btn} ${styles[type!]}`}
        >
            {children}
        </button>
    );
};
export default Button;
