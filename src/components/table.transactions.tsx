import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { useQuery } from 'thely/lib/hooks/useQuery';
import { PackageData, ShipmentData } from 'thely/types';
import { Skeleton } from '@/components/ui/skeleton';
import TableLoader from '@/components/loaders/tableLoader';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { differenceInDays, format } from 'date-fns';

const TransactionsTable = <
	T extends {
		id: string;
		status: string;
		updated_at: string;
		currency: string;
		amount: number;
		shipment: {
			id: string;
		};
	},
>({
	limit = 50,
	paginate = false,
}: {
	limit?: number;
	paginate?: boolean;
}) => {
	const [offset, setOffset] = useState(0);
	const { data, isLoading } = useQuery<T[]>(
		`customer/transaction?limit=${limit}&offset=${offset}`,
	);
	const [cache, setCache] = useState<T[]>([]);

	useEffect(() => {
		if (data) {
			setCache(data);
		}
	}, [data]);

	return (
		<Table>
			<TableCaption>A list of your transactions.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[150px]'>ID</TableHead>
					<TableHead className='w-[150px]'>Status</TableHead>
					<TableHead className='w-[150px]'>Cost</TableHead>
					<TableHead>Last Updated</TableHead>
					<TableHead className='text-right'>Shipment</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody
				className={cn(
					isLoading ? 'opacity-70' : 'opacity-100',
					'transition-opacity',
				)}
			>
				{cache.map((transaction) => {
					return (
						<TableRow
							className={
								'hover:bg-accent hover:cursor-pointer transition-colors'
							}
						>
							<TableCell className='font-medium'>{transaction.id}</TableCell>
							<TableCell>
								<p className={'label'}>{transaction.status}</p>
							</TableCell>
							<TableCell>
								<p className={'label'}>
									{transaction.currency} {Number(transaction.amount).toFixed(2)}
								</p>
							</TableCell>

							<TableCell className={''}>
								{differenceInDays(
									new Date(),
									new Date(transaction.updated_at),
								) <= 1
									? 'today'
									: `${differenceInDays(new Date(), new Date(transaction.updated_at))} days ago`}
							</TableCell>
							<TableCell className={'flex justify-end items-center gap-2'}>
								<p className={'label'}>{transaction.shipment.id} </p>
								<ExternalLink className={'size-4 text-accent-foreground'} />
							</TableCell>
						</TableRow>
					);
				})}
			</TableBody>
			{paginate ? (
				<TableFooter>
					<div className={'flex justify-between mt-2 w-full'}>
						<Button
							disabled={isLoading}
							onClick={() => setOffset((o) => (o - limit > 0 ? o - limit : 0))}
							className={'rounded-full'}
							variant={'outline'}
							size={'icon'}
						>
							<ChevronLeft />
						</Button>
						<Button
							disabled={isLoading}
							onClick={() => setOffset((o) => o + limit)}
							className={'rounded-full'}
							variant={'outline'}
							size={'icon'}
						>
							<ChevronRight />
						</Button>
					</div>
				</TableFooter>
			) : null}
		</Table>
	);
};

export default TransactionsTable;
