import { fn } from 'storybook/test';
import { SignUp } from '../components/sign-up/SignUp';

export default {
  title: 'Pages/Sign Up',
  component: SignUp,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

const mockService = {
    signup: async (name, lastname, email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(email === "fail@example.com"){
                    reject(new Error("Invalid username or password."));
                } else {
                    resolve({ name: 'Test User', accessToken: 'xyz', refreshToken: 'abc' });
                }
            }, 1000)
        })
    }
}

export const Default = {
  args: {
    service: mockService,
    onSignUpSuccess: fn(),
    onCancel: fn(),
  },
};

export const WithError = {
  args: {
    ...Default.args,
    error: 'An initial error message can be passed.',
  },
};
