import React from 'react';
import { twJoin } from 'tailwind-merge';

type Props = {
	label?: string;
	isRequired?: boolean;
	errorText?: string;
	isTouched?: boolean;
};

const InputLabel = ({ label, isRequired, errorText, isTouched }: Props) => {
	return (
		<label
			onClick={() => {
				console.log(errorText);
			}}
			className={twJoin(
				'mb-2 ml-2',
				!isTouched
					? 'text-gray-400'
					: errorText
					? 'text-red-700'
					: 'text-green-600'
			)}
		>
			{label} {isRequired && <span className='text-red-700'>*</span>}
		</label>
	);
};

export default InputLabel;
