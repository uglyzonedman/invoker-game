import React, { useEffect, useState } from 'react'
import { customKeys } from '../../../consts/custom-keys'
import logo from '../../../assets/invoker-dota-2.gif'

import { invokerSkills } from '../../../consts/invoker-skills'
import { IInvokerSkill } from '../../../types'
import bomjestvo from '../../../assets/bomjestvo.png'
import legend from '../../../assets/legend.png'
import recrut from '../../../assets/recrut.png'
import hero from '../../../assets/hero.png'
import straj from '../../../assets/straj.png'
import sisyan from '../../../assets/sisyan.png'
import titan from '../../../assets/titan.png'
import vlastik from '../../../assets/vlastik.png'

const HomeGames = ({
	keys,
	setKeys,
	setCountKeys,
	setStartGame,
	startGame,
	currentTimer,
	currentStep,
	setCurrentTimer,
	setCurrentStep,
	result,
	setResult,
	setIncorrectKeyCount,
	incorrectKeyCount,
}: {
	incorrectKeyCount: number
	setIncorrectKeyCount: React.Dispatch<React.SetStateAction<number>>
	setResult: React.Dispatch<React.SetStateAction<number>>
	result: number
	currentStep: number
	setCurrentStep: React.Dispatch<React.SetStateAction<number>>
	currentTimer: number
	setCurrentTimer: React.Dispatch<React.SetStateAction<number>>
	startGame: boolean
	setStartGame: React.Dispatch<React.SetStateAction<boolean>>
	keys: string[]
	setKeys: React.Dispatch<React.SetStateAction<string[]>>
	setCountKeys: React.Dispatch<React.SetStateAction<number>>
}) => {
	const findPhotoSkill = (index: number) => {
		return customKeys.find(item => item.key == keys[index])?.photo
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
			if (!customKeys.some(item => item.key === pressedKey)) {
				setIncorrectKeyCount(prev => prev + 1)
				return
			}
			setCountKeys(prev => prev + 1)
			setKeys(prevKeys => [...prevKeys, pressedKey])
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [setCountKeys, setKeys, setIncorrectKeyCount])

	useEffect(() => {
		const expectedKeys = randomArraySkills[currentStep]?.keys.join('')
		if (keys.length === 3) {
			if (
				keys
					.join('')
					.split('')
					.sort((a, b) => b.localeCompare(a))
					.join('') ===
				expectedKeys
					.split('')
					.sort((a, b) => b.localeCompare(a))
					.join('')
			) {
				setResult(currentTimer + incorrectKeyCount * 2)

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
	}, [keys])

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

	return (
		<div className='max-w-[780px] w-full mx-auto'>
			<h2 className='text-2xl font-bold text-white text-center'>
				INVOKER GAME
			</h2>
			{!startGame && result !== 0 && (
				<div>
					<p className='text-2xl font-bold text-white text-center'>
						Результат: {result}
					</p>
					<ResultImage result={result} />
					<button
						onClick={() => {
							start()
						}}
						className='bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 block mx-auto mt-4'
					>
						Еще раз? (Нажмите ENTER)
					</button>
				</div>
			)}

			{!startGame && !result && (
				<img src={logo} alt='logo' className='mx-auto mt-3' />
			)}

			{!startGame && !result && (
				<button
					onClick={() => {
						start()
					}}
					className='bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300 block mx-auto mt-4'
				>
					Начать игру (Нажмите ENTER)
				</button>
			)}

			{startGame && (
				<div className='mt-3 mb-3'>
					<img
						className='mx-auto'
						src={randomArraySkills[currentStep].image}
						alt=''
					/>
				</div>
			)}

			{startGame && (
				<div className='flex justify-between max-w-[250px] mt-4 mx-auto'>
					{Array.from({ length: 3 }).map((_, index) => (
						<div
							key={index}
							className={`rounded-full border-white w-20 h-20 border-[2px] border-solid flex items-center justify-center text-white text-lg font-bold `}
						>
							<img className='rounded-full' src={findPhotoSkill(index)} />
						</div>
					))}
				</div>
			)}
		</div>
	)
}

export default HomeGames
