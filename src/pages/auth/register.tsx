import { useRouter } from 'next/router';
import { useState } from 'react';
import React, { FormEvent } from 'react';

const register = () => {

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const { push } = useRouter();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');
        const form = event.target as HTMLFormElement;
        const data = {
            fullname: form.fullname.value,
            email: form.email.value,
            username: form.username.value,
            password: form.password.value,
            phone: form.phone.value,
        };

        const result = await fetch('/api/user/Register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        });
        if (result.status === 200) {
            form.reset();
            setIsLoading(false);
            push('/auth/Login');
        } else {
            setIsLoading(false);
            setError('Email already exists');
        }
    };

    return (
        <div className='w-screen h-screen bg-[#ECFFE6] flex items-center'>
            <div className='flex mx-auto text-white card bg-[#151515] w-[90%] lg:w-[30%] h-auto shadow-xl'>
                <h1 className='mx-auto font-bold text-xl my-5'>Register</h1>
                {error && <p className='text-red-500'>{error}</p>}
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className='flex flex-col gap-1 ps-5'>
                            <label>Fullname</label>
                            <input id='fullname' name='fullname' type="text" placeholder="Type here" className="input input-bordered w-60 lg:w-[95%] input-sm" />
                            <label>Email</label>
                            <input id='email' name='email' type="email" placeholder="Type here" className="input input-bordered w-60 lg:w-[95%] input-sm" />
                            <label>Username</label>
                            <input id='username' name='username' type="text" placeholder="Type here" className="input input-bordered w-60 lg:w-[95%] input-sm" />
                            <label>Password</label>
                            <input id='password' name='password' type="password" placeholder="Type here" className="input input-bordered w-60 lg:w-[95%] input-sm" />
                            <label>Phone Number</label>
                            <input id='phone' name='phone' type="text" inputMode='numeric' placeholder="Type here" className="input input-bordered w-60 lg:w-[95%] input-sm" />
                        </div>
                        <button type='submit' className='my-5 ms-5 btn btn-sm w-60 lg:w-[90%] bg-blue-900 hover:bg-blue-700'>{isLoading ? 'Loading...' : 'Register'}</button>
                    </form>
                </div>
                <h5 className='text-sm mx-auto mb-5'>Have An Account? Sign In Here</h5>
            </div>
        </div>
    );
};

export default register;
