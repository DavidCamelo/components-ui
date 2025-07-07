import { fn } from 'storybook/test';
import { Login } from '../components/login/Login';

export default {
  title: 'Pages/Login',
  component: Login,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const mockService = {
    login: async (email, password) => {
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
    onLoginSuccess: fn(),
    onCancel: fn(),
  },
};

