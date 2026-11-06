// 모든 페이지 공통: Vim 식 스크롤, 상태줄, 명령줄
interface ShellData {
    home: string
    cmd: { notCmd: string; quit: string }
    langs: [string, string][]
}

const SECTIONS: Record<string, string> = {
    top: 'top',
    try: 'try',
    tutor: 'try',
    start: 'start',
    help: 'start',
    events: 'events',
    gallery: 'gallery',
    photos: 'gallery',
    join: 'join',
    discord: 'join',
}

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

export function initShell() {
    const data: ShellData = JSON.parse(document.body.dataset.page || '{}')
    const $ = <T extends HTMLElement>(s: string) =>
        document.querySelector<T>(s)!
    const mode = $('#sl-mode')
    const hint = $<HTMLButtonElement>('#cmd-hint')
    const wrap = $('.cmd-wrap')
    const input = $<HTMLInputElement>('#cmd-input')
    const form = $<HTMLFormElement>('#cmdline')
    const wild = $('#wildmenu')
    const hintHTML = hint.innerHTML

    const setMode = (m: string) => {
        mode.textContent = m
        mode.dataset.mode = m
    }
    document.addEventListener('vimkr:mode', (e) =>
        setMode((e as CustomEvent).detail)
    )

    // 이 페이지에 없는 섹션이면 홈의 그 섹션으로 간다
    const goto = (id: string) => {
        const el = document.getElementById(id)
        if (!el) return void (location.href = `${data.home}#${id}`)
        if (el instanceof HTMLDetailsElement) el.open = true
        el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
        history.replaceState(
            null,
            '',
            id === 'top' ? location.pathname : `#${id}`
        )
    }

    // ---------- 명령줄 ----------
    let msgTimer = 0
    const message = (text: string) => {
        hint.textContent = text
        hint.classList.add('error')
        clearTimeout(msgTimer)
        msgTimer = window.setTimeout(() => {
            hint.innerHTML = hintHTML
            hint.classList.remove('error')
        }, 3000)
    }

    const openCmd = () => {
        hint.hidden = true
        wrap.hidden = false
        wild.hidden = false
        input.value = ''
        items.forEach((b) => (b.parentElement!.hidden = false))
        setMode('COMMAND')
        input.focus()
    }

    const closeCmd = () => {
        wrap.hidden = true
        wild.hidden = true
        hint.hidden = false
        setMode('NORMAL')
    }

    const run = (raw: string) => {
        const cmd = raw.trim().replace(/^:/, '')
        if (!cmd) return
        const [name, arg] = cmd.split(/\s+/)
        if (SECTIONS[name]) return goto(SECTIONS[name])
        if (name === 'lang') {
            const target = data.langs.find(([c]) => c === arg)
            if (target) return void (location.href = target[1] + location.hash)
        }
        if (/^(q|q!|qa|qa!|wq|x|wqa)$/.test(name)) return message(data.cmd.quit)
        message(`${data.cmd.notCmd}: ${cmd}`)
    }

    // 명령 목록 필터 (Vim wildmenu 처럼)
    const items = Array.from(
        wild.querySelectorAll<HTMLButtonElement>('[data-cmd]')
    )
    input.addEventListener('input', () => {
        const v = input.value.trim()
        items.forEach(
            (b) => (b.parentElement!.hidden = !b.dataset.cmd!.startsWith(v))
        )
    })
    items.forEach((b) => {
        b.addEventListener('mousedown', (e) => e.preventDefault())
        b.addEventListener('click', () => {
            closeCmd()
            run(b.dataset.cmd!)
        })
    })

    hint.addEventListener('click', openCmd)
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const v = input.value
        closeCmd()
        run(v)
    })
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCmd()
        if (e.key === 'Tab') {
            e.preventDefault()
            const first = items.find((b) => !b.parentElement!.hidden)
            if (first) input.value = first.dataset.cmd!
        }
    })
    input.addEventListener('blur', () => {
        if (!wrap.hidden) closeCmd()
    })

    // ---------- 노멀 모드 키 ----------
    let lastG = 0
    document.addEventListener('keydown', (e) => {
        if (e.metaKey || e.ctrlKey || e.altKey) return
        if (
            (e.target as HTMLElement).closest(
                'input, textarea, select, [contenteditable]'
            )
        )
            return
        if (document.querySelector('dialog[open]')) return
        const key =
            e.code === 'Semicolon' && e.shiftKey
                ? ':'
                : e.code === 'KeyJ'
                  ? 'j'
                  : e.code === 'KeyK'
                    ? 'k'
                    : e.code === 'KeyG'
                      ? e.shiftKey
                          ? 'G'
                          : 'g'
                      : e.key
        switch (key) {
            case 'j':
                window.scrollBy({
                    top: 90,
                    behavior: 'instant' as ScrollBehavior,
                })
                break
            case 'k':
                window.scrollBy({
                    top: -90,
                    behavior: 'instant' as ScrollBehavior,
                })
                break
            case 'G':
                window.scrollTo({ top: document.body.scrollHeight })
                break
            case 'g':
                if (Date.now() - lastG < 500) window.scrollTo({ top: 0 })
                lastG = Date.now()
                break
            case ':':
                e.preventDefault()
                openCmd()
                break
        }
    })

    // ---------- 상태줄: 스크롤 위치, 현재 탭 ----------
    const pct = $('#sl-pct')
    const tabs = document.querySelectorAll<HTMLAnchorElement>('.tab')
    const updatePct = () => {
        const max = document.documentElement.scrollHeight - innerHeight
        pct.textContent =
            scrollY <= 4 || max <= 0
                ? 'Top'
                : scrollY >= max - 4
                  ? 'Bot'
                  : `${Math.round((scrollY / max) * 100)}%`
    }
    addEventListener('scroll', updatePct, { passive: true })
    updatePct()
    const observer = new IntersectionObserver(
        (entries) => {
            for (const en of entries) {
                if (!en.isIntersecting) continue
                const name = (en.target as HTMLElement).dataset.section
                tabs.forEach((t) =>
                    t.classList.toggle('active', t.dataset.tab === name)
                )
            }
        },
        { rootMargin: '-45% 0px -50% 0px' }
    )
    document
        .querySelectorAll('[data-section]')
        .forEach((s) => observer.observe(s))

    // 첫 화면 애니메이션이 끝나면 명령줄이 있다는 걸 한 번 알려 준다
    document.addEventListener('vimkr:nudge', () => {
        if (reduced) return
        hint.classList.add('nudge')
        setTimeout(() => hint.classList.remove('nudge'), 4000)
    })
}
