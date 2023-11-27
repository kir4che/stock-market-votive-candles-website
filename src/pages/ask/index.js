import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Image from 'next/image'
import { useRef, useState } from 'react'

import StarryBackground from '@/components/common/StarryBackground'
import SubmitBtn from '@/components/ui/SubmitBtn'

export default function ChatBot() {
	const godList = [
		{
			id: 1,
			imageUrl: '/assets/gods/god-1.jpg',
			avatar: '/assets/gods/god-1-avatar.png',
		},
		{
			id: 2,
			imageUrl: '/assets/gods/god-2.jpg',
			avatar: '/assets/gods/god-2-avatar.png',
		},
		{
			id: 3,
			imageUrl: '/assets/gods/god-3.jpg',
			avatar: '/assets/gods/god-3-avatar.png',
		},
		{
			id: 4,
			imageUrl: '/assets/gods/god-4.jpg',
			avatar: '/assets/gods/god-4-avatar.png',
		},
	]

	const [selectedGod, setSelectedGod] = useState(0)
	const [currentGodIndex, setCurrentGodIndex] = useState(0)

	const selectGod = () => {
		const intervalId = setInterval(() => {
			setCurrentGodIndex((prevIndex) => (prevIndex + 1) % godList.length)
		}, 100)

		setTimeout(() => {
			clearInterval(intervalId)
			setSelectedGod(godList[Math.floor(Math.random() * 100 + 0) % godList.length].id)
		}, Math.random() * (12000 - 5000 + 1)) + 5000

		setTimeout(() => {}, 1000)
	}

	const [messages, setMessages] = useState([{ from: 'bot', text: 'Hello!' }])
	const [isBotTyping, setIsBotTyping] = useState(false)
	const inputRef = useRef(null)

	const updateChat = (input) => {
		if (input.trim() === '') return

		setMessages((prevMessages) => [...prevMessages, { from: 'user', text: input }])
		setIsBotTyping(true)

		inputRef.current.value = ''
		inputRef.current.focus()

		setTimeout(() => {
			setMessages((prevMessages) => [...prevMessages, { from: 'bot', text: 'Hello!' }])
			setIsBotTyping(false)
		}, 3000)
	}

	return (
		<StarryBackground className='h-screen pt-8 mx-auto lg:px-0'>
			{!selectedGod ? (
				<div className='flex-col h-full flex-center'>
					<div className='h-full space-x-10 flex-center'>
						{godList.map((god, index) => (
							<Image
								src={god.imageUrl}
								alt='god'
								width={200}
								height={200}
								key={god.id}
								style={{ opacity: index === currentGodIndex ? 0.85 : 0.2 }}
							/>
						))}
					</div>
					<SubmitBtn text='隨機選擇神明' handleSubmit={() => selectGod()} style='mb-40 w-80 rounded-full' />
				</div>
			) : (
				<div className='flex flex-col justify-between h-full'>
					<h2 className='text-center text-white'>股市 AI{}</h2>
					<div className='flex flex-col justify-between h-full max-h-[calc(100vh-180px)]'>
						{/* 對話框 */}
						<div className='px-48 py-4 overflow-y-auto'>
							{messages.map((message, index) => (
								<div key={index} className='w-full'>
									<div
										className={`p-4 pb-3 space-y-2 mb-4 shadow-md rounded-lg ${
											message.from === 'bot' ? 'bg-white dark:bg-zinc-900/50' : 'bg-sky-500'
										}`}
									>
										{message.from === 'bot' && (
											<>
												<p className='space-x-2 text-xs'>
													<span className='font-medium'>股市 AI</span>
													{/* <span className='px-2 py-0.5 border-secondary_blue text-secondary_blue bg-white dark:bg-zinc-800 border-[1.25px] rounded-full'></span> */}
												</p>
												<div className='flex items-center justify-start gap-2'>
													<div className='w-8 h-8'>
														<Image
															src={godList[selectedGod - 1].avatar}
															width={400}
															height={400}
															alt='ask-god'
															className='rounded-full'
														/>
													</div>
													<p className='text-zinc-800 dark:text-white'>{message.text}</p>
												</div>
											</>
										)}
										{message.from === 'user' && (
											<div className='flex items-center justify-start gap-2'>
												<AccountCircleIcon className='text-white' />
												<p className='text-white'>{message.text}</p>
											</div>
										)}
									</div>
								</div>
							))}
							{isBotTyping && (
								<div className='flex justify-start'>
									<div className='flex items-center px-4 py-2 mb-2 bg-white rounded-lg dark:bg-zinc-900/50'>
										<p className='text-sm text-zinc-800 dark:text-white'>・・・</p>
									</div>
								</div>
							)}
						</div>
						{/* 詢問輸入框 */}
						<div className='px-48 py-4 bg-white border-t-2 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-600'>
							<div className='relative flex'>
								<input
									type='text'
									placeholder='詢問任何問題...'
									autoComplete='off'
									autoFocus={true}
									onKeyDown={(event) => event.key === 'Enter' && !isBotTyping && updateChat(inputRef.current.value)}
									className='w-full py-2 pl-5 pr-16 border-2 rounded-full bg-zinc-100 dark:bg-zinc-900 border-zinc-200 dark:border-zinc-600 text-zinc-600 dark:text-zinc-100 placeholder-zinc-600 dark:placeholder-zinc-400 text-md focus:outline-none focus:placeholder-zinc-400 dark:focus:placeholder-zinc-600 focus:border-sky-500 dark:focus:border-sky-500'
									ref={inputRef}
								/>
								<div className='absolute inset-y-0 items-center hidden right-2 sm:flex'>
									<button
										type='button'
										disabled={isBotTyping}
										className={`inline-flex w-8 h-8 transition duration-200 ease-in-out rounded-full ${
											isBotTyping
												? 'bg-gray-500 cursor-not-allowed'
												: 'bg-secondary_blue/80 dark:bg-secondary_blue hover:bg-sky-500'
										}`}
										onClick={() => !isBotTyping && updateChat(inputRef.current.value)}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</StarryBackground>
	)
}