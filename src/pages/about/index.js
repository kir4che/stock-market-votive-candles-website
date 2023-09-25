import GanttCarousel from '@/components/About/GanttCarousel'
import Skill from '@/components/About/Skill'
import Team from '@/components/About/Team'

export default function About() {
	return (
		<div className='pt-8 pb-12 space-y-24 sm:pt-16 sm:pb-24'>
			<Team />
			<Skill />
			<GanttCarousel />
		</div>
	)
}
