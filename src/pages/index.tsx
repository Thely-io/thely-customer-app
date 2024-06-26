import PublicLayout from '@/layouts/public';
import Image from 'next/image';

export default function Home() {
	return (
		<PublicLayout>
			<Image src={'/logo.png'} alt={'Thely Logo'} width={100} height={100} />
			<h1 className={'text-4xl font-bold'}>
				Explore the Future of Reshipping with Thely.io
			</h1>
			<h3 className={'text-2xl'}>Welcome to Your New Reshipping Hub!</h3>
			<br />
			<p>
				At Thely.io, our mission is to revolutionize the reshipping industry by
				providing powerful, user-friendly tools that enhance your operations and
				improve customer interactions. We’re excited to offer you a free test
				site to explore what Thely.io can do for your business.
			</p>
			<br />
			<h3 className={'text-2xl'}>What This Application Offers:</h3>
			<p>
				This application is a demonstration of Thely.io’s capabilities. Here,
				you can experience firsthand how our platform will look and function for
				your customers. This test site includes:
			</p>
			<ul className={'list-disc list-inside'}>
				<li>
					Seamless Payment Integrations: Explore our smooth, secure transaction
					processes.
				</li>
				<li>
					Real-Time Tracking: Watch how your customers can track their shipments
					in real-time.
				</li>
				<li>
					Intuitive User Interface: Experience the user-friendly design tailored
					for both you and your customers’ ease of use.
				</li>
			</ul>
			<br />
			<p>
				We understand the challenges of modern reshipping and have crafted our
				services to provide:
			</p>
			<ul className={'list-disc list-inside'}>
				<li>
					Scalability: Whether you’re a small startup or a large enterprise, our
					tools grow with your business.
				</li>
				<li>
					Security: We prioritize your data’s safety with top-tier security
					measures.
				</li>
				<li>
					Support: Our team is here to assist you every step of the way, from
					initial setup to ongoing operations.
				</li>
			</ul>
			<br />
			<p>
				This test site is completely free and comes with the source code, so you
				can delve deeper into how everything works. We encourage you to explore,
				test, and see the potential benefits Thely.io can offer your business.
			</p>
			<br />
			<br />
			<p>
				For any questions or further information, please don’t hesitate to reach
				out to us. We’re here to help you maximize your reshipping capabilities.
			</p>
		</PublicLayout>
	);
}
