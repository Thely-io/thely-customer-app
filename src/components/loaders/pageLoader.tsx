import { Skeleton } from '@/components/ui/skeleton';

const PageLoader = () => (
	<div className={'flex gap-2 w-40 m-auto mt-20'}>
		<Skeleton className={'size-1 m-auto'} />
		<Skeleton className={'size-1 m-auto'} />
		<Skeleton className={'size-1 m-auto'} />
		<Skeleton className={'size-1 m-auto'} />
		<Skeleton className={'size-1 m-auto'} />
	</div>
);

export default PageLoader;
