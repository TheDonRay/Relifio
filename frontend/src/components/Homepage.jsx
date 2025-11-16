import React, { useEffect, useRef } from 'react'; 
require("../styles/Home.css")

export default function Home() {   
    const titleRef = useRef(null);

    useEffect(() => {
        const title = "Welcome to Relief.Io your personal therapist!";
        const titleElement = titleRef.current;
        
        if (titleElement) {
            titleElement.innerHTML = '';
            title.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.animationDelay = `${index * 0.05}s`;
                titleElement.appendChild(span);
            });
        }
    }, []);

    return( 
        <> 
            <div className="container1">
                <h1 className='title' ref={titleRef}></h1>  
                <p className='paragraph-style'>relief.io is</p> 
            </div>

            <button>Learn More</button>
            <button>Choose Your therapist!</button>
        </>
    )
}