// 연습 화면: 단계별 과제, 키 입력, 화면 키보드, 한글 자판 대응
import { MiniVim, type Mode } from './mini-vim'

interface Lesson {
    lines: string[]
    row?: number
    col?: number
    keys: string[] // 화면 키보드에서 강조할 키
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
        keys: ['h', 'j', 'k', 'l'],
        check: (v) => v.line[v.col] === '*',
    },
    {
        lines: ['Vimm iss reallly fun!'],
        keys: ['x', 'h', 'l', 'w'],
        check: (v) => v.lines[0] === 'Vim is really fun!',
    },
    {
        lines: ['Vim is fun!'],
        col: 7,
        keys: ['i', 'Escape'],
        check: (v) =>
            v.mode === 'normal' &&
            v.lines.length === 1 &&
            /^Vim is .+fun!$/.test(v.lines[0]) &&
            v.lines[0] !== 'Vim is fun!',
    },
    {
        lines: ['keep this line', 'DELETE THIS LINE', 'keep this line too'],
        keys: ['j', 'd'],
        check: (v) =>
            v.lines.join('\n') === 'keep this line\nkeep this line too',
    },
    {
        lines: ['Delete me with dd,', 'then bring me back with u.'],
        keys: ['d', 'u'],
        check: (v) =>
            v.undoCount > 0 && v.deleteCount > 0 && v.lines.length === 2,
    },
    {
        lines: ['You made it!', '', 'Now save and quit:', '  :wq  then Enter'],
        keys: [';', 'w', 'q', 'Enter'],
        check: (v) => /^(wq!?|x|q!?|qa!?)$/.test(v.lastEx),
    },
]

// 화면 키보드 배열. [키 id, 표시, 너비]
type Cap = [string, string, number?]
const ROWS: Cap[][] = [
    [
        ['Escape', 'esc', 1.5],
        ...'1234567890'.split('').map((c): Cap => [c, c]),
        ['Backspace', '⌫', 1.5],
    ],
    [
        ['Tab', 'tab', 1.5],
        ...'qwertyuiop'.split('').map((c): Cap => [c, c]),
        ['\\', '\\', 1.5],
    ],
    [
        ['Ctrl', 'ctrl', 1.8],
        ...'asdfghjkl'.split('').map((c): Cap => [c, c]),
        [';', ':', 1],
        ['Enter', 'enter', 2.2],
    ],
    [
        ['Shift', 'shift', 2.3],
        ...'zxcvbnm'.split('').map((c): Cap => [c, c]),
        [',', ','],
        ['.', '.'],
        ['Shift', 'shift', 2.7],
    ],
    [[' ', '', 6]],
]

// 눌린 값 -> 화면 키 id
const capOf = (k: string): string => {
    if (k === ':') return ';'
    if (k === '$') return '4'
    if (k === '^') return '6'
    if (/^[A-Z]$/.test(k)) return k.toLowerCase()
    return k
}

// 한글 두벌식 자판에서 눌린 글자를 영문 키로 바꾼다
const JAMO: Record<string, string> = Object.fromEntries(
    [...'ㅂㅈㄷㄱㅅㅛㅕㅑㅐㅔㅁㄴㅇㄹㅎㅗㅓㅏㅣㅋㅌㅊㅍㅠㅜㅡ'].map((j, i) => [
        j,
        'qwertyuiopasdfghjklzxcvbnm'[i],
    ])
)

