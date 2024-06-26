import { Skeleton } from '@/components/ui/skeleton';

const TableLoader = () => {
	return (
		<div className={'space-y-2'}>
			<Skeleton className={'h-10 w-full'} />
			<Skeleton className={'h-10 w-full'} />
		</div>
	);
};

export default TableLoader;
