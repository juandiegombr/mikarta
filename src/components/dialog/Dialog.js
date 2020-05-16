import React from 'react'
import { createPortal } from 'react-dom'

import './Dialog.css'

const modalRoot = document.getElementById('dialog')

const Dialog = ({ visible, closeDialog, children }) => {
  if (!visible) return null

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
