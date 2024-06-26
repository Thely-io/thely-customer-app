/// <reference path="./.sst/platform/config.d.ts" />

const { CLOUDFLARE_ZONE_ID, DOMAIN, BUILD_ID } = process.env as {
	CLOUDFLARE_ZONE_ID: string;
	DOMAIN: string;
	BUILD_ID: string;
};

const finalDomain = `${BUILD_ID}.${DOMAIN}`;

export default $config({
	app(input) {
		return {
			name: `ThelyCustomerTemplate${BUILD_ID}`,
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws',
		};
	},
	async run() {
		new sst.aws.Nextjs(`ThelyCustomerTemplate${BUILD_ID}`, {
			domain: {
				name: finalDomain,
				dns: sst.cloudflare.dns({
					zone: CLOUDFLARE_ZONE_ID,
				}),
				redirects: [`www.${finalDomain}`],
			},
		});
	},
});
