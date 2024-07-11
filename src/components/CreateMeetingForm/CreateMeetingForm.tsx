import React, { useEffect } from 'react';
import TextInput from '../inputs/TextInput/TextInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const CreateMeetingForm = () => {
	const schema = z.object({
		firstName: z.string().min(1, { message: 'First Name Required' }),
		lastName: z
			.string()
			.min(1, { message: 'Last Name is required' })
			.min(5, { message: 'Last Name is too short' })
			.max(15, { message: 'Last Name is waaay too long' }),
		email: z
			.string()
			.email({ message: 'Does not look like an valid email.' })
			.min(10, { message: 'Email is too short' }),
	});

	type FormData = z.infer<typeof schema>;

	const {
		register,
		handleSubmit,
		formState: { errors },
		trigger,
		getValues,
	} = useForm<FormData>({
		defaultValues: {
			lastName: 'LastName',
			email: 'abcd',
		},
		resolver: zodResolver(schema),
		mode: 'onBlur',
	});

	// Validate defaultValues
	useEffect(() => {
		trigger();
	}, [trigger]);

	return (
		<form
			className='flex flex-col justify-center gap-4 w-1/3 max-w-80'
			onSubmit={handleSubmit((data) => {
				console.log(data);
				console.log(errors);
			})}
		>
			<TextInput
				inputType='text'
				label='Name'
				isRequired
				errorText={errors.firstName?.message as string | undefined}
				register={register('firstName', { required: true })}
				hasDefaultValue={getValues('firstName')?.length > 0}
			/>

			<TextInput
				inputType='text'
				label='Last Name'
				isRequired
				errorText={errors.lastName?.message as string | undefined}
				register={register('lastName', { required: true })}
				hasDefaultValue={getValues('lastName')?.length > 0}
			/>

			<TextInput
				inputType='text'
				type='email'
				label='Email'
				isRequired
				errorText={errors.email?.message as string | undefined}
				register={register('email', { required: true })}
				hasDefaultValue={getValues('email')?.length > 0}
			/>

			{/* <TextInput
				inputType='text'
				label='Last Name'
				isRequired
				errorText={errors.lastName?.message as string | undefined}
				register={register('link', { required: true })}
			/> */}

			<input type='submit' />
		</form>
	);
};

export default CreateMeetingForm;
