import PublicLayout from '@/layouts/public';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoIcon } from 'lucide-react';
import { useMe } from 'thely/lib/hooks/useMe';
import PageLoader from '@/components/loaders/pageLoader';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import NavigationCard from '@/components/card.nav';
import BackCard from '@/components/card.back';
import TransactionsTable from '@/components/table.transactions';

const ShipmentsPage = () => {
	const { me } = useMe();
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
					<BackCard />
				</Card>
				<Card className={'col-span-9 overflow-y-auto'}>
					<NavigationCard />
				</Card>
				<Card className={'col-span-12'}>
					<CardHeader>
						<CardTitle>Your Transactions</CardTitle>
					</CardHeader>
					<CardContent>
						<TransactionsTable />
					</CardContent>
				</Card>
			</div>
		</PublicLayout>
	) : (
		<PageLoader />
	);
};

export default ShipmentsPage;
