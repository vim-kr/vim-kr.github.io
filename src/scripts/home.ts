// Vim-style keyboard navigation, command line, gallery lightbox, lazy YouTube.
interface Config {
    lang: string
    hint: string
    hintTouch: string
    notCmd: string
    quit: string
    langs: [string, string][]
}

const SECTIONS: Record<string, string> = {
    top: 'top',
    about: 'about',
    home: 'top',
    events: 'events',
    e: 'events',
    gallery: 'gallery',
    photos: 'gallery',
    join: 'join',
    discord: 'join',
    docs: 'docs',
    help: 'help',
    h: 'help',
}

export function initHome() {
    const cfg: Config = JSON.parse(document.body.dataset.vim || '{}')
    const $ = <T extends HTMLElement>(sel: string) =>
        document.querySelector<T>(sel)!
    const mode = $('#sl-mode')
    const hint = $<HTMLButtonElement>('#cmd-hint')
    const wrap = $('.cmd-wrap')
    const input = $<HTMLInputElement>('#cmd-input')
    const form = $<HTMLFormElement>('#cmdline')
    const touch = matchMedia('(hover: none)').matches
    const defaultHint = touch ? cfg.hintTouch : cfg.hint
    hint.textContent = defaultHint

    const setMode = (m: string) => {
        mode.textContent = m
        mode.dataset.mode = m
    }

    const goto = (id: string) => {
        const el = document.getElementById(id)
        if (!el) return
        if (el instanceof HTMLDetailsElement) el.open = true
        el.scrollIntoView()
        history.replaceState(
            null,
            '',
            id === 'top' ? location.pathname : `#${id}`
        )
    }

    // ---------- command line ----------
    let msgTimer = 0
    const message = (text: string, error = false) => {
        hint.textContent = text
        hint.classList.toggle('error', error)
        clearTimeout(msgTimer)
        msgTimer = window.setTimeout(() => {
            hint.textContent = defaultHint
            hint.classList.remove('error')
        }, 3500)
    }

    const openCmd = (prefill = '') => {
        hint.hidden = true
        wrap.hidden = false
        input.value = prefill
        setMode('COMMAND')
        input.focus()
    }

    const closeCmd = () => {
        wrap.hidden = true
        hint.hidden = false
        input.blur()
        setMode('NORMAL')
    }

    const run = (raw: string) => {
        const cmd = raw.trim().replace(/^:/, '')
        if (!cmd) return
        const [name, arg] = cmd.split(/\s+/)
        if (SECTIONS[name]) return goto(SECTIONS[name])
        if (name === 'lang' || (name === 'set' && arg?.startsWith('lang='))) {
            const code = (arg || '').replace('lang=', '')
            const target = cfg.langs.find(([c]) => c === code)
            if (target) return void (location.href = target[1] + location.hash)
            return message(`E474: ${cmd}`, true)
        }
        if (/^(q|q!|qa|qa!|wq|x|wqa)$/.test(name))
            return message(cfg.quit, true)
        if (/^\d+$/.test(name)) return window.scrollTo({ top: 0 })
        if (name === 'G' || name === '$')
            return window.scrollTo({ top: document.body.scrollHeight })
        message(`${cfg.notCmd}: ${cmd}`, true)
    }

    hint.addEventListener('click', () => openCmd())
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const v = input.value
        closeCmd()
        run(v)
    })
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeCmd()
    })
    input.addEventListener('blur', () => {
        if (!wrap.hidden) closeCmd()
    })

    // ---------- normal-mode keys ----------
    let lastG = 0
    document.addEventListener('keydown', (e) => {
        if (e.metaKey || e.ctrlKey || e.altKey) return
        const target = e.target as HTMLElement
        if (target.closest('input, textarea, select, [contenteditable]')) return
        if (lightbox.open) return
        const step = 90
        const key = e.code === 'Semicolon' && e.shiftKey ? ':' : e.key
        switch (key) {
            case 'j':
                window.scrollBy({
                    top: step,
                    behavior: 'instant' as ScrollBehavior,
                })
                break
            case 'k':
                window.scrollBy({
                    top: -step,
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
            case '?':
                goto('help')
                break
            default:
                return
        }
    })

    // ---------- statusline: section + scroll percent ----------
    const sec = $('#sl-sec')
    const pct = $('#sl-pct')
    const tabs = document.querySelectorAll<HTMLAnchorElement>('.tab')
    const updatePct = () => {
        const max = document.documentElement.scrollHeight - innerHeight
        const y = scrollY
        pct.textContent =
            y <= 4
                ? 'Top'
                : y >= max - 4
                  ? 'Bot'
                  : `${Math.round((y / max) * 100)}%`
    }
    addEventListener('scroll', updatePct, { passive: true })
    updatePct()

    const observer = new IntersectionObserver(
        (entries) => {
            for (const en of entries) {
                if (!en.isIntersecting) continue
                const name = (en.target as HTMLElement).dataset.section || 'top'
                sec.textContent = `*vimkr-${en.target.id}*`
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

    // ---------- lazy YouTube ----------
    document.querySelectorAll<HTMLButtonElement>('.yt').forEach((btn) => {
        btn.addEventListener('click', () => {
            const id = btn.dataset.yt
            const frame = document.createElement('iframe')
            frame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`
            frame.title = btn.getAttribute('aria-label') || 'YouTube'
            frame.allow =
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            frame.allowFullscreen = true
            btn.replaceWith(frame)
        })
    })

    // ---------- gallery filter ----------
    const shots = Array.from(
        document.querySelectorAll<HTMLAnchorElement>('.shot')
    )
    const filterBtns =
        document.querySelectorAll<HTMLButtonElement>('[data-filter]')
    const applyFilter = (f: string) => {
        filterBtns.forEach((b) =>
            b.setAttribute('aria-pressed', String(b.dataset.filter === f))
        )
        shots.forEach((s) => (s.hidden = f !== 'all' && s.dataset.event !== f))
    }
    filterBtns.forEach((b) =>
        b.addEventListener('click', () => applyFilter(b.dataset.filter!))
    )
    document
        .querySelectorAll<HTMLAnchorElement>('[data-filter-link]')
        .forEach((a) =>
            a.addEventListener('click', () =>
                applyFilter(a.dataset.filterLink!)
            )
        )

    // ---------- lightbox ----------
    const lightbox = $<HTMLDialogElement>('#lightbox')
    const lbImg = $<HTMLImageElement>('#lb-img')
    const lbPos = $('#lb-pos')
    const lbCap = $('#lb-cap')
    let idx = 0
    const visible = () => shots.filter((s) => !s.hidden)
    const show = (i: number) => {
        const list = visible()
        idx = (i + list.length) % list.length
        const s = list[idx]
        lbImg.src = s.href
        lbImg.alt = s.querySelector('img')?.alt || ''
        lbPos.textContent = `[${idx + 1}/${list.length}]`
        lbCap.textContent = s.dataset.caption || ''
    }
    shots.forEach((s) =>
        s.addEventListener('click', (e) => {
            e.preventDefault()
            show(visible().indexOf(s))
            lightbox.showModal()
            setMode('VISUAL')
        })
    )
    lightbox.addEventListener('close', () => setMode('NORMAL'))
    lightbox.addEventListener('click', (e) => {
        const act = (e.target as HTMLElement).dataset.lb
        if (act === 'prev') show(idx - 1)
        else if (act === 'next') show(idx + 1)
        else if (act === 'close' || e.target === lightbox) lightbox.close()
    })
    lightbox.addEventListener('keydown', (e) => {
        if (e.key === 'h' || e.key === 'ArrowLeft') show(idx - 1)
        else if (e.key === 'l' || e.key === 'ArrowRight') show(idx + 1)
        else if (e.key === 'q') lightbox.close()
    })
}
