'use client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast } from 'sonner';
import PageHeader from '@/components/common/PageHeader';
import { contactSchema } from '@/lib/validators';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
export default function ContactPage() {
	return (
		<div className='container max-w-2xl py-12'>
			<PageHeader title='Contact' description='Send us a message.' />
			<Formik
				initialValues={{ name: '', email: '', message: '' }}
				validationSchema={contactSchema}
				onSubmit={() => {
					toast.success('Message sent successfully');
				}}>
				<Form className='space-y-4 rounded-lg border p-6'>
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
							as='textarea'
							name='message'
							placeholder='Message'
							className='min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm'
						/>
						<p className='text-sm text-red-500'>
							<ErrorMessage name='message' />
						</p>
					</div>
					<Button type='submit'>Send Message</Button>
				</Form>
			</Formik>
		</div>
	);
}
