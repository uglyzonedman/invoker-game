import React, { useEffect, useState } from 'react'
import bomjestvo from '../../../../assets/bomjestvo.png'
import legend from './../../../../assets/legend.png'
import recrut from './../../../../assets/recrut.png'
import hero from './../../../../assets/hero.png'
import straj from './../../../../assets/straj.png'
import sisyan from './../../../../assets/sisyan.png'
import titan from './../../../../assets/titan.png'
import vlastik from './../../../../assets/vlastik.png'
import { invokerSkills } from '../../../../consts/invoker-skills'
import { IInvokerSkill } from '../../../../types'
import noob from '../../../../assets/noob.gif'
import { useProfile, useUser } from '../../../../hooks/useUser'
import { useCreateResult } from '../../../../hooks/useResult'
import { motion } from 'framer-motion'
import WarningModal from '../../../ui/WarningModal'
import { useNavigate } from 'react-router-dom'

const InvokerMasteryTypeNoob = ({ type }: { type: 'easy' }) => {
	const [currentStep, setCurrentStep] = useState(0)
	const [currentTimer, setCurrentTimer] = useState<any>(0)
	const [startGame, setStartGame] = useState(false)
	const [keys, setKeys] = useState<any[]>([])
	const [countKeys, setCountKeys] = useState<number>(0)
	const [result, setResult] = useState(0)
	const user = useUser()
	const [incorrectKeyCount, setIncorrectKeyCount] = useState(0)
	const { profile } = useProfile(user)
	const { createResultFunc } = useCreateResult()
	const [warning, setWarning] = useState(false)
	const [countWarning, setCountWarning] = useState(0)
	const [keyPressTimes, setKeyPressTimes] = useState<any>([])
	const [isOpenModalWarning, setIsOpenModalWarning] = useState(false)
	const navigate = useNavigate()
	const findPhotoSkill = (index: number) => {
		return profile?.UserKeyboard.find(
			(item: any) => item.skill == keys[index]?.skill
		)?.photo
	}
	let MAX_KEYPRESSES_PER_SECOND = 15

	const arraySkills = [...invokerSkills]
	const [randomArraySkills, setRandomArraySkills] = useState<IInvokerSkill[]>(
		[]
	)
	const shuffleArray = (array: any[]) => {
		return array.sort(() => Math.random() - 0.5)
	}

	const skillVariants = {
		hidden: { opacity: 0, scale: 0.8 },
		visible: { opacity: 1, scale: 1 },
		exit: { opacity: 0, scale: 0.8 },
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
			setKeyPressTimes([]) // Clear previous key press records
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
		let interval: any | null = null

		if (startGame) {
			interval = setInterval(() => {
				setKeyPressTimes([]) // Reset key press times every second
			}, 1000)
		}

		return () => {
			if (interval) {
				clearInterval(interval)
			}
		}
	}, [startGame])
	const [timerPaused, setTimerPaused] = useState(false) // Track if the timer is paused
	const [timerPausedNumber, setTimerPausedNumber] = useState(0)

	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent): void => {
			if (isOpenModalWarning) {
				return // Prevent input if the warning modal is open
			}

			event.preventDefault()

			if (!event.isTrusted) {
				setIsOpenModalWarning(true)
				setWarning(true)
				setCurrentTimer(0)
				setIncorrectKeyCount(0)
				setCountKeys(0)
				setKeyPressTimes([])
				setTimerPausedNumber(0)
				setStartGame(false)
				return
			}

			const pressedKey = event.key.toLowerCase()

			setKeyPressTimes((prev: any) => [...prev, performance.now()])

			const currentTime = performance.now()
			const oneSecondAgo = currentTime - 1000
			const keyPressesInLastSecond = keyPressTimes.filter(
				(time: any) => time > oneSecondAgo
			)

			if (keyPressesInLastSecond.length > MAX_KEYPRESSES_PER_SECOND) {
				setCountWarning(prevCountWarning => {
					const newCountWarning = prevCountWarning + 1

					if (newCountWarning <= 2) {
						setIsOpenModalWarning(true)
						setTimerPaused(true)
						setTimerPausedNumber(currentTimer)
					} else if (newCountWarning === 3) {
						setTimerPaused(true)
						setIsOpenModalWarning(true)
						setWarning(true)
						setCurrentTimer(0)
						setIncorrectKeyCount(0)
						setCountKeys(0)
						setKeyPressTimes([])
						setTimerPausedNumber(0)
					}

					return newCountWarning
				})
			}

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
	}, [
		profile,
		setCountKeys,
		setKeys,
		countWarning,
		keyPressTimes,
		isOpenModalWarning,
	])
	console.log('set', currentTimer)
	useEffect(() => {
		const expectedKeys = randomArraySkills[currentStep]?.keys

		if (expectedKeys && keys.length === 3) {
			let sortedKeys = [...keys].sort((a, b) => a.skill.localeCompare(b.skill))
			let sortedExpected = [...expectedKeys].sort((a, b) => a.localeCompare(b))
			if (
				sortedKeys.every(
					(item: any, index: number) => item.skill === sortedExpected[index]
				)
			) {
				const computedResult = currentTimer + incorrectKeyCount * 2
				setResult(parseFloat(Number(computedResult).toFixed(2)))

				if (currentStep === randomArraySkills.length - 1) {
					createResultFunc({
						gameMode: 'easy',
						result: String(computedResult),
						warning,
					})
				}
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
		let animationFrame: number | null = null

		if (startGame && !timerPaused) {
			const start = performance.now() - (timerPausedNumber || 0) * 1000 // начнем отсчет от текущего времени
			const updateTimer = () => {
				const now = performance.now()
				const elapsed = (now - start) / 1000
				setCurrentTimer(elapsed.toFixed(1)) // обновляем таймер
				animationFrame = requestAnimationFrame(updateTimer)
			}

			animationFrame = requestAnimationFrame(updateTimer)
		} else if (startGame && timerPaused) {
			setCurrentTimer(timerPausedNumber)
		} else {
			setCurrentTimer(0)
			setTimerPausedNumber(0)
		}

		return () => {
			if (animationFrame) {
				cancelAnimationFrame(animationFrame) // очищаем анимацию
			}
		}
	}, [startGame, timerPaused, timerPausedNumber])

	const ResultImage = React.memo(({ result }: { result: number }) => {
		const getImage = () => {
			if (Math.round(+result) <= 6) return sisyan
			if (Math.round(+result) >= 7 && Math.round(+result) <= 10) return titan
			if (Math.round(+result) >= 11 && Math.round(+result) <= 13)
				return bomjestvo
			if (Math.round(+result) >= 14 && Math.round(+result) <= 18) return vlastik
			if (Math.round(+result) >= 19 && Math.round(+result) <= 30) return legend
			if (Math.round(+result) >= 31 && Math.round(+result) <= 40) return hero
			if (Math.round(+result) >= 41 && Math.round(+result) <= 50) return straj
			return recrut
		}

		return <img className='mx-auto' src={getImage()} alt='Result' />
	})

	const findKeyColor = (key: any) => {
		switch (key?.skill) {
			case 'q':
				return '#ff8000'
			case 'w':
				return '#ff4d00'
			case 'e':
				return '#ff1a00'
			case 'r':
				return '#ff0000'
			case 'd':
				return '#00cc00'
			default:
				return '#ff3333'
		}
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
							<motion.img
								key={randomArraySkills[currentStep]?.image}
								className='mx-auto rounded-lg shadow-lg border-4 border-purple-600'
								src={randomArraySkills[currentStep]?.image}
								alt='Skill'
								initial='hidden'
								animate='visible'
								exit='exit'
								variants={skillVariants}
								transition={{ duration: 0.5, ease: 'easeInOut' }}
							/>
						</div>
						<div className='flex justify-between max-w-[320px] mt-6 mx-auto gap-4'>
							{Array.from({ length: 3 }).map((_, index) => (
								<motion.div
									key={index}
									className='rounded-full border-4 border-solid border-indigo-500 flex items-center justify-center text-white text-lg font-bold w-24 h-24 bg-gradient-to-r from-purple-600 to-indigo-700 shadow-lg transform transition-transform duration-300 hover:scale-110 hover:shadow-2xl'
									initial={{ opacity: 0, scale: 0.8 }}
									animate={{ opacity: 1, scale: 1 }}
									exit={{ opacity: 0, scale: 0.8 }}
									transition={{ duration: 0.5, ease: 'easeInOut' }}
								>
									{findPhotoSkill(index) == undefined ? (
										''
									) : (
										<motion.img
											className='rounded-full w-[21] h-[21]'
											src={`${
												import.meta.env.VITE_BASE_URL
											}/user/get-photo-skill/${findPhotoSkill(index)}`}
										/>
									)}
								</motion.div>
							))}
						</div>
					</>
				)}
				{!startGame && result !== 0 && (
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
			</div>
			{warning && isOpenModalWarning && (
				<WarningModal
					isOpen={true}
					message='Вы превысили допустимое количество нажатий! Игра завершена.'
					onClose={() => {
						setIsOpenModalWarning(false)
						setStartGame(false)
						navigate('/')
					}}
				/>
			)}
			{countWarning > 0 && countWarning < 3 && isOpenModalWarning && (
				<WarningModal
					isOpen={true}
					message={`Замечена подозрительная активность. Предупреждение: ${countWarning} из 3!`}
					onClose={() => {
						setTimerPaused(false)
						setIsOpenModalWarning(false)
					}}
				/>
			)}

			<div className='max-w-[780px] w-full mx-auto p-6 bg-gray-800 rounded-lg shadow-xl mt-5'>
				<h2 className='text-lg font-bold text-white text-center mb-3'>
					Способности
				</h2>
				<div className='flex flex-wrap gap-4'>
					{invokerSkills?.map(skill => (
						<div
							className='flex items-center bg-gray-900 p-2 rounded-lg shadow-md'
							key={skill?.name}
						>
							<img
								src={skill?.image}
								alt={skill?.name}
								width={32}
								height={32}
								className='rounded-full'
							/>
							<p className='font-bold text-white ml-2'>{skill?.name}</p>
							<div className='flex ml-4'>
								{skill?.keys?.map((key, index) => (
									<span
										style={{ color: findKeyColor(key) }}
										className='text-base font-bold mx-1'
										key={`${key}-${index}`}
									>
										{key[0]?.toUpperCase()}
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

export default InvokerMasteryTypeNoob
