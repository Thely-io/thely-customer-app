import { useInit } from 'thely/lib/hooks/useInit';
import { useEffect, useState } from 'react';
import { saveInternalSessionToken, saveUserSessionToken } from 'thely';
import { getCookie } from 'cookies-next';

export const InternalProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => {
	const { data } = useInit(process.env.NEXT_PUBLIC_THELY_ID || '0');
	const [ready, setReady] = useState(0);

	useEffect(() => {
		if (data) saveInternalSessionToken(data).then(() => setReady(1));
	}, [data]);

	useEffect(() => {
		if (ready === 1) {
			const token = getCookie('thely-token');
			if (token) {
				saveUserSessionToken(token).then(() => setReady(2));
			} else {
				setReady(2);
			}
		}
	}, [ready]);

	return ready === 2 ? <>{children}</> : null;
};
