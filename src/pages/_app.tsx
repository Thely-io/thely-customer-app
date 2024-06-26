import '@/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import * as React from 'react';
import Head from 'next/head';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from 'sonner';
import { SWRProvider } from '@/components/swr-provider';
import { InternalProvider } from '@/components/internal-provider';

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Thely.io | Customer App Template</title>
			</Head>
			<ThemeProvider attribute='class' defaultTheme='dark'>
				<TooltipProvider>
					<SWRProvider>
						<InternalProvider>
							<Component {...pageProps} />
						</InternalProvider>
					</SWRProvider>
					<Toaster />
				</TooltipProvider>
			</ThemeProvider>
		</>
	);
}
