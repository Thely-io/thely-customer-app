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
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { differenceInDays, format } from 'date-fns';

const ShipmentsTable = <T extends ShipmentData>({
	limit = 50,
	paginate = false,
}: {
	limit?: number;
	paginate?: boolean;
}) => {
	const [offset, setOffset] = useState(0);
	const { data, isLoading } = useQuery<[T[], number]>(
		`customer/shipment?limit=${limit}&offset=${offset}`,
	);
	const [cache, setCache] = useState<T[]>([]);

	useEffect(() => {
		if (data) {
			if (data[1] > 0) {
				setCache(data[0]);
			}
		}
	}, [data]);

	return (
		<Table>
			<TableCaption>A list of your outgoing shipments.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[150px]'>ID</TableHead>
					<TableHead className='w-[150px]'>Status</TableHead>
					<TableHead>Last Updated</TableHead>
					<TableHead className='text-right'>Cost</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody
				className={cn(
					isLoading ? 'opacity-70' : 'opacity-100',
					'transition-opacity',
				)}
			>
				{cache.map((shipment) => {
					return (
						<TableRow
							className={
								'hover:bg-accent hover:cursor-pointer transition-colors'
							}
						>
							<TableCell className='font-medium'>{shipment.id}</TableCell>
							<TableCell>
								<p className={'label'}>{shipment.status}</p>
							</TableCell>
							<TableCell>
								{differenceInDays(new Date(), new Date(shipment.updated_at)) <=
								1
									? 'today'
									: `${differenceInDays(new Date(), new Date(shipment.updated_at))} days ago`}
							</TableCell>
							<TableCell className='text-right'>
								<p className={'label'}>
									{shipment.selected_rate.retail_currency}{' '}
									{shipment.selected_rate.retail_rate}
								</p>
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

export default ShipmentsTable;
