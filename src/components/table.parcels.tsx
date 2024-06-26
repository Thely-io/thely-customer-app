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
import { PackageData } from 'thely/types';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { differenceInDays } from 'date-fns';

const ParcelsTable = ({
	limit = 50,
	paginate = false,
}: {
	limit?: number;
	paginate?: boolean;
}) => {
	const [offset, setOffset] = useState(0);
	const { data, isLoading } = useQuery<[PackageData[], number]>(
		`customer/parcel?limit=${limit}&offset=${offset}`,
	);
	const [cache, setCache] = useState<PackageData[]>([]);

	useEffect(() => {
		if (data) {
			if (data[1] > 0) {
				setCache(data[0]);
			}
		}
	}, [data]);

	return (
		<Table>
			<TableCaption>A list of your incoming parcels.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className='w-[100px]'>ID</TableHead>
					<TableHead className='w-[100px]'>Status</TableHead>
					<TableHead>Received</TableHead>
					<TableHead className='text-right'>Warehouse</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody
				className={cn(
					isLoading ? 'opacity-70' : 'opacity-100',
					'transition-opacity',
				)}
			>
				{cache.map((parcel) => {
					return (
						<TableRow
							className={
								'hover:bg-accent hover:cursor-pointer transition-colors'
							}
						>
							<TableCell className='font-medium'>{parcel.id}</TableCell>
							<TableCell>
								<p className={'label'}>{parcel.status}</p>
							</TableCell>
							<TableCell>
								{differenceInDays(new Date(), new Date(parcel.receivedOn)) <= 1
									? 'today'
									: `${differenceInDays(new Date(), new Date(parcel.receivedOn))} days ago`}
							</TableCell>
							<TableCell className='text-right uppercase'>
								<p className={'label'}>
									{parcel.warehouse.address.state}
									{' - '}
									{parcel.warehouse.address.country}
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

export default ParcelsTable;
