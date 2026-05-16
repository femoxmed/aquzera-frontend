'use client';
import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'sonner';
import { signupSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export default function SignUpPage() {
	return (
		<div className='container max-w-md py-16'>
			<h1 className='mb-6 text-3xl font-bold'>Create Account</h1>
			<Formik
				initialValues={{ name: '', email: '', password: '' }}
				validationSchema={signupSchema}
				onSubmit={() => {
					toast.success('Account created');
				}}>
				<Form className='space-y-4'>
					<div>
						<Field as={Input} name='name' placeholder='Name' />
						<p className='text-sm text-red-500'>
							<ErrorMessage name='name' />
						</p>
					</div>
					<div>
						<Field as={Input} name='email' placeholder='Email' />
						<p className='text-sm text-red-500'>
							<ErrorMessage name='email' />
						</p>
					</div>
					<div>
						<Field
							as={Input}
							name='password'
							type='password'
							placeholder='Password'
						/>
						<p className='text-sm text-red-500'>
							<ErrorMessage name='password' />
						</p>
					</div>
					<Button className='w-full' type='submit'>
						Sign Up
					</Button>
				</Form>
			</Formik>
			<p className='mt-4 text-sm text-muted-foreground'>
				Already have an account?{' '}
				<Link className='text-primary' href='/auth/signin'>
					Sign in
				</Link>
			</p>
		</div>
	);
}
