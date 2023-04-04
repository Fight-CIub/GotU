export const auth = {
	login: {
		title: 'Sign in',
		email: 'Email',
		password: 'Password',
		submit: 'Sign in',
		forgotPassword: 'Forgot your password?',
		enteremail: 'Enter your e-mail address',
		enterpassword: 'Enter your password',
	},
	register: {
		title: 'Sign up',
		email: 'Email',
		displayName: 'Username',
		password: 'Password',
		repeatPassword: 'Repeat Password',
		submit: 'Sign up',
		enteremail: 'Enter your e-mail address',
		enterpassword: 'Enter your password',
		enterdisplayName: 'Enter your username',
	},
	authLeftPanel: {
		title: 'Start selling today!',
		subtitle: `What's the purpose of your account?`,
		freeAccount: {
			title: 'Free account',
			price: '0 / month',
			/* options: {
        maxPosts: 'Maksymalna ilość ogłoszeń: 2',
        featuredPosts: 'Sponsorowane ogłoszenia: 0',
        revenue: 'Zarobek: 90% od transakcji',
      } */
			options:
				'Max offer: 2\nFeatured posts: 0\nRevenue: 90% of transaction',
		},
		premiumAccount: {
			title: 'Premium',
			price: '10 / month',
			/* options: {
        maxPosts: 'Maksymalna ilość ogłoszeń: 5',
        featuredPosts: 'Sponsorowane ogłoszenia: 1',
        revenue: 'Zarobek: 100% od transakcji',
      } */
			options:
				'Max offers: 5\nFeatured posts: 1\nRevenue: 100% of transaction',
		},
		premiumPlusAccount: {
			title: 'Premium +',
			price: '20 / month',
			/* options: {
        maxPosts: 'Maksymalna ilość ogłoszeń: nielimitowana',
        featuredPosts: 'Sponsorowane ogłoszenia: 3',
        revenue: 'Zarobek: 100% od transakcji',
      } */
			options:
				'Max offers: unlimited\nFeatured posts: 3\nRevenue: 100% of transaction',
		},
	},
}
