// 홈 전용: 타이핑 애니메이션, 복사 버튼, 영상, 사진
interface PageData {
    typed: string[]
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
    const setMode = (m: string) =>
        document.dispatchEvent(new CustomEvent('vimkr:mode', { detail: m }))

    typeHero(data).then(() => document.dispatchEvent(new Event('vimkr:nudge')))

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
