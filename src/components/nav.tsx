import { Button, buttonVariants } from '@/components/ui/button';
import * as React from 'react';
import Link from 'next/link';
import useScroll from '@/hooks/useScroll';
import { cn } from '@/lib/utils';
import {
	LayoutDashboardIcon,
	LogIn,
	LogOut,
	TowerControlIcon,
	User,
	UserCircleIcon,
} from 'lucide-react';
import { useMe } from 'thely/lib/hooks/useMe';
import { Skeleton } from '@/components/ui/skeleton';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { saveUserSessionToken } from 'thely';
import { useRouter } from 'next/navigation';
import { deleteCookie, setCookie } from 'cookies-next';

const Logo = () => <p>Thely.io</p>;

export type NavItem = {
	title: string;
	href: string;
	disabled?: boolean;
};

export type MainNavItem = NavItem;

interface NavBarProps {
	items?: MainNavItem[];
	children?: React.ReactNode;
	rightElements?: React.ReactNode;
	scroll?: boolean;
}

interface MainNavProps {
	items?: MainNavItem[];
	children?: React.ReactNode;
}

export function MainNav({ items, children }: MainNavProps) {
	// const segment = useSelectedLayoutSegment()
	const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

	const toggleMobileMenu = () => {
		setShowMobileMenu(!showMobileMenu);
	};

	React.useEffect(() => {
		const closeMobileMenuOnClickOutside = (event: MouseEvent) => {
			if (showMobileMenu) {
				setShowMobileMenu(false);
			}
		};

		document.addEventListener('click', closeMobileMenuOnClickOutside);

		return () => {
			document.removeEventListener('click', closeMobileMenuOnClickOutside);
		};
	}, [showMobileMenu]);

	return (
		<div className='flex gap-6 md:gap-10'>
			<Link href='/' className='hidden items-center md:flex z-10'>
				<Logo />
			</Link>
			{items?.length ? (
				<nav className='hidden gap-6 md:flex'>
					{items?.map((item, index) => (
						<Link
							key={index}
							href={item.disabled ? '#' : item.href}
							className={cn(
								'flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm',
								'text-foreground',
								item.disabled && 'cursor-not-allowed opacity-80',
							)}
						>
							{item.title}
						</Link>
					))}
				</nav>
			) : null}
			<Link href='/' className='md:hidden'>
				<Logo />
			</Link>
		</div>
	);
}

export function NavBar({
	items,
	children,
	rightElements,
	scroll = false,
}: NavBarProps) {
	const router = useRouter();
	const scrolled = useScroll(50);
	const { me, isLoading } = useMe();

	const handleLogout = () => {
		saveUserSessionToken('').then(() => {
			deleteCookie('thely-token');
			router.push('/auth/login');
		});
	};

	return (
		<header
			className={`sticky top-0 z-40 flex w-full justify-center bg-background/60 backdrop-blur-xl transition-all ${
				scroll ? (scrolled ? 'border-b' : 'bg-background/0') : 'border-b'
			}`}
		>
			<div className='container flex h-16 items-center justify-between py-4'>
				<MainNav items={items}>{children}</MainNav>

				<div className='flex items-center space-x-3'>
					{rightElements}

					{isLoading ? (
						<Button size={'icon'} className={'rounded-full'} variant={'ghost'}>
							<Skeleton className='size-6 rounded-full' />
						</Button>
					) : !me ? (
						<>
							<Link href='/auth'>
								<Button className='px-3' variant='default' size='sm'>
									Get Started
								</Button>
							</Link>
							<Link
								href='/auth/login'
								className={cn(
									buttonVariants({ variant: 'outline', size: 'sm' }),
								)}
							>
								Sign In <LogIn className={'ml-1 h-5 w-5'} />
							</Link>
						</>
					) : (
						<>
							<DropdownMenu>
								<DropdownMenuTrigger asChild>
									<Button
										size={'icon'}
										className={'rounded-full'}
										variant={'ghost'}
									>
										<UserCircleIcon className={'size-6'} />
									</Button>
								</DropdownMenuTrigger>
								<DropdownMenuContent className='w-56'>
									<DropdownMenuLabel>
										Hi, {me.firstname || 'Guest'}
									</DropdownMenuLabel>
									<DropdownMenuSeparator />
									<DropdownMenuGroup>
										<Link href='/user/dashboard'>
											<DropdownMenuItem>
												<TowerControlIcon className={'mr-2 h-5 w-5'} />
												<span>Dashboard</span>
											</DropdownMenuItem>
										</Link>
										<Link href='/user/profile'>
											<DropdownMenuItem>
												<User className='mr-2 h-5 w-5' />
												<span>Profile</span>
											</DropdownMenuItem>
										</Link>
									</DropdownMenuGroup>
									<DropdownMenuItem onClick={handleLogout}>
										<LogOut className='mr-2 h-5 w-5' />
										<span>Logout</span>
									</DropdownMenuItem>
								</DropdownMenuContent>
							</DropdownMenu>
						</>
					)}
				</div>
			</div>
		</header>
	);
}
