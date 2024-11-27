import { useState } from 'react'
import { useProfile, useUser } from '../../hooks/useUser'
import EditProfileModal from '../ui/EditProfileModal'
import EditKeyboardAbilitiesModal from '../ui/EditKeyboardAbilitiesModal'
import { useGetAllHistoryById } from '../../hooks/useHistoryGame'

const Profile = () => {
	const user = useUser()
	const { profile } = useProfile(user)

	const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
	const [isKeyboardModalOpen, setIsKeyboardModalOpen] = useState(false)

	const handleEditProfileClick = () => {
		setIsProfileModalOpen(true)
	}

	const handleEditKeyboardClick = () => {
		setIsKeyboardModalOpen(true)
	}

	const handleCloseProfileModal = () => {
		setIsProfileModalOpen(false)
	}

	const handleCloseKeyboardModal = () => {
		setIsKeyboardModalOpen(false)
	}

	const preferredOrder = ['quas', 'wex', 'exort', 'cast1', 'cast2', 'invoke']

	const sortedKeyboards = Array.isArray(profile?.UserKeyboard)
		? [...profile.UserKeyboard].sort(
				(a, b) =>
					preferredOrder.indexOf(a.skill) - preferredOrder.indexOf(b.skill)
		  )
		: []

	const { getAllHistory } = useGetAllHistoryById()

	return (
		<div className='max-w-[1280px]  w-full mt-6 mx-auto'>
			<div className='max-w-sm bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-700 hover:shadow-2xl transition-shadow duration-300 mx-auto flex flex-col items-center p-6'>
				<div className='w-20 h-20 mb-4'>
					<img
						width={80}
						height={80}
						className='rounded-full object-cover border-2 border-gray-500'
						src={`${import.meta.env.VITE_BASE_URL}/user/get-avatar/${
							profile?.avatarPath
						}`}
						alt='User Avatar'
					/>
				</div>
				<h3 className='text-xl font-semibold text-white mb-2'>
					{profile?.login}
				</h3>
				<button
					onClick={handleEditProfileClick}
					className='mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition'
				>
					Редактировать профиль
				</button>

				{isProfileModalOpen && (
					<EditProfileModal
						profile={profile}
						onClose={handleCloseProfileModal}
					/>
				)}

				{isKeyboardModalOpen && (
					<EditKeyboardAbilitiesModal
						profile={profile}
						onClose={handleCloseKeyboardModal}
					/>
				)}
			</div>
			<div className='max-w-xl bg-gray-800 shadow-lg rounded-lg mt-4 overflow-hidden border border-gray-700 hover:shadow-2xl transition-shadow duration-300 mx-auto flex flex-col p-6'>
				<h3 className='text-xl font-semibold text-white mb-2 text-center'>
					Способности
				</h3>
				<div className='flex items-center justify-between'>
					{sortedKeyboards?.map(keyboard => (
						<div
							key={keyboard.skill}
							className='w-[64px] h-[64px] bg-[#2B3031] border-[#767A7D] border-[1px] border-solid rounded-sm flex justify-center items-center'
						>
							<span className='text-2xl uppercase text-center'>
								{keyboard?.key}
							</span>
						</div>
					))}
				</div>
				<button
					onClick={handleEditKeyboardClick}
					className='mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition'
				>
					Редактировать способности
				</button>
			</div>
			<div className='max-w-xl bg-gray-800 shadow-lg rounded-lg mt-4 overflow-hidden border border-gray-700 hover:shadow-2xl transition-shadow duration-300 mx-auto flex flex-col p-6 text-gray-200 mb-5'>
				<h3 className='text-xl font-semibold mb-4 border-b border-gray-600 pb-2'>
					История игр
				</h3>
				{getAllHistory?.length > 0 ? (
					getAllHistory.map((history: any, index: number) => (
						<div
							key={index}
							className='flex items-center justify-between bg-gray-700 px-4 py-3 mb-2 rounded-lg hover:bg-gray-600 transition-colors'
						>
							<span className='font-bold text-gray-300'>{index + 1}.</span>
							<span className='text-gray-300'>{history?.result} с</span>
						</div>
					))
				) : (
					<p className='text-center text-gray-400'>История игр пока пуста.</p>
				)}
			</div>
		</div>
	)
}

export default Profile
