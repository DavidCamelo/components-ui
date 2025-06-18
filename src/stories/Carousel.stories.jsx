import React from 'react';
import { Carousel } from '../components/carousel/Carousel';

export default {
  title: 'Components/Carousel',
  component: Carousel,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

const carouselItems = [
  <div style={{ width: '100%', height: '100%', backgroundColor: '#ef4444' }}>Slide 1</div>,
  <div style={{ width: '100%', height: '100%', backgroundColor: '#3b82f6' }}>Slide 2</div>,
  <div style={{ width: '100%', height: '100%', backgroundColor: '#10b981' }}>Slide 3</div>,
];

export const Default = {
  args: {
    items: carouselItems,
    autoPlayInterval: 3000,
  },
};
