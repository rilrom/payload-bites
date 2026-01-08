import styles from "./index.module.scss";

interface LoadingProps {
	className?: string;
}

export const Loading = (props: LoadingProps) => {
	const { className = "" } = props;

	return (
		<div className={`${styles.wrapper} ${className}`}>
			<div className={styles.loading} role="status" aria-label="Loading"></div>
		</div>
	);
};
