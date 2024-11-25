import React from 'react'
import './FlyingSpheres.css' // Import the CSS for animation and styling
import { invokerSkills } from '../../consts/invoker-skills'

const FlyingSpheres: React.FC = () => {
	return (
		<div className='sphere-container'>
			{invokerSkills.map((skill, index) => (
				<div
					key={index}
					className='sphere'
					style={{
						backgroundImage: `url(${skill.image})`,
						animationDuration: `${Math.random() * 5 + 5}s`, // Random duration between 5 and 10 seconds
						animationDelay: `${Math.random() * 5}s`, // Random delay between 0 and 5 seconds
						left: `${Math.random() * 100}vw`, // Random horizontal start position
					}}
				/>
			))}
		</div>
	)
}

export default FlyingSpheres
