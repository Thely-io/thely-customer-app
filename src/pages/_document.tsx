import { Html, Head, Main, NextScript } from 'next/document';
import * as React from 'react';

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<meta
					name='keywords'
					content='logistics api, logistics planning software, saas, saas logistics software, warehousing'
				/>
				<link rel='canonical' href='https://thely.io' />
				<meta name='robots' content='index, follow' />
				<meta
					property='og:title'
					content='Thely.io | Warehousing & Logistics'
				/>
				<meta
					property='og:description'
					content='Thely.io provides cutting-edge API infrastructure for logistics companies, offering seamless integration, robust security, and scalable solutions for warehouse and reshipping management. Join us for developer-friendly tools, flexible pricing, and dedicated support. logistics api, logistics planning software, saas, saas logistics software, warehousing'
				/>
				<meta property='og:image' content='https://thely.io/logo.png' />
				<meta property='og:url' content='https://thely.io' />
				<meta name='twitter:card' content='summary_large_image' />
				<meta
					name='twitter:title'
					content='Thely.io | Warehousing & Logistics'
				/>
				<meta
					name='twitter:description'
					content='Thely.io provides cutting-edge API infrastructure for logistics companies, offering seamless integration, robust security, and scalable solutions for warehouse and reshipping management. Join us for developer-friendly tools, flexible pricing, and dedicated support.'
				/>
				<meta name='twitter:image' content='https://thely.io/logo.png' />
				<link
					rel='icon'
					href='/favicon.ico'
					sizes='any'
					media={'(prefers-color-scheme: dark)'}
				/>
				<link
					rel='icon'
					href='/favicon.ico'
					sizes='any'
					media={'(prefers-color-scheme: light)'}
				/>
				<link
					rel='apple-touch-icon'
					sizes='180x180'
					href='/apple-touch-icon.png'
				/>
				<link rel='manifest' href='/site.webmanifest' />
				<meta name='msapplication-TileColor' content='#da532c' />
				<meta name='theme-color' content='#ffffff' />
			</Head>
			<body className={'pointer-events-auto'}>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
