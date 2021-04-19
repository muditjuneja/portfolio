import React, { useEffect, useState } from "react"
import { Intro } from '../../helpers/enter/intro';
import { Link } from "gatsby"
// import "../../assets/css/enter.scss";
import "./enter.scss";


export default function Enter() {
    const [intro, setIntro] = useState(null);


    useEffect(() => {
        if (document) {
            setIntro(new Intro(document.querySelector('.circles')));
        }
    }, []);

    useEffect(() => {
        if (intro) {
            // start intro
            // document.body.classList.remove('loading');
            // document.body.classList.add('js');
            intro.start();
        }
    }, [intro])


    return (
        <div className="enter-component">
            <div className="circular-quotes loading">
                <main>
                    <svg className="circles" width="100%" height="100%" viewBox="0 0 1400 1400">
                        <def>
                            <path id="circle-1" d="M250,700.5A450.5,450.5 0 1 11151,700.5A450.5,450.5 0 1 1250,700.5" />
                            <path id="circle-2" d="M382,700.5A318.5,318.5 0 1 11019,700.5A318.5,318.5 0 1 1382,700.5" />
                            <path id="circle-3" d="M487,700.5A213.5,213.5 0 1 1914,700.5A213.5,213.5 0 1 1487,700.5" />
                            <path id="circle-4" d="M567.5,700.5A133,133 0 1 1833.5,700.5A133,133 0 1 1567.5,700.5" />
                        </def>
                        <text className="circles__text circles__text--1">
                            <textPath className="circles__text-path" xlinkHref="#circle-1" aria-label="" textLength="2830">Talk is cheap. Show me the code.&nbsp;</textPath>
                        </text>
                        <text className="circles__text circles__text--2">
                            <textPath className="circles__text-path" xlinkHref="#circle-2" aria-label="" textLength="2001">May the force be with you&nbsp;</textPath>
                        </text>
                        <text className="circles__text circles__text--3">
                            <textPath className="circles__text-path" xlinkHref="#circle-3" aria-label="" textLength="1341">Even elephants do slip.&nbsp;</textPath>
                        </text>
                        <text className="circles__text circles__text--4">
                            <textPath className="circles__text-path" xlinkHref="#circle-4" aria-label="" textLength="836">Nothing will work unless you do.&nbsp;</textPath>
                        </text>
                    </svg>
                    <div>
                        <Link to="/">
                            <button className="enter">
                                <div className="enter__bg"></div>
                                <span className="enter__text">Enter</span>
                            </button>
                        </Link>

                    </div>
                </main>
            </div>
        </div>
    )
}