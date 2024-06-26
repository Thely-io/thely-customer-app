import PublicLayout from '@/layouts/public';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerUserSchema } from 'thely/schemas';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useRequest } from '@ajxb/userequest';
import { registerUser, saveUserSessionToken } from 'thely';
import { faker } from '@faker-js/faker';
import { CassetteTapeIcon, TestTube2Icon, TestTubeIcon } from 'lucide-react';
import { toast } from 'sonner';
import { router } from 'next/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { setCookie } from 'cookies-next';
import { useMe } from 'thely/lib/hooks/useMe';

const LoginPage = () => {
	const { me, mutate } = useMe();
	const router = useRouter();
	const { registerUserRequest, registerUserLoading, registerUserResponse } =
		useRequest<
			'registerUser',
			z.infer<typeof registerUserSchema>,
			{ accessToken: string }
		>(registerUser, 'registerUser');
	const registerForm = useForm<z.infer<typeof registerUserSchema>>({
		resolver: zodResolver(registerUserSchema),
	});

	const onSubmit = (data: z.infer<typeof registerUserSchema>) => {
		registerUserRequest(data);
	};

	// Save the token in cookie
	useEffect(() => {
		if (me && registerUserResponse) {
			setCookie('thely-token', registerUserResponse.accessToken.toString(), {
				path: '/',
				maxAge: 60 * 60 * 24 * 30,
			});
			router.push('/user/dashboard');
		}
	}, [me && registerUserResponse]);

	// Save the token in current API client
	useEffect(() => {
		if (registerUserResponse) {
			saveUserSessionToken(registerUserResponse.accessToken).then(() =>
				mutate(),
			);
		}
	}, [registerUserResponse]);

	const fillTestValues = () => {
		registerForm.setValue('firstname', faker.person.firstName());
		registerForm.setValue('lastname', faker.person.lastName());
		registerForm.setValue(
			'email',
			faker.internet.email({
				provider: 'thely-test.com',
			}),
		);
		registerForm.setValue('password', 'asdasdasd');
		registerForm.setValue('confirmPassword', 'asdasdasd');
		toast.success('Test values filled');
	};

	return (
		<PublicLayout>
			<Card className={'ml-auto max-w-[400px]'}>
				<CardHeader>
					<CardTitle>
						Register{' '}
						<Button
							className={'rounded-full'}
							size='icon'
							onClick={fillTestValues}
							variant={'ghost'}
							type={'button'}
							disabled={registerUserLoading}
						>
							<TestTube2Icon className={'size-4'} />
						</Button>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...registerForm}>
						<form
							onSubmit={registerForm.handleSubmit(onSubmit)}
							className={'flex flex-col gap-4'}
						>
							<div className={'grid gap-4 grid-cols-2'}>
								<FormField
									name={'firstname'}
									control={registerForm.control}
									render={(item) => (
										<FormItem>
											<FormLabel>First name</FormLabel>
											<FormControl>
												<Input {...item.field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name={'lastname'}
									control={registerForm.control}
									render={(item) => (
										<FormItem>
											<FormLabel>Last name</FormLabel>
											<FormControl>
												<Input {...item.field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<FormItem>
								<FormField
									name={'email'}
									control={registerForm.control}
									render={(item) => (
										<FormItem>
											<FormLabel>Email address</FormLabel>
											<FormControl>
												<Input type={'email'} {...item.field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</FormItem>
							<div className={'grid gap-4 grid-cols-2'}>
								<FormField
									name={'password'}
									control={registerForm.control}
									render={(item) => (
										<FormItem>
											<FormLabel>Password</FormLabel>
											<FormControl>
												<Input type={'password'} {...item.field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
								<FormField
									name={'confirmPassword'}
									control={registerForm.control}
									render={(item) => (
										<FormItem>
											<FormLabel>Confirm Password</FormLabel>
											<FormControl>
												<Input type={'password'} {...item.field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<Button type={'submit'} disabled={registerUserLoading}>
								Proceed
							</Button>
						</form>
					</Form>
				</CardContent>
			</Card>
		</PublicLayout>
	);
};

export default LoginPage;
