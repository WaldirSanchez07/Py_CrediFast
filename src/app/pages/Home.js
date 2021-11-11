import React from 'react'
import { Link } from 'react-router-dom'
import Background from '../../assets/images/banner.jpg'
const Home = () => {
    return (
        <section className="_home" id="home">
            <div className="banner-background">
                <img src={Background} alt="background" className="banner-image" />
                <div className="banner-shadow"></div>
            </div>
            <div className="banner-content">
                <div className="banner-text">
                    <div>Bienvenido a <h1>CrediFast</h1></div>
                    <h2>Solicita tu crédito ahora!</h2>
                    <Link variant="contained" size="large" className="btn-go" to="/solicitar-credito">
                        <span>Solicitar</span>
                        <i className="material-icons">arrow_forward</i>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default Home
