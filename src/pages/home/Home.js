import React from 'react'

import qrImage from './assets/bar-pepe.png'
import './Home.css'

const Home = () => {
  /* eslint-disable */

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
        <h1>mikarta</h1>
        <p></p>
      </header>
      <section className="home-section">
        <h2>¿Qué es mikarta?</h2>
        <p>Mikarta es una iniciativa solidaria que permite a los bares y restaurantes digitalizar su carta de una manera fácil, sencilla y gratuita.</p>
      </section>
      <section className="home-section">
        <h2>¿Cómo funciona?</h2>
        <p>El sistema de Mikarta se ha ideado para ofrecer la máxima flexibilidad y facilidad.</p>
        <p>Nosotros te facilitaremos un documento donde deberás añadir las categorías y los productos de tu carta.</p>
        <p>Una vez hayas hecho esto, tus clientes podrán acceder a tu nueva carta digital mediante un código QR, que estará vinculado a una web. Te enviaremos tanto el código como la web. Ya está, así de fácil.</p>
        <p>Todo esto no tiene ningún tipo de coste. Es completamente gratuito.</p>
      </section>
      <section className="home-section">
        <h2>¿Puedo ver un ejemplo?</h2>
        <p>¡Claro! Te dejamos a continuación un código QR, escanéalo con la cámara de tu móvil o una aplicación para leer códigos QR, y se abrirá la carta digital de nuestro ficticio “Bar Pepe”.</p>
        <img className="home-qr" src={ qrImage} alt="código qr"/>
        <p>Si lo prefieres, también puedes entrar (preferiblemente desde tu teléfono móvil) haciendo click <a href="https://mikarta.netlify.app/restaurant/bar-pepe">AQUÍ</a></p>
      </section>
      <section className="home-section">
        <h2>¿Cómo puedo tener mi carta digital?</h2>
        <p>Si crees que este servicio puede ser útil para tu negocio, escríbenos al correo <a href="mailto:mikarta.app@gmail.com">mikarta.app@gmail.com</a> y te guíaremos para que puedas tener tu carta digital cuanto antes.</p>
      </section>
    </main>
  )
}

export { Home }
