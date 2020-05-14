const categories = [
  { id: '1', name: 'Tapeo', icon: 'fas fa-drumstick-bite', order: '0' },
  { id: '2', name: 'Ensaladas', icon: 'fas fa-carrot', order: '1' },
  { id: '3', name: 'Platos combinados', icon: 'fas fa-hamburger', order: '2' },
  { id: '5', name: 'Bocadillos', icon: 'fas fa-hotdog', order: '3' },
  { id: '6', name: 'Hamburguesas', icon: 'fas fa-hamburger', order: '4' },
  { id: '7', name: 'Sandwiches', icon: 'fas fa-bread-slice', order: '5' },
  { id: '4', name: 'Postres', icon: 'fas fa-ice-cream', order: '6' },
  { id: '8', name: 'Bebidas', icon: 'fas fa-beer', order: '7' },
  { id: '9', name: 'Vinos', icon: 'fas fa-wine-glass-alt', order: '8' },
]

const getAllByRestaurantId = id => {
  return Promise.resolve(categories)
}

export const CategoryClient = {
  getAllByRestaurantId,
}



// camembert.(1-7).............5,50€
// rucula ,queso camembert, bacon

// solomillo (1-7)......6,00€
// solomillo de cerdo bacon y parmesano
