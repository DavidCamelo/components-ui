import { fn } from 'storybook/test';
import { SignUp } from '../components/sign-up/SignUp';

export default {
  title: 'Pages/Sign Up',
  component: SignUp,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const mockService = {
    signup: async (name, lastname, email, password) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if(email === "fail@example.com"){
                    reject(new Error("Email already exist."));
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
