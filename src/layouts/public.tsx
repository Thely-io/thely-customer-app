import { ReactNode, useEffect } from 'react';
import { NavBar } from '@/components/nav';

const PublicLayout = ({ children }: { children: ReactNode }) => {
	return (
		<main>
			<NavBar />
			<div className={'container pt-4'}>{children}</div>
		</main>
	);
};

export default PublicLayout;
