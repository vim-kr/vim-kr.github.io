// 연습 화면: 단계별 과제, 키 입력, 한글 자판 대응
import { MiniVim, type Mode } from './mini-vim'

interface Lesson {
    lines: string[]
    row?: number
    col?: number
    check: (v: MiniVim) => boolean
}

const LESSONS: Lesson[] = [
    {
        lines: [
            'Hello! This is Vim.',
            '',
            '   h  j  k  l',
            '',
            '        Go to the star -> *',
        ],
        check: (v) => v.line[v.col] === '*',
    },
    {
        lines: ['Vimm iss reallly fun!'],
        check: (v) => v.lines[0] === 'Vim is really fun!',
    },
    {
        lines: ['Vim is fun!'],
        col: 7,
        check: (v) =>
            v.mode === 'normal' &&
            v.lines.length === 1 &&
            /^Vim is .+fun!$/.test(v.lines[0]) &&
            v.lines[0] !== 'Vim is fun!',
    },
    {
        lines: ['keep this line', 'DELETE THIS LINE', 'keep this line too'],
        check: (v) =>
            v.lines.join('\n') === 'keep this line\nkeep this line too',
    },
    {
        lines: ['Delete me with dd,', 'then bring me back with u.'],
        check: (v) =>
            v.undoCount > 0 && v.deleteCount > 0 && v.lines.length === 2,
    },
    {
        lines: ['You made it!', '', 'Now save and quit:', '  :wq  then Enter'],
        check: (v) => /^(wq!?|x|q!?|qa!?)$/.test(v.lastEx),
    },
]

// 한글 두벌식 자판에서 눌린 글자를 영문 키로 바꾼다
const JAMO: Record<string, string> = {
    ㅂ: 'q',
    ㅈ: 'w',
    ㄷ: 'e',
    ㄱ: 'r',
    ㅅ: 't',
    ㅛ: 'y',
    ㅕ: 'u',
    ㅑ: 'i',
    ㅐ: 'o',
    ㅔ: 'p',
    ㅁ: 'a',
    ㄴ: 's',
    ㅇ: 'd',
    ㄹ: 'f',
    ㅎ: 'g',
    ㅗ: 'h',
    ㅓ: 'j',
    ㅏ: 'k',
    ㅣ: 'l',
    ㅋ: 'z',
    ㅌ: 'x',
    ㅊ: 'c',
    ㅍ: 'v',
    ㅠ: 'b',
    ㅜ: 'n',
    ㅡ: 'm',
    ㅃ: 'Q',
    ㅉ: 'W',
    ㄸ: 'E',
    ㄲ: 'R',
    ㅆ: 'T',
    ㅒ: 'O',
    ㅖ: 'P',
}

const SPECIAL = new Set([
    'Escape',
    'Backspace',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
])
const LABEL: Record<string, string> = {
    Escape: 'Esc',
    Backspace: '⌫',
    Enter: '⏎',
    ArrowLeft: '←',
    ArrowRight: '→',
    ArrowUp: '↑',
    ArrowDown: '↓',
    ' ': '␣',
}

function keyFromCode(e: KeyboardEvent): string | null {
    const c = e.code
    if (/^Key[A-Z]$/.test(c)) return e.shiftKey ? c[3] : c[3].toLowerCase()
    if (/^Digit\d$/.test(c))
        return e.shiftKey
            ? ({ 4: '$', 6: '^' } as Record<string, string>)[c[5]] ?? null
            : c[5]
    if (c === 'Semicolon' && e.shiftKey) return ':'
    if (c === 'Space') return ' '
    return null
}

