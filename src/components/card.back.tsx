import { ChevronLeftCircle } from 'lucide-react';
import { CardContent } from '@/components/ui/card';
import { useRouter } from 'next/navigation';

const BackCard = () => {
	const router = useRouter();
	return (
		<CardContent
			onClick={() => router.push('/user/dashboard')}
			className={'pt-6'}
		>
			<ChevronLeftCircle className={'size-12'} />
			<h2
				className={'mt-4 text-2xl font-medium max-w-40 truncate text-ellipsis'}
			>
				Back
			</h2>
			<p className={'text-xs max-w-40 truncate text-ellipsis'}>
				to your dashboard
			</p>
		</CardContent>
	);
};

export default BackCard;
