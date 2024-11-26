import { useState } from 'react'
import { useUpdateAvatar, useUpdateProfile } from '../../hooks/useUser'

const EditProfileModal = ({
	profile,
	onClose,
}: {
	profile: any
	onClose: any
}) => {
	const [login, setLogin] = useState(profile.login)
	const [avatarPath, setAvatarPath] = useState('')
	const { updateProfileFunc } = useUpdateProfile()
	const { updateAvatarFunc } = useUpdateAvatar()

	const handleAvatarChange = async (e: any) => {
		const file = e.target.files[0]
		if (file) {
			const res = await updateAvatarFunc({ photo: file })
			console.log('Avatar update response:', res)
			console.log('avatar', avatarPath)
			setAvatarPath(res.file)
		}
	}

	const handleSubmit = async (e: any) => {
		e.preventDefault()
		updateProfileFunc({ avatarPath, login })
		onClose()
	}

	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-gray-800 rounded-lg shadow-lg w-full max-w-md p-6'>
				<h2 className='text-lg font-semibold text-white mb-4'>
					Редактировать профиль
				</h2>
				<form onSubmit={handleSubmit}>
					<div className='mb-4'>
						<label className='block text-gray-300 mb-2'>Имя пользователя</label>
						<input
							type='text'
							value={login}
							onChange={e => setLogin(e.target.value)}
							className='w-full px-3 py-2 bg-gray-700 text-white rounded focus:outline-none focus:ring focus:ring-blue-500'
						/>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-300 mb-2'>Загрузить аватар</label>
						<input
							type='file'
							accept='image/*'
							onChange={handleAvatarChange}
							className='block w-full text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700'
						/>
					</div>
					<div className='flex justify-end'>
						<button
							type='button'
							onClick={onClose}
							className='px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded mr-2'
						>
							Отмена
						</button>
						<button
							type='submit'
							className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded'
						>
							Сохранить
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default EditProfileModal
