import React from 'react'

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
      <header><h1>mikarta</h1></header>
      <section className="home-section">
        <h2>¿Qué es mikarta?</h2>
        <p>Mikarta es una iniciativa solidaria que permite a los bares y restaurantes crear</p>
      </section>
      <section className="home-section">
        <h2>¿Cómo funciona?</h2>
        <p>Si estás interesado/a, daremos de alta el usuario de tu local y te enviaremos tres cosas: hoja de cálculo, código QR y página web.</p>
        <p>Con la hoja de cálculo de Google, puedes crear las categorías de tu carta (por ejemplo, entrantes, bocadillos, principales o postres), y después crear y asignar a cada una de las categorías tus productos (nombre, ingredientes, precio y alérgenos). Como no dependes de nosotros, puedes actualizar tu carta tantas veces como lo necesites.</p>
        <p>Una vez hayas hecho esto, tus clientes podrán acceder a tu nueva carta digital mediante un código QR, que estará vinculado a una web. Te enviaremos tanto el código como la web. Ya está, así de fácil. </p>
      </section>
      <section className="home-section">
        <h2>¿Quiénes somos?</h2>
        <p>Mikarta es una iniciativa solidaria que permite a los bares y restaurantes crear</p>
      </section>
    </main>
  )
}

export { Home }
