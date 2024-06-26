import { SWRConfig } from 'swr';
import { axiosApiInstance } from 'thely';

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<SWRConfig
			value={{
				fetcher: axiosApiInstance,
				revalidateOnFocus: false,
				revalidateOnReconnect: false,
				shouldRetryOnError: false,
				revalidateIfStale: false,
			}}
		>
			{children}
		</SWRConfig>
	);
};
