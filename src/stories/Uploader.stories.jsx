import { fn } from 'storybook/test';
import { Uploader } from '../components/uploader/Uploader';

export default {
  title: 'Components/Uploader',
  component: Uploader,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const mockUploadSuccess = async (file) => {
    console.log("Uploading file:", file.name);
    return new Promise(resolve => setTimeout(() => resolve({ success: true, fileName: file.name }), 2000));
}

const mockUploadFail = async (file) => {
    console.log("Uploading file (will fail):", file.name);
    return new Promise((_, reject) => setTimeout(() => reject(new Error("Upload failed due to a server error.")), 2000));
}

export const Default = {
  args: {
    onUpload: mockUploadSuccess,
  },
};

export const WithFileTypeRestriction = {
  args: {
    onUpload: mockUploadSuccess,
    acceptedFileTypes: ['image/jpeg', 'image/png'],
  },
};

export const OnError = {
  args: {
    onUpload: mockUploadFail,
  },
};
