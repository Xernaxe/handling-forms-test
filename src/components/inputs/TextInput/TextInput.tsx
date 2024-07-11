import React, { HTMLInputTypeAttribute, useEffect, useState } from 'react';
import InputLabel from '../InputLabel/InputLabel';
import InputError from '../InputError/InputError';
import {
	FieldValues,
	UseFormGetFieldState,
	UseFormRegisterReturn,
} from 'react-hook-form';

type Props = {
	inputType: 'text' | 'textarea';
	type?: HTMLInputTypeAttribute;
	label?: string;
	isRequired?: boolean;
	errorText?: string;
	register: UseFormRegisterReturn;
	getFieldState?: UseFormGetFieldState<FieldValues>;
	hasDefaultValue?: boolean;
};

const TextInput = ({
	inputType,
	type = 'text',
	label,
	isRequired,
	errorText,
	register,
	hasDefaultValue,
}: Props) => {
	const [isTouched, setIsTouched] = useState<boolean>(false);

	useEffect(() => {
		if (hasDefaultValue) {
			setIsTouched(true);
		}
	}, [hasDefaultValue]);

	const handleBlur: React.FocusEventHandler<
		HTMLInputElement | HTMLTextAreaElement
	> = (event) => {
		setIsTouched(true);
		if (register.onBlur) {
			register.onBlur(event);
		}
	};

	return (
		<fieldset className='flex flex-col'>
			{label && (
				<InputLabel
					label={label}
					isRequired={isRequired}
					errorText={errorText}
					isTouched={isTouched}
				/>
			)}
			{inputType === 'text' ? (
				<input type={type} {...register} onBlur={handleBlur} />
			) : (
				<textarea {...register} onBlur={handleBlur}></textarea>
			)}
			{errorText && <InputError errorText={errorText} />}
		</fieldset>
	);
};

export default TextInput;
