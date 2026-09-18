import { useEffect, useMemo, useRef, useState } from 'react'
import { ORGANS, MESSAGES, FACTS, FLAGS, SETTINGS, TIMELINE } from './data'
import { ACTIONS, TILES, RUBRICS, TABS } from './icons'
import { STATUS, TODAY, iso, fmt, monthsBetween, statusOf, dueLabels } from './checkup'

const greetingFor = (hour) => (hour < 12 ? 'Good Morning' : hour < 18 ? 'Good Afternoon' : 'Good Evening')

const noop = () => {}

/**
 * Everything the screens render from: state, plus the values derived from it.
 * The screens stay presentational — they receive this object spread as props.
 */
export function useAppState() {
  const [tab, setTab] = useState('Me')
  const [noticeOpen, setNoticeOpen] = useState(true)
  const [openId, setOpenId] = useState(null)
  const [composeOpen, setComposeOpen] = useState(false)
  const [sentToast, setSentToast] = useState(false)
  const [sel, setSel] = useState('heart')
  const [logOpen, setLogOpen] = useState(false)
  const [logDate, setLogDate] = useState(iso(TODAY))
  const [dragOver, setDragOver] = useState(false)
  const [organs, setOrgans] = useState(ORGANS)

  const toastTimer = useRef(null)
  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const addFiles = (list) => {
    const names = Array.from(list || []).map((f) => f.name).filter(Boolean)
    setDragOver(false)
    if (!names.length) return
    setOrgans((prev) => {
      const organ = prev[sel]
      const added = names.map((name) => ({ name, date: fmt(TODAY) }))
      return { ...prev, [sel]: { ...organ, files: [...added, ...organ.files] } }
    })
  }

  const checkup = useMemo(() => {
    const keys = Object.keys(organs)
    const byKey = Object.fromEntries(keys.map((k) => [k, statusOf(organs[k])]))

    const counts = { green: 0, amber: 0, orange: 0, black: 0 }
    keys.forEach((k) => { counts[byKey[k].key] += 1 })
    const summary = [
      { key: 'green', text: `${counts.green} up to date` },
      { key: 'amber', text: `${counts.amber} due soon` },
      { key: 'orange', text: `${counts.orange} due now` },
      { key: 'black', text: `${counts.black} overdue` },
    ].filter((r) => counts[r.key] > 0).map((r) => ({ text: r.text, color: STATUS[r.key].color }))

    const organ = organs[sel]
    const status = byKey[sel]
    const last = new Date(organ.last)
    const { next, dueLabel, badgeText } = dueLabels(organ, status)
    const months = Math.round(monthsBetween(last, TODAY))
    const pick = (k) => () => { setSel(k); setLogOpen(false) }

    return {
      summary,
      c: Object.fromEntries(keys.map((k) => [k, byKey[k].color])),
      showHeart: sel === 'heart',
      showLungs: sel === 'lungs',
      showEyes: sel === 'eyes',
      showKidneys: sel === 'kidneys',
      showBlood: sel === 'blood',
      chips: keys.filter((k) => k !== 'blood').map((k) => {
        const on = k === sel
        return {
          label: organs[k].name, dot: byKey[k].color,
          bg: on ? '#15160f' : '#fff', fg: on ? '#fff' : '#5d6058', br: on ? '#15160f' : '#e2e5df',
          onClick: pick(k),
        }
      }),
      bloodChip: {
        dot: byKey.blood.color,
        bg: sel === 'blood' ? '#15160f' : '#fff',
        fg: sel === 'blood' ? '#fff' : '#5d6058',
        br: sel === 'blood' ? '#15160f' : '#e2e5df',
      },
      pick: Object.fromEntries(keys.map((k) => [k, pick(k)])),
      sel: {
        name: organ.name,
        speciality: `${organ.speciality} · every ${organ.freq} months`,
        frequencyLabel: `${organ.freq}-month`,
        color: status.color,
        tintBg: status.bg,
        iconParts: organ.icon.parts || [{ d: organ.icon.d, t: organ.icon.t }],
        iconViewBox: organ.icon.vb,
        badgeText, badgeBg: status.bg, badgeFg: status.fg, badgeDot: status.color,
        lastLabel: fmt(last),
        agoLabel: months < 1 ? 'logged today' : months === 1 ? 'about a month ago' : `${months} months ago`,
        nextLabel: fmt(next),
        dueLabel,
        dueFg: status.key === 'black' ? '#1f2024' : '#6d7069',
        fileCount: `${organ.files.length} ${organ.files.length === 1 ? 'file' : 'files'}`,
        files: organ.files.map((f) => ({
          name: f.name, date: f.date,
          ext: (f.name.split('.').pop() || '').toUpperCase().slice(0, 4),
          onView: noop,
        })),
      },
      dz: dragOver
        ? { border: '#026b48', bg: '#e8f7f0', icon: '#026b48' }
        : { border: '#dfe2dc', bg: '#fafbf9', icon: '#6d7069' },
    }
  }, [organs, sel, dragOver])

  const nav = TABS.map((t) => {
    const on = tab === t.label
    const c = on ? '#00b070' : '#8b8e86'
    return { label: t.label, color: on ? '#15160f' : '#8b8e86', icon: t.icon(c, on), onClick: () => setTab(t.label) }
  })

  return {
    ...checkup,
    greeting: greetingFor(new Date().getHours()),

    isMe: tab === 'Me',
    isDoctor: tab === 'My Doctor',
    isMessages: tab === 'Messages',
    isJournal: tab === 'Journal',
    isProfile: tab === 'Profile',
    nav,

    noticeOpen,
    closeNotice: () => setNoticeOpen(false),
    actions: ACTIONS.map((a) => ({ ...a, onClick: noop })),
    tiles: TILES,
    rubrics: RUBRICS.map((r) => ({ ...r, onClick: noop })),
    timeline: TIMELINE,
    facts: FACTS,
    flags: FLAGS,
    settings: SETTINGS.map((s) => ({ ...s, onClick: noop })),

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

    logOpen,
    logClosed: !logOpen,
    logDate,
    openLog: () => { setLogOpen(true); setLogDate(iso(TODAY)) },
    cancelLog: () => setLogOpen(false),
    onLogDate: (e) => setLogDate(e.target.value),
    saveCheckup: () => {
      setOrgans((prev) => ({ ...prev, [sel]: { ...prev[sel], last: logDate } }))
      setLogOpen(false)
    },

    onDragOver: (e) => { e.preventDefault(); if (!dragOver) setDragOver(true) },
    onDragLeave: () => setDragOver(false),
    onDrop: (e) => { e.preventDefault(); addFiles(e.dataTransfer && e.dataTransfer.files) },
    onFiles: (e) => addFiles(e.target.files),
  }
}
