import { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@pes/ui/components/dialog';
import { Button } from '@pes/ui/components/button';

export default function UnitSettingsDialog() {
    const [open, setOpen] = useState(false);
    const [submissions, setSubmissions] = useState([]);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            name: '',
            email: '',
            message: '',
        },
    });

    const onSubmit = (data: any) => {
        setSubmissions([...submissions, data]);
        setOpen(false);
        reset();
    };

    return (
        <div className="min-h-screen p-8">
            <div className="max-w-2xl mx-auto">
                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button>Open Form Dialog</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Contact Form</DialogTitle>
                            <DialogDescription>
                                Fill out the form below to submit your information.
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">
                                    Name
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    {...register('name', {
                                        required: 'Name is required',
                                        minLength: { value: 2, message: 'Name must be at least 2 characters' }
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="John Doe"
                                />
                                {errors.name && (
                                    <p className="text-sm text-red-600">{errors.name.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="email" className="text-sm font-medium">
                                    Email
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Invalid email address'
                                        }
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="john@example.com"
                                />
                                {errors.email && (
                                    <p className="text-sm text-red-600">{errors.email.message}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-medium">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    {...register('message', {
                                        required: 'Message is required',
                                        minLength: { value: 10, message: 'Message must be at least 10 characters' }
                                    })}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                                    placeholder="Your message here..."
                                />
                                {errors.message && (
                                    <p className="text-sm text-red-600">{errors.message.message}</p>
                                )}
                            </div>

                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                                    Cancel
                                </Button>
                                <Button onClick={handleSubmit(onSubmit)}>Submit</Button>
                            </DialogFooter>
                        </div>
                    </DialogContent>
                </Dialog>
                {/* 
                {submissions.length > 0 && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Submissions</h2>
                        <div className="space-y-4">
                            {submissions.map((submission, index) => (
                                <div key={index} className="bg-white p-4 rounded-lg shadow">
                                    <p className="font-medium">{submission.name}</p>
                                    <p className="text-sm text-gray-600">{submission.email}</p>
                                    <p className="mt-2 text-sm">{submission.message}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )} */}
            </div>
        </div>
    );
}