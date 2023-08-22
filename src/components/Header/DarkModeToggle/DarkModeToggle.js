'use client'

import { MoonStarsFill, SunFill } from 'react-bootstrap-icons'
import { useDarkMode } from '../../../context/DarkModeContext'

const DarkModeToggle = () => {
	// 利用 useContext 取得 ThemeContext 的值
	const { toggleDarkMode } = useDarkMode()

	return (
		<button className='hover:opacity-90' onClick={toggleDarkMode}>
			<div className='hidden dark:block'>
				<SunFill />
			</div>
			<div className='block dark:hidden'>
				<MoonStarsFill />
			</div>
		</button>
	)
}

export default DarkModeToggle