export function initPlayground() {
    const root = document.querySelector<HTMLElement>('.pg')
    if (!root) return
    const $ = <T extends HTMLElement>(s: string) => root.querySelector<T>(s)!
    const buf = $('.pg-buf')
    const pos = $('[data-pos]')
    const msg = $('[data-msg]')
    const input = $<HTMLTextAreaElement>('.pg-input')
    const startBtn = $<HTMLButtonElement>('.pg-start')
    const echo = $('[data-echo]')
    const steps = root.querySelectorAll<HTMLElement>('.pg-steps li')
    const panels = root.querySelectorAll<HTMLElement>('[data-lesson]')
    const nextBtn = $<HTMLButtonElement>('[data-act="next"]')

    let step = 0
    let vim = new MiniVim([''])
    let solved = new Set<number>()
    let keys: string[] = []
    let handledAt = 0

    const announceMode = (m: Mode | 'normal') =>
        document.dispatchEvent(
            new CustomEvent('vimkr:mode', {
                detail:
                    m === 'insert'
                        ? 'INSERT'
                        : m === 'command'
                          ? 'COMMAND'
                          : 'NORMAL',
            })
        )

    const render = () => {
        const frag = document.createDocumentFragment()
        vim.lines.forEach((line, r) => {
            const row = document.createElement('div')
            row.className = 'pg-line'
            const n = document.createElement('span')
            n.className = 'ln'
            n.textContent = String(r + 1)
            const txt = document.createElement('span')
            txt.className = 'tx'
            const chars = [...line]
            const len = Math.max(chars.length, r === vim.row ? vim.col + 1 : 0)
            for (let c = 0; c < Math.max(len, 1); c++) {
                const ch = chars[c] ?? ' '
                const s = document.createElement('span')
                s.textContent = ch
                if (ch === '*' && step === 0) s.className = 'goal'
                if (r === vim.row && c === vim.col)
                    s.classList.add(vim.mode === 'insert' ? 'cur-bar' : 'cur')
                txt.append(s)
            }
            row.append(n, txt)
            frag.append(row)
        })
        for (let i = vim.lines.length; i < 6; i++) {
            const row = document.createElement('div')
            row.className = 'pg-line tilde'
            row.textContent = '~'
            frag.append(row)
        }
        buf.replaceChildren(frag)
        pos.textContent = `${vim.row + 1},${vim.col + 1}`
        if (vim.mode === 'insert') msg.innerHTML = '<b>-- INSERT --</b>'
        else if (vim.mode === 'command') msg.textContent = ':' + vim.cmd
        else if (vim.msg) {
            msg.textContent = vim.msg
            msg.classList.toggle('err', vim.msg.startsWith('E'))
        } else if (vim.pending) msg.textContent = vim.pending
        else msg.textContent = ''
        if (vim.mode !== 'normal' || !vim.msg) msg.classList.remove('err')
        echo.textContent = keys.join(' ')
    }

    const showPanel = (id: string) =>
        panels.forEach((p) => (p.hidden = p.dataset.lesson !== id))

    const load = (i: number) => {
        step = Math.max(0, Math.min(i, LESSONS.length - 1))
        const l = LESSONS[step]
        vim = new MiniVim(l.lines, l.row ?? 0, l.col ?? 0)
        keys = []
        showPanel(String(step))
        root.querySelector<HTMLElement>(
            `[data-lesson="${step}"] [data-success]`
        )!.hidden = !solved.has(step)
        steps.forEach((s, j) => {
            s.classList.toggle('now', j === step)
            s.classList.toggle('done', solved.has(j))
        })
        nextBtn.disabled = false
        announceMode('normal')
        render()
    }

    const finish = () => {
        showPanel('done')
        steps.forEach((s) => s.classList.remove('now'))
        nextBtn.disabled = true
    }

    const press = (k: string) => {
        root.classList.add('started')
        vim.key(k)
        keys = [...keys, LABEL[k] ?? k].slice(-12)
        announceMode(vim.mode)
        if (!solved.has(step) && LESSONS[step].check(vim)) {
            solved.add(step)
            steps[step].classList.add('done')
            root.querySelector<HTMLElement>(
                `[data-lesson="${step}"] [data-success]`
            )!.hidden = false
            if (step === LESSONS.length - 1) setTimeout(finish, 900)
        }
        render()
    }

    // 키보드 입력
    input.addEventListener('keydown', (e) => {
        if (e.metaKey || e.ctrlKey || e.altKey) return
        if (SPECIAL.has(e.key)) {
            e.preventDefault()
            press(e.key)
            handledAt = Date.now()
            return
        }
        if (vim.mode === 'insert') return // 입력 모드 글자는 input 이벤트로 받는다 (한글 조합 포함)
        const k = keyFromCode(e) ?? (e.key.length === 1 ? e.key : null)
        if (!k) return
        e.preventDefault()
        press(k)
        handledAt = Date.now()
    })

    const flush = () => {
        const v = input.value
        input.value = ''
        if (!v) return
        if (vim.mode !== 'insert' && Date.now() - handledAt < 80) return
        for (const ch of v) {
            if (vim.mode === 'insert') press(ch === '\n' ? 'Enter' : ch)
            else press(JAMO[ch] ?? ch)
        }
    }
    input.addEventListener('input', (e) => {
        if ((e as InputEvent).isComposing) return
        flush()
    })
    input.addEventListener('compositionend', flush)

    const focus = () => input.focus({ preventScroll: true })
    input.addEventListener('focus', () =>
        root.classList.add('focused', 'started')
    )
    input.addEventListener('blur', () => {
        root.classList.remove('focused')
        announceMode('normal')
    })
    startBtn.addEventListener('click', focus)
    $('.pg-editor').addEventListener('click', focus)

    // 화면 키패드
    root.querySelectorAll<HTMLButtonElement>('[data-key]').forEach((b) => {
        b.addEventListener('mousedown', (e) => e.preventDefault())
        b.addEventListener('click', () => {
            press(b.dataset.key!)
            b.classList.add('hit')
            setTimeout(() => b.classList.remove('hit'), 120)
        })
    })

    root.querySelectorAll<HTMLButtonElement>('[data-goto]').forEach((b) =>
        b.addEventListener('click', () => load(Number(b.dataset.goto)))
    )
    root.querySelector('[data-act="prev"]')!.addEventListener('click', () =>
        load(step - 1)
    )
    root.querySelector('[data-act="reset"]')!.addEventListener('click', () => {
        if (root.querySelector<HTMLElement>('[data-lesson="done"]')!.hidden)
            load(step)
        else {
            solved = new Set()
            load(0)
        }
    })
    nextBtn.addEventListener('click', () =>
        step === LESSONS.length - 1 ? finish() : load(step + 1)
    )

    load(0)
}
