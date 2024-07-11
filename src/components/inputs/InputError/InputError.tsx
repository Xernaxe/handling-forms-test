import React from 'react';

type Props = {
	errorText: string;
};

const InputError = ({ errorText }: Props) => {
	return <p className='mb-2 ml-2 text-red-800'>{errorText}</p>;
};

export default InputError;
