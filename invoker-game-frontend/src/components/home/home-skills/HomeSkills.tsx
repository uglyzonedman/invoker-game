import { invokerSkills } from '../../../consts/invoker-skills'
import { customKeys } from '../../../consts/custom-keys'

const HomeSkills = () => {
	const findKeyColor = (key: string) => {
		return customKeys.find(item => item.key == key)?.textColor
	}

	return (
		<div className=''>
			<div className='border-[1px] border-solid border-white w-[250px]  px-2 py-2'>
				<h2 className='text-lg font-bold text-white text-center mb-3'>
					Способности
				</h2>
				<div className=''>
					{invokerSkills.map(skill => (
						<div className='flex justify-between'>
							<div className='flex'>
								<img
									src={skill.image}
									width={24}
									height={24}
									className='rounded-full ml-3'
								/>
								<p className='font-bold text-base text-white ml-2'>
									{skill.name}
								</p>
							</div>
							<div className='flex justify-start items-start text-left'>
								{skill.keys.map(key => (
									<span
										style={{ color: findKeyColor(key) }}
										className='text-base font-bold mr-1'
									>
										{key.toUpperCase()}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}

export default HomeSkills
