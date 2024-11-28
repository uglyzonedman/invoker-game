import { FaExclamationTriangle } from 'react-icons/fa'
import ReCAPTCHA from 'react-google-recaptcha'
import { useState } from 'react'

const WarningModal = ({
	isOpen,
	onClose,
	message,
}: {
	isOpen: boolean
	onClose: () => void
	message: string
}) => {
	const [, setChangeStatus] = useState(false)
	if (!isOpen) return null
	const key = '6LcBb4wqAAAAAHt3mfx0UGThnmcPV4J1xEndtnih'

	function onChange() {
		setChangeStatus(true)
	}
	return (
		<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
			<div className='bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md text-center'>
				<FaExclamationTriangle className='text-yellow-400 text-6xl mx-auto mb-4' />
				<h2 className='text-2xl font-bold text-yellow-400 mb-4'>Warning</h2>
				<p className='text-gray-300 mb-6'>{message}</p>
				<ReCAPTCHA sitekey={key} onChange={onChange} />

				<button
					onClick={onClose}
					className='bg-gradient-to-r from-red-500 to-red-700 text-white font-bold py-2 px-6 rounded-full shadow-lg hover:scale-105 transform transition-transform'
				>
					OK
				</button>
			</div>
		</div>
	)
}

export default WarningModal
