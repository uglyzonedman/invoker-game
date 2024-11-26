import React, { useEffect, useState } from 'react'
import bomjestvo from '../../../../assets/bomjestvo.png'
import legend from './../../../../assets/legend.png'
import recrut from './../../../../assets/recrut.png'
import hero from './../../../../assets/hero.png'
import straj from './../../../../assets/straj.png'
import sisyan from './../../../../assets/sisyan.png'
import titan from './../../../../assets/titan.png'
import vlastik from './../../../../assets/vlastik.png'
import { customKeys } from '../../../../consts/custom-keys'
import { invokerSkills } from '../../../../consts/invoker-skills'
import { IInvokerSkill } from '../../../../types'
import noob from '../../../../assets/noob.gif'
import { useProfile } from '../../../../hooks/useUser'

const InvokerMasteryTypeNoob = ({ type }: { type: 'easy' }) => {
	const [currentStep, setCurrentStep] = useState(0)
	const [currentTimer, setCurrentTimer] = useState(0)
	const [startGame, setStartGame] = useState(false)
	const [keys, setKeys] = useState<any[]>([])
	const [countKeys, setCountKeys] = useState<number>(0)
	const [result, setResult] = useState(0)
	const [incorrectKeyCount, setIncorrectKeyCount] = useState(0)
	const { profile } = useProfile()

	const findPhotoSkill = (index: number) => {
		return profile?.UserKeyboard.find(
			(item: any) => item.skill == keys[index]?.skill
		)?.photo
	}

	const arraySkills = [...invokerSkills]
	const [randomArraySkills, setRandomArraySkills] = useState<IInvokerSkill[]>(
		[]
	)

	const shuffleArray = (array: any[]) => {
		return array.sort(() => Math.random() - 0.5)
	}

	const start = () => {
		if (!startGame) {
			setStartGame(true)
			setCurrentStep(0)
			setKeys([])
			const shuffledSkills = shuffleArray(arraySkills)
			setRandomArraySkills(shuffledSkills)
			setCurrentTimer(0)
			setIncorrectKeyCount(0)
			setCountKeys(0)
		}
	}

	useEffect(() => {
		const handleEnterEvent = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				start()
			}
		}

		window.addEventListener('keydown', handleEnterEvent)

		return () => {
			window.removeEventListener('keydown', handleEnterEvent)
		}
	}, [startGame])

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent): void => {
			event.preventDefault()
			const pressedKey = event.key.toLowerCase()

			const keyExists = profile?.UserKeyboard.some(
				(item: { key: string; skill: string }) => item.key === pressedKey
			)

			if (keyExists) {
				setCountKeys(prev => prev + 1)

				const currentKey = profile?.UserKeyboard.find(
					(item: { key: string; skill: string }) => item.key === pressedKey
				)

				if (currentKey) {
					console.log(`Key pressed: ${currentKey.skill}`)
					setKeys(prev => [...prev, currentKey])
				}
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [profile, setCountKeys, setKeys])

	useEffect(() => {
		const expectedKeys = randomArraySkills[currentStep]?.keys

		if (expectedKeys && keys.length === 3) {
			if (
				keys.every(
					(item: any, index: number) => item.skill === expectedKeys[index]
				)
			) {
				setTimeout(() => {
					if (currentStep < randomArraySkills?.length - 1) {
						setKeys([])
						setCurrentStep(prevStep => prevStep + 1)
					} else {
						setStartGame(false)
					}
				}, 100)
			} else {
				setIncorrectKeyCount(prev => prev + 1)
				setTimeout(() => {
					setKeys([])
				}, 100)
			}
		} else if (keys.length > 3) {
			setKeys([])
		}
	}, [keys, currentStep, randomArraySkills])

	useEffect(() => {
		let start: number | null = null
		let animationFrame: number | null = null

		const updateTimer = () => {
			const now = performance.now()
			if (start === null) {
				start = now
			}
			const elapsed = Math.floor((now - start) / 1000)
			setCurrentTimer(elapsed)
			animationFrame = requestAnimationFrame(updateTimer)
		}

		if (startGame) {
			animationFrame = requestAnimationFrame(updateTimer)
		} else {
			setCurrentTimer(0)
		}

		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame)
			}
		}
	}, [startGame])

	const ResultImage = React.memo(({ result }: { result: number }) => {
		const getImage = () => {
			if (result <= 6) return sisyan
			if (result >= 7 && result <= 10) return titan
			if (result >= 11 && result <= 13) return bomjestvo
			if (result >= 14 && result <= 18) return vlastik
			if (result >= 19 && result <= 30) return legend
			if (result >= 31 && result <= 40) return hero
			if (result >= 41 && result <= 50) return straj
			return recrut
		}

		return <img className='mx-auto' src={getImage()} alt='Result' />
	})

	const findKeyColor = (key: string) => {
		return profile?.UserKeyboard?.find((item: any) => item.skill === key)
			?.textColor
	}

	return (
		<div>
			<div className='max-w-[780px] w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-xl'>
				<h2 className='text-4xl font-extrabold text-white text-center mb-6'>
					Invoker Mastery
				</h2>
				<p className='text-lg text-gray-300 text-center mb-4'>
					Режим игры —{' '}
					{type === 'easy' && <span className='text-green-400'>Легчайший</span>}
				</p>

				{!startGame && !result && (
					<>
						<img className='mx-auto mb-4' src={noob} width={250} height={250} />
						<div className='text-center'>
							<button
								onClick={() => start()}
								className='bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold py-3 px-10 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-purple-400'
							>
								Начать игру (Нажмите ENTER)
							</button>
						</div>
					</>
				)}

				{startGame && (
					<>
						<div className='mt-6 mb-8'>
							<img
								className='mx-auto rounded-lg shadow-lg border-4 border-purple-600'
								src={randomArraySkills[currentStep].image}
								alt='Skill'
							/>
						</div>
						<div className='flex justify-between max-w-[320px] mt-6 mx-auto gap-4'>
							{Array.from({ length: 3 }).map((_, index) => (
								<div
									key={index}
									className='rounded-full border-4 border-solid border-indigo-500 flex items-center justify-center text-white text-lg font-bold w-24 h-24 bg-gradient-to-r from-purple-600 to-indigo-700 shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl'
								>
									{findPhotoSkill(index) == undefined ? (
										''
									) : (
										<img
											className='rounded-full w-[21] h-[21]'
											src={`${
												import.meta.env.VITE_BASE_URL
											}/user/get-photo-skill/${findPhotoSkill(index)}`}
										/>
									)}
								</div>
							))}
						</div>
					</>
				)}
				<div className='flex justify-between border-[1px] border-solid border-white w-full px-4 py-2 mt-5'>
					<div className='text-base font-medium text-white'>
						<span className='font-bold'>Кнопок нажато:</span> {countKeys}
					</div>
					<div className='text-base font-medium text-white'>
						<span className='font-bold'>Этап:</span> {currentStep}
					</div>
					<div className='text-base font-medium text-white'>
						<span className='font-bold'>Таймер:</span> {currentTimer} c
					</div>
					<div className='text-base font-medium text-white'>
						<span className='font-bold'>Ошибок:</span> {incorrectKeyCount}
					</div>
				</div>
				{/* {!startGame && result !== 0 && (
					<div className='text-center'>
						<p className='text-2xl font-semibold text-white mb-4'>
							Результат: <span className='text-yellow-400'>{result}</span>
						</p>
						<ResultImage result={result} />
						<button
							onClick={() => start()}
							className='bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold py-3 px-10 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl focus:outline-none focus:ring-4 focus:ring-green-400 mt-6'
						>
							Еще раз? (Нажмите ENTER)
						</button>
					</div>
				)}
				
				{startGame && (
					<>
						<div className='mt-6 mb-8'>
							<img
								className='mx-auto rounded-lg shadow-lg border-4 border-purple-600'
								src={randomArraySkills[currentStep].image}
								alt='Skill'
							/>
						</div>

						<div className='flex justify-between max-w-[320px] mt-6 mx-auto gap-4'>
							{Array.from({ length: 3 }).map((_, index) => (
								<div
									key={index}
									className='rounded-full border-4 border-solid border-indigo-500 flex items-center justify-center text-white text-lg font-bold w-24 h-24 bg-gradient-to-r from-purple-600 to-indigo-700 shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl'
								>
									{findPhotoSkill(index) == undefined ? (
										''
									) : (
										<img
											className='rounded-full w-[21] h-[21]'
											src={`${
												import.meta.env.VITE_BASE_URL
											}/user/get-photo-skill/${findPhotoSkill(index)}`}
										/>
									)}
								</div>
							))}
						</div>

					
					</>
				)} */}
			</div>

			{/* <div className='max-w-[780px] w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-xl mt-5'>
				<h2 className='text-lg font-bold text-white text-center mb-3'>
					Способности
				</h2>
				<div className='flex flex-wrap gap-4'>
					{invokerSkills.map(skill => (
						<div
							className='flex items-center bg-gray-900 p-2 rounded-lg shadow-md'
							key={skill.name}
						>
							<img
								src={skill.image}
								alt={skill.name}
								width={32}
								height={32}
								className='rounded-full'
							/>
							<p className='font-bold text-white ml-2'>{skill.name}</p>
							<div className='flex ml-4'>
								{skill.keys.map(key => (
									<span
										style={{ color: findKeyColor(key) }}
										className='text-base font-bold mx-1'
										key={key}
									>
										{key[0].toUpperCase()}
									</span>
								))}
							</div>
						</div>
					))}
				</div>
			</div> */}
		</div>
	)
}

export default InvokerMasteryTypeNoob
