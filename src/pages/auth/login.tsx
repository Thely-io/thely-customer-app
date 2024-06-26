import PublicLayout from '@/layouts/public';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginUserSchema, registerUserSchema } from 'thely/schemas';
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
import { loginUser, registerUser, saveUserSessionToken } from 'thely';
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
	const { loginUserRequest, loginUserLoading, loginUserResponse } = useRequest<
		'loginUser',
		z.infer<typeof loginUserSchema>,
		{ accessToken: string }
	>(loginUser, 'loginUser');
	const loginForm = useForm<z.infer<typeof registerUserSchema>>({
		resolver: zodResolver(loginUserSchema),
	});

	const onSubmit = (data: z.infer<typeof loginUserSchema>) => {
		loginUserRequest(data);
	};

	// Save the token in cookie
	useEffect(() => {
		if (me && loginUserResponse) {
			setCookie('thely-token', loginUserResponse.accessToken.toString(), {
				path: '/',
				maxAge: 60 * 60 * 24 * 30,
			});
			router.push('/user/dashboard');
		}
	}, [me && loginUserResponse]);

	// Save the token in current API client
	useEffect(() => {
		if (loginUserResponse) {
			saveUserSessionToken(loginUserResponse.accessToken).then(() => mutate());
		}
	}, [loginUserResponse]);

	const fillTestValues = () => {
		loginForm.setValue('email', 'ab0ud@live.com');
		loginForm.setValue('password', 'asdasdasd');
		toast.success('Test values filled');
	};

	return (
		<PublicLayout>
			<Card className={'ml-auto max-w-[400px]'}>
				<CardHeader>
					<CardTitle>
						Login{' '}
						<Button
							className={'rounded-full'}
							size='icon'
							onClick={fillTestValues}
							variant={'ghost'}
							type={'button'}
							disabled={loginUserLoading}
						>
							<TestTube2Icon className={'size-4'} />
						</Button>
					</CardTitle>
				</CardHeader>
				<CardContent>
					<Form {...loginForm}>
						<form
							onSubmit={loginForm.handleSubmit(onSubmit)}
							className={'flex flex-col gap-4'}
						>
							<FormItem>
								<FormField
									name={'email'}
									control={loginForm.control}
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
							<FormField
								name={'password'}
								control={loginForm.control}
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
							<Button type={'submit'} disabled={loginUserLoading}>
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
