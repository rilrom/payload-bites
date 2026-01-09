import type { ReactNode } from "react";

interface LayoutProps {
	children: ReactNode;
}

export default async function Layout(props: LayoutProps) {
	const { children } = props;

	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
