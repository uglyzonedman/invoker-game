import { useState } from 'react'
import { useUpdateKeyboardProfile } from '../../hooks/useUser'

const EditKeyboardAbilitiesModal = ({
	profile,
	onClose,
}: {
	profile: any
	onClose: any
}) => {
	const [updatedKeyboard, setUpdatedKeyboard] = useState(profile.UserKeyboard)

	const handleChange = (index: any, event: any) => {
		const newKeyboards = [...updatedKeyboard]
		// Limit the input to a single character
		newKeyboards[index].key = event.target.value.slice(0, 1)
		setUpdatedKeyboard(newKeyboards)
	}

	const { updateKeyboardFunc } = useUpdateKeyboardProfile()

	const handleSave = () => {
		console.log(updatedKeyboard)
		updateKeyboardFunc({ keyboards: updatedKeyboard })
		onClose()
	}

	return (
		<div className='fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center'>
			<div className='bg-gray-800 p-6 rounded-lg w-96'>
				<h3 className='text-xl font-semibold text-white mb-4'>
					Изменить способности
				</h3>
				<form>
					{updatedKeyboard.map((keyboard: any, index: any) => (
						<div key={index} className='mb-4'>
							<label className='block text-white text-sm mb-1'>
								{keyboard.skill}
							</label>
							<input
								type='text'
								value={keyboard.key}
								onChange={event => handleChange(index, event)}
								className='w-full p-2 bg-gray-700 border border-gray-600 text-white rounded'
							/>
						</div>
					))}
					<div className='flex justify-between'>
						<button
							type='button'
							onClick={onClose}
							className='px-4 py-2 bg-gray-600 text-white rounded'
						>
							Отменить
						</button>
						<button
							type='button'
							onClick={handleSave}
							className='px-4 py-2 bg-blue-600 text-white rounded'
						>
							Сохранить
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default EditKeyboardAbilitiesModal
