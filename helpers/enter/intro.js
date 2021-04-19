// import { randomNumber } from '../utils';
import { gsap } from 'gsap';

let DOM = {
    enterCtrl: typeof document !== `undefined` ? document.querySelector('.enter') : null,
    enterBackground: typeof document !== `undefined` ? document.querySelector('.enter__bg') : null
};

export class Intro {
    constructor(el) {
        // the SVG element
        this.DOM = { el: el };
        // SVG texts
        this.DOM.circleText = [...this.DOM.el.querySelectorAll('text.circles__text')];
        // total
        this.circleTextTotal = this.DOM.circleText.length;

        // this.setup();

    }
    setup() {


        DOM = {
            enterCtrl: typeof document !== `undefined` ? document.querySelector('.enter') : null,
            enterBackground: typeof document !== `undefined` ? document.querySelector('.enter__bg') : null
        };


        // need to set the transform origin in the center
        gsap.set(this.DOM.circleText, { transformOrigin: '50% 50%' });

        gsap.set(DOM.enterCtrl, { pointerEvents: 'none' });

        this.initEvents();
    }
    initEvents() {
        this.enterMouseEnterEv = () => {
            gsap.killTweensOf([DOM.enterBackground, this.DOM.circleText]);

            gsap.to(DOM.enterBackground, {
                duration: 1.3,
                ease: 'expo',
                scale: 1.4
            });
            gsap.to(this.DOM.circleText, {
                duration: 0.5,
                ease: 'expo',
                rotation: '+=120',
                scale: 0.5,
                opacity: 0.2,
                stagger: {
                    amount: -0.15
                }
            });
        };
        this.enterMouseLeaveEv = () => {
            //gsap.killTweensOf([DOM.enterBackground,this.DOM.circleText]);

            gsap.to(DOM.enterBackground, {
                duration: 2,
                ease: 'elastic.out(1, 0.4)',
                scale: 1
            });
            gsap.to(this.DOM.circleText, {
                duration: 2,
                ease: 'elastic.out(1, 0.4)',
                scale: 1,
                rotation: '-=120',
                opacity: 1,
                stagger: {
                    amount: 0.15
                }
            });
        };
        DOM.enterCtrl.addEventListener('mouseenter', this.enterMouseEnterEv);
        DOM.enterCtrl.addEventListener('mouseleave', this.enterMouseLeaveEv);

    
    }
    start() {
        this.startTL = gsap.timeline()
            .addLabel('start', 0)
            // rotation for all texts
            .to(this.DOM.circleText, {
                duration: 3,
                ease: 'expo.inOut',
                rotation: 90,
                stagger: {
                    amount: 0.4
                }
            }, 'start')
            // scale in the texts & enter button and fade them in
            .to([this.DOM.circleText, DOM.enterCtrl], {
                duration: 3,
                ease: 'expo.inOut',
                startAt: { opacity: 0, scale: 0.8 },
                scale: 1,
                opacity: 1,
                stagger: {
                    amount: 0.4
                }
            }, 'start')
            // at start+1 allow the hover over the enter ctrl
            .add(() => {
                gsap.set(DOM.enterCtrl, { pointerEvents: 'auto' });
            }, 'start+=2');
    }
    enter() {
        this.startTL.kill();

        DOM.enterCtrl.removeEventListener('mouseenter', this.enterMouseEnterEv);
        DOM.enterCtrl.removeEventListener('mouseleave', this.enterMouseLeaveEv);
        gsap.set(DOM.enterCtrl, { pointerEvents: 'none' });

        // gsap.set([DOM.frame, DOM.content], { opacity: 1 });

        gsap.timeline()
            .addLabel('start', 0)
            .to(DOM.enterCtrl, {
                duration: 0.6,
                ease: 'back.in',
                scale: 0.2,
                opacity: 0
            }, 'start')
            .to(this.DOM.circleText, {
                duration: 0.8,
                ease: 'back.in',
                scale: 1.6,
                opacity: 0,
                rotation: '-=20',
                stagger: {
                    amount: 0.3
                }
            }, 'start')
            .to([DOM.content.children, DOM.frame.children], {
                duration: 0.8,
                ease: 'back.out',
                startAt: { opacity: 0, scale: 0.8 },
                scale: 1,
                opacity: 1,
                stagger: {
                    amount: 0.2
                }
            }, 'start+=1')
    }
}