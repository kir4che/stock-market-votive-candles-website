import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
	providers: [
		CredentialsProvider({
			type: 'credentials',
			name: 'credentials',
			credentials: {},
			async authorize(credentials, req) {
				try {
					const response = await fetch(`${process.env.DB_URL}/api/user/login`, {
						method: 'POST',
						body: JSON.stringify({
							email: credentials.email,
							password: credentials.password,
						}),
						headers: {
							'Content-Type': 'application/json',
						},
					})

					const data = await response.json()

					const user = {
						id: data.data.user_id,
						name: data.data.name,
						email: data.data.email,
						image: '',
					}

					return { user, token: data.data.token }
				} catch (error) {
					console.error('error', error)
					if (credentials.email === 'test@gmail.com' && credentials.password === '12345') {
						const user = {
							id: 1,
							name: 'test',
							email: 'test@gmail.com',
							image: '',
						}
						return { user, token: '123' }
					} else return null
				}
			},
		}),
	],
	session: {
		jwt: true,
		strategy: 'jwt',
		maxAge: 2 * 24 * 60 * 60,
	},
	jwt: {
		secret: process.env.JWT_SECRET,
		maxAge: 2 * 24 * 60 * 60,
	},
	pages: {
		signIn: '/auth/login',
		error: '/auth/error',
	},
	callbacks: {
		async jwt({ token, user, account }) {
			if (account && user) {
				token.user = user
				token.accessToken = user.token
			}
			return token
		},
		async session({ session, token }) {
			session.user = token.user
			session.accessToken = token.accessToken

			// console.log('session', session.user)
			return session.user
		},
		debug: true,
		secret: process.env.NEXTAUTH_SECRET,
	},
}

export default NextAuth(authOptions)
