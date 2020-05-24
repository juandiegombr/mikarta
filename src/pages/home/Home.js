import React, { useEffect } from 'react'

import qrImage from './assets/bar-pepe.png'
import { Tracker } from 'services/Tracker'

import './Home.css'

const Home = () => {
  /* eslint-disable */

  useEffect(() => {
    Tracker.sendInteraction('home_view')
  }, [])

  const onLocation = ({ coords }) => {
    return
  }

  const onError = error => {
    return
  }

  const getLocation = () => {
    navigator.geolocation
      .getCurrentPosition(onLocation, onError)
  }

  const handlePermission = () => {
    navigator.permissions
      .query({ name: 'geolocation' })
      .then(result => {
        console.log(result)
        result.onchange = () => {
          console.log(result.state)
        }
      })
  }

  return (
    <main className="home-page">
      <header className="home-header">
        <div className="home-header__content">
          <h1 className="home-header__title"><span>mi</span>karta</h1>
          <a href="mailto:mikarta.app@gmail.com">
            <i className="far fa-paper-plane"></i>
          </a>
        </div>
      </header>
      <section className="home-section">
        <div className="home-section__content">
          <h2 className="home-section__title">
            <div>¿Qué es Mikarta?</div>
          </h2>
          <p>
            Mikarta es una <strong>iniciativa solidaria y gratuita</strong> con el objetivo de ayudar a la hostelería ante la situación generada por la COVID-19.
          </p>
          <p>
            Podrás digitalizar la carta de tu bar o restaurante para ofrecer un servicio con mayores <strong>garantías de salud y seguridad</strong> para clientes y trabajadores/as.
          </p>
        </div>
      </section>
      <section className="home-section">
        <div className="home-section__content">
          <h2 className="home-section__title">
            <div>¿Cómo funciona?</div>
          </h2>
          <p>El sistema de Mikarta se ha ideado para ofrecer la máxima flexibilidad y facilidad.</p>
          <ul>
            <li>
              <span>1.</span>
              <p>Solo necesitamos el nombre de tu local para darte de alta como usuario.</p>
            </li>
            <li>
              <span>2.</span>
              <p>Añade las categorías y los productos de tu carta en el documento que te enviaremos.</p>
            </li>
            <li>
              <span>3.</span>
              <p>Tus clientes podrán disfrutar de tu carta 100% digital a través de un código QR.</p>
            </li>
          </ul>
          <p>Y lo mejor de todo: como es una iniciativa solidaria, no tiene ningún coste. <strong>¡Completamente gratuito!</strong></p>
        </div>
      </section>
      <section className="home-section">
        <div className="home-section__content">
          <h2 className="home-section__title">
            <div>¿Puedo ver un ejemplo?</div>
          </h2>
          <p>¡Claro! Te dejamos a continuación un código QR, escanéalo con la cámara de tu móvil o una aplicación para leer códigos QR, y se abrirá la carta digital de nuestro ficticio “Bar Pepe”.</p>
          <img className="home-qr" src={ qrImage } alt="código qr"/>
          <p>Si lo prefieres, también puedes entrar (preferiblemente desde tu teléfono móvil) haciendo click <a href="https://mikarta.netlify.app/restaurant/bar-pepe">AQUÍ</a></p>
        </div>
      </section>
      <section className="home-section">
        <div className="home-section__content">
          <h2 className="home-section__title">
            <div>¿Cómo puedo tener mi carta digital?</div>
          </h2>
          <p>Si crees que este servicio puede ser útil para tu negocio, escríbenos al correo <a href="mailto:mikarta.app@gmail.com">mikarta.app@gmail.com</a> y te guíaremos para que puedas tener tu carta digital cuanto antes.</p>
        </div>
      </section>
      <div className="home-banner">
        <a href="mailto:mikarta.app@gmail.com">
          Pide tu carta digital gratuita
          <i className="far fa-paper-plane"></i>
        </a>
      </div>
    </main>
  )
}

export { Home }
