import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'

import StarryBackground from '@/components/common/StarryBackground'
import InputField from '@/components/ui/InputField'
import PrivacyAndTerms from '@/components/ui/PrivacyAndTerms'
import SubmitBtn from '@/components/ui/SubmitBtn'
import { getServerAuthSession } from '@/pages/api/auth/[...nextauth]'

export async function getServerSideProps(cxt) {
	const session = await getServerAuthSession(cxt)
	if (session)
		return {
			redirect: {
				destination: `/user/${session.user.user_id}`,
				permanent: false,
			},
		}
	else return { props: {} }
}

export default function Login() {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleLogin = async (e) => {
		e.preventDefault()

		await signIn('credentials', {
			email,
			password,
		})
	}

	return (
		<StarryBackground className={'flex-col h-[100vh-72px] flex-center'}>
			<div className='w-full px-5 py-8 bg-white/10 backdrop-blur-xl dark:bg-zinc-900/50 sm:px-10 sm:rounded-xl sm:w-3/4 md:w-4/6 lg:w-1/2 xl:w-2/5'>
				<h3 className='text-zinc-100'>登入股市光明燈</h3>
				<p className='mt-4 mb-8 text-sm text-zinc-100 opacity-80'>
					還沒有帳號嗎？{' '}
					<Link href={'/register'} className='underline opacity-80'>
						註冊新帳號
					</Link>
				</p>
				<InputField
					label='Email'
					type='email'
					onChange={(e) => setEmail(e.target.value)}
					placeholder='輸入您的 Email（測試用: test@gmail.com）'
				/>
				<InputField
					label='密碼'
					type='password'
					onChange={(e) => setPassword(e.target.value)}
					placeholder='輸入密碼（測試用: 12345）'
				/>
				<SubmitBtn text='登入' handleSubmit={handleLogin} style='mt-5 mb-10' />
				<PrivacyAndTerms />
			</div>
		</StarryBackground>
	)
}
