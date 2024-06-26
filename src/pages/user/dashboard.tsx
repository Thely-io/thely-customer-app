import PublicLayout from '@/layouts/public';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Banknote,
	BoxesIcon,
	BoxIcon,
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
import NavigationCard from '@/components/card.nav';

const Routes: {
	path: string;
	icon: React.ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
	>;
	title: string;
}[] = [
	{
		path: '/user/parcels',
		title: 'Parcels',
		icon: BoxIcon,
	},
	{
		path: '/user/shipments',
		title: 'Shipments',
		icon: PlaneTakeoff,
	},
	{
		path: '/user/billing',
		title: 'Billing',
		icon: Banknote,
	},
	{
		path: '/user/mailboxes',
		title: 'Mailboxes',
		icon: Mailbox,
	},
	{
		path: '/user/addresses',
		title: 'Addresses',
		icon: Newspaper,
	},
	{
		path: '/user/profile',
		title: 'Profile',
		icon: UserCircleIcon,
	},
	{
		path: '/user/support',
		title: 'Support',
		icon: ShieldQuestionIcon,
	},
];

const DashboardPage = () => {
	const { me } = useMe();
	const { data } = useQuery('customer/parcel');
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
						'col-span-3 hover:bg-accent hover:cursor-pointer transition-colors'
					}
				>
					<CardContent className={'pt-6'}>
						<UserCircleIcon className={'size-12'} />
						<h2
							className={
								'mt-4 text-2xl font-medium max-w-40 truncate text-ellipsis'
							}
						>
							{me.firstname}
						</h2>
						<p className={'text-xs max-w-40 truncate text-ellipsis'}>
							{me.email}
						</p>
					</CardContent>
				</Card>
				<Card className={'col-span-9 overflow-y-auto'}>
					<NavigationCard />
				</Card>
				<Card className={'col-span-6'}>
					<CardHeader className={''}>
						<CardTitle>Recent Parcels</CardTitle>
					</CardHeader>
					<CardContent>
						<ParcelsTable limit={3} />
					</CardContent>
				</Card>
				<Card className={'col-span-6'}>
					<CardHeader>
						<CardTitle>Recent Shipments</CardTitle>
					</CardHeader>
					<CardContent>
						<ShipmentsTable limit={3} />
					</CardContent>
				</Card>
			</div>
		</PublicLayout>
	) : (
		<PageLoader />
	);
};

export default DashboardPage;
