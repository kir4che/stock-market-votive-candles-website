export default function NewsTicker() {
	const news = ['目前沒有最新消息...']

	return (
		<div className='flex items-center py-1 text-zinc-900 border-t-[1.35px] border-b-[1.35px] border-zinc-800 dark:border-t-[0.85px] dark:border-b-[0.85px] dark:border-white dark:text-white'>
			<marquee className='flex-grow space-x-4' behavior='scroll' direction='left'>
				{news.map((item, index) => (
					<span key={index} className='inline-block text-sm'>
						{item}
					</span>
				))}
			</marquee>
		</div>
	)
}
