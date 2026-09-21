import { useState } from 'react'

// Lives in App so a dismissed notice stays dismissed when switching tabs.
export function useDoctor() {
  const [noticeOpen, setNoticeOpen] = useState(true)
  return { noticeOpen, closeNotice: () => setNoticeOpen(false) }
}
