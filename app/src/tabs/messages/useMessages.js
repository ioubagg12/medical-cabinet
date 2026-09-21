import { useEffect, useRef, useState } from 'react'
import { MESSAGES } from './messages.js'

/**
 * State for the Messages tab: open thread, compose sheet, "sent" toast.
 * Lives in App because Journal also opens the compose sheet. Owned by: Messages epic.
 */
export function useMessages() {
  const [openId, setOpenId] = useState(null)
  const [composeOpen, setComposeOpen] = useState(false)
  const [sentToast, setSentToast] = useState(false)
  const toastTimer = useRef(null)
  useEffect(() => () => clearTimeout(toastTimer.current), [])

  return {
    threads: MESSAGES.map((m) => ({ ...m, weight: m.unread ? 800 : 600, onClick: () => setOpenId(m.id) })),
    openMsg: MESSAGES.find((m) => m.id === openId) || false,
    closeMsg: () => setOpenId(null),
    composeOpen,
    openCompose: () => { setComposeOpen(true); setOpenId(null) },
    closeCompose: () => setComposeOpen(false),
    sentToast,
    sendMsg: () => {
      setComposeOpen(false)
      setSentToast(true)
      clearTimeout(toastTimer.current)
      toastTimer.current = setTimeout(() => setSentToast(false), 2600)
    },
  }
}
