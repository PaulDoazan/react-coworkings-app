import main from '../assets/images/main-coworking.svg'
import Wrapper from '../assets/wrappers/LandingPage'
import React from 'react'
import { Logo } from '../components'

export default function Landing() {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>Coworkings <span>reviews</span> app</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis eveniet non, laboriosam molestiae atque veniam porro totam voluptates, eum corrupti cum itaque molestias aperiam distinctio obcaecati aliquid cumque quam natus.
                    </p>
                    <button className='btn btn-hero'>Login / Register</button>
                </div>
                <img src={main} alt="coworkings review" className='img main-img' />
            </div>
        </Wrapper>
    )
}
