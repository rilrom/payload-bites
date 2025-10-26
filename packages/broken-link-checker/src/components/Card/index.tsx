import styles from "./index.module.scss";

interface CardProps {
  children: React.ReactNode;
}

export const Card = (props: CardProps) => {
  const { children } = props;

  return <div className={styles.card}>{children}</div>;
};
