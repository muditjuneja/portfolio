import Cursor from '../cursor';
import Grid from './grid';
import { preloadImages } from '../utils';
import ButtonCtrl from './buttonCtrl';

// Preload  images
preloadImages('.grid__item-img, .bigimg').then(() => {
    // Remove loader (loading class)
    document.body.classList.remove('loading');
    
    // Initialize grid
    const grid = new Grid(document.querySelector('.grid'));
});

const button = new ButtonCtrl(document.querySelector('.button'));
const cursor = new Cursor(document.querySelector('.cursor'));

button.on('enter', () => cursor.enter());
button.on('leave', () => cursor.leave());