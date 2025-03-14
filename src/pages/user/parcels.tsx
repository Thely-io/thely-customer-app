import PublicLayout from '@/layouts/public';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Banknote,
	BoxesIcon,
	BoxIcon,
	ChevronLeftCircle,
	InfoIcon,
	LucideProps,
	Mailbox,
	Newspaper,
	PlaneTakeoff,
	ShieldQuestionIcon,
	UserCircleIcon,
} from 'lucide-react';
import { useMe } from 'thely/lib/hooks/useMe';
import { Skeleton } from '@/components/ui/skeleton';
import PageLoader from '@/components/loaders/pageLoader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
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
import Link from 'next/link';
import { useQuery } from 'thely/lib/hooks/useQuery';
import ParcelsTable from '@/components/table.parcels';
import ShipmentsTable from '@/components/table.shipments';
import { useRouter } from 'next/navigation';
import NavigationCard from '@/components/card.nav';

const DashboardPage = () => {
	const { me } = useMe();
	const router = useRouter();
	return me ? (
		<PublicLayout>
			<Alert>
				<InfoIcon className={'size-5'} />
				<AlertTitle>Heads up!</AlertTitle>
				<AlertDescription>
					We are currently in the beta phase. Please report any bugs or issues
					you encounter.
				</AlertDescription>
			</Alert>
			<div className={'grid-cols-12 grid gap-4 mt-4'}>
				<Card
					className={
						'col-span-3 bg-accent hover:cursor-pointer transition-colors'
					}
				>
					<CardContent
						onClick={() => router.push('/user/dashboard')}
						className={'pt-6'}
					>
						<ChevronLeftCircle className={'size-12'} />
						<h2
							className={
								'mt-4 text-2xl font-medium max-w-40 truncate text-ellipsis'
							}
						>
							Back
						</h2>
						<p className={'text-xs max-w-40 truncate text-ellipsis'}>
							to your dashboard
						</p>
					</CardContent>
				</Card>
				<Card className={'col-span-9 overflow-y-auto'}>
					<NavigationCard />
				</Card>
				<Card className={'col-span-12'}>
					<CardHeader>
						<CardTitle>Your Parcels</CardTitle>
					</CardHeader>
					<CardContent>
						<ParcelsTable limit={7} paginate={true} />
					</CardContent>
				</Card>
			</div>
		</PublicLayout>
	) : (
		<PageLoader />
	);
};

export default DashboardPage;
