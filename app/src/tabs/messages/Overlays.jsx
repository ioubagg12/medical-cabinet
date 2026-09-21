import MessageView from './MessageView.jsx'
import Compose from './Compose.jsx'
import Toast from './Toast.jsx'

// Thread view, compose sheet and toast cover every tab, so the shell renders
// them outside the scrolling screen area.
export function MessagesOverlays(m) {
  return (
    <>
      {m.openMsg ? <MessageView {...m} /> : null}
      {m.composeOpen ? <Compose {...m} /> : null}
      {m.sentToast ? <Toast /> : null}
    </>
  )
}
