// 페이지 전체: 타이핑 애니메이션, Vim 식 스크롤과 명령줄, 영상, 사진
interface PageData {
    lang: string
    cmd: {
        hint: string
        touch: string
        notCmd: string
        quit: string
        list: [string, string][]
    }
    langs: [string, string][]
    typed: string[]
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

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches

async function typeHero(data: PageData) {
    const spans = Array.from(
        document.querySelectorAll<HTMLElement>('.hero .typed')
    )
    const pos = document.getElementById('hero-pos')!
    const msg = document.getElementById('hero-msg')!
    const cursor = document.createElement('span')
    cursor.className = 'cur-bar'
    cursor.textContent = '​'
    const written = `"hello.txt" ${spans.length}L written`
    if (reduced) {
        msg.textContent = written
        return
    }
    spans.forEach((s) => (s.textContent = ''))
    await sleep(500)
    for (let r = 0; r < spans.length; r++) {
        const chars = Array.from(data.typed[r])
        spans[r].append(cursor)
        for (let c = 0; c < chars.length; c++) {
            cursor.before(chars[c])
            pos.textContent = `${r + 2},${c + 2}`
            await sleep(chars[c] === ' ' ? 40 : 85 + Math.random() * 70)
        }
        await sleep(220)
    }
    // Esc 로 노멀 모드, 그리고 :w
    await sleep(300)
    msg.textContent = ''
    cursor.className = 'cur'
    cursor.textContent = ' '
    await sleep(500)
    for (const ch of [':', 'w']) {
        msg.textContent += ch
        await sleep(180)
    }
    await sleep(260)
    msg.textContent = written
}

export function initHome() {
    const data: PageData = JSON.parse(document.body.dataset.page || '{}')
    const $ = <T extends HTMLElement>(s: string) =>
        document.querySelector<T>(s)!
    const mode = $('#sl-mode')
    const hint = $<HTMLButtonElement>('#cmd-hint')
    const wrap = $('.cmd-wrap')
    const input = $<HTMLInputElement>('#cmd-input')
    const form = $<HTMLFormElement>('#cmdline')
    const wild = $('#wildmenu')
    const hintHTML = hint.innerHTML

    typeHero(data).then(() => {
        // 명령줄이 있다는 걸 한 번 알려 준다
        if (!reduced) {
            hint.classList.add('nudge')
            setTimeout(() => hint.classList.remove('nudge'), 4000)
        }
    })

    const setMode = (m: string) => {
        mode.textContent = m
        mode.dataset.mode = m
    }
    document.addEventListener('vimkr:mode', (e) =>
        setMode((e as CustomEvent).detail)
    )

    const goto = (id: string) => {
        const el = document.getElementById(id)
        if (!el) return
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
        if (lightbox.open) return
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
            scrollY <= 4
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

    // ---------- 복사 버튼 ----------
    document.querySelectorAll<HTMLButtonElement>('[data-copy]').forEach((b) =>
        b.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(b.dataset.copy!)
                const label = b.querySelector('.copy-label')!
                const old = label.textContent
                label.textContent = b.dataset.done!
                setTimeout(() => (label.textContent = old), 1500)
            } catch {
                /* 복사가 막힌 브라우저는 그냥 둔다 */
            }
        })
    )

    // ---------- 영상: 누르면 그때 불러온다 ----------
    document.querySelectorAll<HTMLButtonElement>('.yt').forEach((btn) =>
        btn.addEventListener('click', () => {
            const frame = document.createElement('iframe')
            frame.src = `https://www.youtube-nocookie.com/embed/${btn.dataset.yt}?autoplay=1&rel=0`
            frame.title = btn.getAttribute('aria-label') || 'YouTube'
            frame.allow =
                'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
            frame.allowFullscreen = true
            btn.replaceWith(frame)
        })
    )

    // ---------- 사진 필터 ----------
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

    // ---------- 사진 크게 보기 ----------
    const lightbox = $<HTMLDialogElement>('#lightbox')
    const lbImg = $<HTMLImageElement>('#lb-img')
    let idx = 0
    const visible = () => shots.filter((s) => !s.hidden)
    const show = (i: number) => {
        const list = visible()
        idx = (i + list.length) % list.length
        const s = list[idx]
        lbImg.src = s.href
        lbImg.alt = s.querySelector('img')?.alt || ''
        $('#lb-pos').textContent = `[${idx + 1}/${list.length}]`
        $('#lb-cap').textContent = s.dataset.caption || ''
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
        if (act) pressLb(act)
        if (act === 'prev') show(idx - 1)
        else if (act === 'next') show(idx + 1)
        else if (act === 'close' || e.target === lightbox) lightbox.close()
    })
    const pressLb = (act: string) => {
        const b = lightbox.querySelector<HTMLElement>(`[data-lb="${act}"]`)!
        b.classList.remove('down')
        void b.offsetWidth
        b.classList.add('down')
        setTimeout(() => b.classList.remove('down'), 140)
    }
    lightbox.addEventListener('keydown', (e) => {
        if (e.key === 'h' || e.key === 'ArrowLeft') {
            pressLb('prev')
            show(idx - 1)
        } else if (e.key === 'l' || e.key === 'ArrowRight') {
            pressLb('next')
            show(idx + 1)
        } else if (e.key === 'q') {
            pressLb('close')
            setTimeout(() => lightbox.close(), 120)
        }
    })
}
