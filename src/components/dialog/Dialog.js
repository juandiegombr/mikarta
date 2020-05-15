import React from 'react'
import { createPortal } from 'react-dom'

import './Dialog.css'

const modalRoot = document.getElementById('dialog')

const blockScroll = () => document.body.style.overflowY = 'hidden'
const unblockScroll = () => document.body.style.overflowY = 'visible'

const Dialog = ({ visible, closeDialog, children }) => {
  if (!visible) return null

  blockScroll()

  const closeDialogSelf = () => {
    unblockScroll()
    closeDialog()
  }

  return createPortal(
    <div className="dialog-overlay" onClick={ closeDialogSelf }>
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
