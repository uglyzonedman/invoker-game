import { useParams } from 'react-router-dom'
import InvokerMasteryTypeNoob from './invoker-mastery-type-noob/InvokerMasteryTypeNoob'

const InvokerMasteryType = () => {
	const { type } = useParams()
	const renderCurrentGame = () => {
		switch (type) {
			case 'easy':
				return <InvokerMasteryTypeNoob type={type} />

			default:
				break
		}
	}
	return (
		<div className='max-w-[1280px] w-full mx-auto mt-3 mb-3'>
			{renderCurrentGame()}
		</div>
	)
}

export default InvokerMasteryType
