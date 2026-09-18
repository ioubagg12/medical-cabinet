// Self-check for the check-up scheduling rules. Run with: npm run check
import assert from 'node:assert/strict'
import { STATUS, TODAY, statusOf, dueLabels, addMonths, fmt, iso } from '../src/checkup.js'

const organ = (monthsAgo, freq = 12) => ({
  last: iso(addMonths(TODAY, -monthsAgo)),
  freq,
})

// Thresholds: green under half the cycle, amber from half, orange in the last
// month, black once the cycle is past.
assert.equal(statusOf(organ(2)).key, 'green')
assert.equal(statusOf(organ(8)).key, 'amber')
assert.equal(statusOf(organ(11)).key, 'orange')
assert.equal(statusOf(organ(18)).key, 'black')

// A shorter cycle moves the boundaries with it.
assert.equal(statusOf(organ(4, 6)).key, 'amber')
assert.equal(statusOf(organ(7, 6)).key, 'black')

// Due labels phrase the same gap differently as it closes.
assert.match(dueLabels(organ(18), STATUS.black).dueLabel, /^Overdue by \d+ months$/)
assert.equal(dueLabels(organ(12), STATUS.black).dueLabel, 'Due today')
assert.match(dueLabels(organ(11, 12), STATUS.orange).dueLabel, /^Due in \d+ (days|weeks)$/)
assert.match(dueLabels(organ(2), STATUS.green).dueLabel, /^In \d+ months$/)

// An overdue organ says OVERDUE on its badge; an upcoming one repeats the gap.
assert.equal(dueLabels(organ(18), STATUS.black).badgeText, 'OVERDUE')
assert.equal(dueLabels(organ(12), STATUS.black).badgeText, 'Due today')

// Dates render the way the screens show them.
assert.equal(fmt(new Date(2026, 8, 1)), '1 Sep 2026')
assert.equal(iso(new Date(2026, 8, 1)), '2026-09-01')

// addMonths clamps rather than rolling into the next month.
assert.equal(iso(addMonths(new Date(2026, 0, 31), 1)), '2026-03-03')

console.log('checkup: all assertions passed')