const SPECIAL = new Set([
    'Escape',
    'Backspace',
    'Enter',
    'ArrowLeft',
    'ArrowRight',
    'ArrowUp',
    'ArrowDown',
])

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
    const dots = root.querySelectorAll<HTMLElement>('.pg-dots li')
    const panels = root.querySelectorAll<HTMLElement>('[data-lesson]')
    const nextBtn = $<HTMLButtonElement>('[data-act="next"]')
    const kb = $('.kb')

    let step = 0
    let vim = new MiniVim([''])
    let solved = new Set<number>()

    // 화면 키보드 만들기
    for (const row of ROWS) {
        const r = document.createElement('div')
        r.className = 'kb-row'
        for (const [id, label, w = 1] of row) {
            const b = document.createElement('button')
            b.type = 'button'
            b.className = 'kb-key'
            b.dataset.k = id
            b.textContent = label
            b.style.flexGrow = String(w)
            b.tabIndex = -1
            b.addEventListener('mousedown', (e) => e.preventDefault())
            b.addEventListener('click', () => {
                if (['Tab', 'Ctrl', 'Shift', '\\'].includes(id))
                    return flash(id)
                press(id === ';' ? ':' : id)
            })
            r.append(b)
        }
        kb.append(r)
    }

    const flash = (id: string, shift = false) => {
        const keys = kb.querySelectorAll<HTMLElement>(
            `[data-k="${CSS.escape(id)}"]${shift ? ', [data-k="Shift"]' : ''}`
        )
        keys.forEach((k) => {
            k.classList.remove('down')
            void k.offsetWidth
            k.classList.add('down')
            setTimeout(() => k.classList.remove('down'), 140)
        })
    }

    const announceMode = (m: Mode) =>
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
            const chars = [...line]
            const len = Math.max(
                chars.length,
                r === vim.row ? vim.col + 1 : 0,
                1
            )
            for (let c = 0; c < len; c++) {
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
        msg.classList.remove('err')
        if (vim.mode === 'insert') msg.innerHTML = '<b>-- INSERT --</b>'
        else if (vim.mode === 'command') msg.textContent = ':' + vim.cmd
        else if (vim.msg) {
            msg.textContent = vim.msg
            msg.classList.toggle('err', vim.msg.startsWith('E'))
        } else msg.textContent = vim.pending
    }

    const showPanel = (id: string) =>
        panels.forEach((p) => (p.hidden = p.dataset.lesson !== id))

    const markKeys = (keys: string[]) =>
        kb
            .querySelectorAll<HTMLElement>('.kb-key')
            .forEach((k) =>
                k.classList.toggle('hint', keys.includes(k.dataset.k!))
            )

    const load = (i: number) => {
        step = Math.max(0, Math.min(i, LESSONS.length - 1))
        const l = LESSONS[step]
        vim = new MiniVim(l.lines, l.row ?? 0, l.col ?? 0)
        showPanel(String(step))
        root.querySelector<HTMLElement>(
            `[data-lesson="${step}"] [data-success]`
        )!.hidden = !solved.has(step)
        dots.forEach((d, j) => {
            d.classList.toggle('now', j === step)
            d.classList.toggle('done', solved.has(j))
        })
        nextBtn.disabled = false
        nextBtn.classList.toggle('ready', solved.has(step))
        markKeys(l.keys)
        announceMode('normal')
        render()
    }

    const finish = () => {
        showPanel('done')
        dots.forEach((d) => d.classList.remove('now'))
        nextBtn.disabled = true
        nextBtn.classList.remove('ready')
        markKeys([])
    }

    const press = (k: string) => {
        root.classList.add('started')
        flash(capOf(k), k === ':' || /^[A-Z$^]$/.test(k))
        vim.key(k)
        announceMode(vim.mode)
        if (!solved.has(step) && LESSONS[step].check(vim)) {
            solved.add(step)
            dots[step].classList.add('done')
            nextBtn.classList.add('ready')
            root.querySelector<HTMLElement>(
                `[data-lesson="${step}"] [data-success]`
            )!.hidden = false
            // 성공 문구를 잠깐 보여 주고 다음 단계로 넘어간다
            const done = step
            setTimeout(() => {
                if (step !== done) return
                if (done === LESSONS.length - 1) finish()
                else load(done + 1)
            }, 1200)
        }
        render()
    }

    // 실제 키보드 입력
    // keydown 에서 처리한 키는 같은 키의 input 이벤트(한글 조합 글자)를 버린다. 안 그러면 두 번 처리된다.
    let fromKeydown = false
    input.addEventListener('keydown', (e) => {
        if (e.metaKey || e.ctrlKey || e.altKey) return
        if (SPECIAL.has(e.key)) {
            e.preventDefault()
            if (vim.mode === 'insert') {
                fromKeydown = false
                flush() // 조합 중이던 글자를 먼저 넣는다
            }
            press(e.key)
            fromKeydown = true
            return
        }
        fromKeydown = false
        if (vim.mode === 'insert') return // 입력 모드 글자는 input 이벤트로 받는다 (한글 조합 포함)
        const k = keyFromCode(e) ?? (e.key.length === 1 ? e.key : null)
        if (!k) return
        e.preventDefault()
        press(k)
        fromKeydown = true
    })

    function flush() {
        const v = input.value
        input.value = ''
        if (!v || fromKeydown) return
        for (const ch of v) {
            if (vim.mode === 'insert') press(ch === '\n' ? 'Enter' : ch)
            else press(JAMO[ch] ?? ch)
        }
    }
    input.addEventListener('input', (e) => {
        if (!(e as InputEvent).isComposing) flush()
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
    $('.pg-editor').addEventListener('click', focus)

    // 안내 문장의 키캡도 누를 수 있다
    root.querySelectorAll<HTMLElement>('.pg-body kbd').forEach((k) => {
        const key = k.textContent === 'Esc' ? 'Escape' : k.textContent!
        if (key === '*') return
        k.classList.add('tap')
        k.addEventListener('mousedown', (e) => e.preventDefault())
        k.addEventListener('click', () => press(key))
    })

    root.querySelectorAll<HTMLButtonElement>('[data-goto]').forEach((b) =>
        b.addEventListener('click', () => load(Number(b.dataset.goto)))
    )
    $('[data-act="prev"]').addEventListener('click', () => load(step - 1))
    $('[data-act="reset"]').addEventListener('click', () => {
        if ($('[data-lesson="done"]').hidden) load(step)
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
