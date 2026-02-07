import styles from "./index.module.scss";

interface LoadingProps {
	className?: string;
}

export const Loading = (props: LoadingProps) => {
	const { className = "" } = props;

	return (
		<div className={`${styles.wrapper} ${className}`}>
			<output className={styles.loading} aria-label="Loading"></output>
		</div>
	);
};
