import React from 'react'
import { createPortal } from 'react-dom'

import './Dialog.css'

const Dialog = ({ visible, closeDialog, children }) => {
  if (!visible) return null

  const modalRoot = document.getElementById('dialog')

  return createPortal(
    <div className="dialog-overlay" onClick={ closeDialog }>
      <div className="dialog-wrapper">
        <div role="dialog" className="dialog-content">
          { children }
        </div>
      </div>
    </div>,
    modalRoot,
  )
}

export { Dialog }
