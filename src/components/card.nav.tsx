import Link from 'next/link';
import { CardContent } from '@/components/ui/card';
import {
	Banknote,
	BoxIcon,
	LucideProps,
	Mailbox,
	Newspaper,
	PlaneTakeoff,
	ShieldQuestionIcon,
	UserCircleIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/router';
const Routes: {
	path: string;
	icon: React.ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & React.RefAttributes<SVGSVGElement>
	>;
	title: string;
	disabled?: boolean;
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
		disabled: true,
	},
	{
		path: '/user/addresses',
		title: 'Addresses',
		icon: Newspaper,
		disabled: true,
	},
	{
		path: '/user/profile',
		title: 'Profile',
		icon: UserCircleIcon,
		disabled: true,
	},
	{
		path: '/user/support',
		title: 'Support',
		icon: ShieldQuestionIcon,
		disabled: true,
	},
];

const NavigationCard = () => {
	const router = useRouter();
	return (
		<CardContent className={'pt-8 grid grid-flow-col auto-cols-max gap-4'}>
			{Routes.map((route) => (
				<Link
					href={route.disabled ? '#' : route.path}
					className={cn(
						router.pathname === route.path ? 'text-accent-foreground' : '',
						'p-2 col-span-2 text-center',
						route.disabled ? 'opacity-50' : '',
					)}
					key={route.path}
				>
					<route.icon
						className={cn(
							router.pathname === route.path ? 'scale-105' : '',
							'size-16 group hover:scale-105 cursor-pointer transition-transform p-4 mx-auto border rounded bg-accent',
						)}
					/>
					<p className={'mt-2 text-xs'}>{route.title}</p>
				</Link>
			))}
		</CardContent>
	);
};

export default NavigationCard;
