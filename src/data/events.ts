// 행사, 발표 영상, 사진 데이터. 새 행사는 맨 위에 추가한다.
export type Lang = 'ko' | 'en' | 'ja'
type L10n = Record<Lang, string>

export interface Talk {
    title: string
    speaker?: string
    youtube?: string
}

export interface Photo {
    src: string
    thumb?: string
}

export interface VimEvent {
    id: string
    name: string
    date: string
    venue?: L10n
    summary: L10n
    links: { label: L10n; href: string }[]
    video?: string
    talks: Talk[]
    photos: Photo[]
}

const local = (dir: string, count: number): Photo[] =>
    Array.from({ length: count }, (_, i) => {
        const n = String(i + 1).padStart(2, '0')
        return {
            src: `/events/${dir}/${n}.webp`,
            thumb: `/events/${dir}/${n}-thumb.webp`,
        }
    })

const AU = 'https://au-vimenter.github.io/resource'

export const events: VimEvent[] = [
    {
        id: 'jj-workshop-2026',
        name: 'Jujutsu Workshop',
        date: '2026-10-31',
        venue: {
            ko: '튜링의사과, 서울 성동구',
            en: 'Turing’s Apple, Seoul',
            ja: 'チューリングのりんご（ソウル）',
        },
        summary: {
            ko: 'Git 사용자를 위한 Jujutsu(jj) 워크숍. Tangled 개발자 boltless 님과 Git 내부 구조부터 jj 데이터 모델, squash와 rebase, 메가 머지 워크플로우까지 직접 실습했습니다.',
            en: 'A hands-on Jujutsu (jj) workshop for Git users. With boltless, a Tangled developer, we went from Git internals to the jj data model, squash and rebase, and the mega-merge workflow.',
            ja: 'Git ユーザーのための Jujutsu（jj）ワークショップ。Tangled 開発者の boltless さんと、Git の内部構造から jj のデータモデル、squash と rebase、メガマージのワークフローまで実習しました。',
        },
        links: [
            {
                label: {
                    ko: '행사 페이지',
                    en: 'Event page',
                    ja: 'イベントページ',
                },
                href: 'https://event-us.kr/vimkr/event/136098',
            },
            {
                label: {
                    ko: 'YouTube에서 보기',
                    en: 'Watch on YouTube',
                    ja: 'YouTube で見る',
                },
                href: 'https://www.youtube.com/watch?v=DczKGei6igY',
            },
        ],
        video: 'DczKGei6igY',
        talks: [
            {
                title: 'Git 사용자를 위한 Jujutsu Workshop',
                speaker: 'boltless',
                youtube: 'DczKGei6igY',
            },
        ],
        photos: [],
    },
    {
        id: 'vimrc-2025',
        name: 'VIMRC 2025',
        date: '2025-11-30',
        summary: {
            ko: '한 해 동안 다듬은 설정과 이야기를 나눈 연말 모임. 한글 입력의 한계, awk, Fennel로 짠 Neovim 설정, init.lua 다이어트, 플러그인 개발기까지.',
            en: 'Our year-end meetup about the configs we polished all year: Korean input, awk, a Neovim setup in Fennel, an init.lua diet, and building a plugin.',
            ja: '一年かけて磨いた設定を語り合う年末の集まり。ハングル入力の限界、awk、Fennel で書く Neovim 設定、init.lua ダイエット、プラグイン開発まで。',
        },
        links: [
            {
                label: { ko: '발표 자료', en: 'Slides', ja: '発表資料' },
                href: 'https://drive.google.com/drive/folders/1aMdH36D0PK8kvXN2zyV1S5uknb0rLIXf',
            },
        ],
        talks: [
            { title: 'VIM과 한글, 그 한계를 넘어서기' },
            { title: 'awk on vim' },
            { title: 'Fennel Lisp로 Neovim 셋업하기' },
            { title: 'Init.lua 다이어트' },
            { title: 'Neovim plugin dev walkthrough', speaker: 'seungroklee' },
        ],
        photos: local('vimrc-2025', 21),
    },
    {
        id: 'vimenter-2024',
        name: 'VimEnter 2024',
        date: '2024-12-21',
        summary: {
            ko: '세 번째 VimEnter. IdeaVim과 vscode-vim 사용기부터 nix, vised, 의도를 먼저 선언하는 Git 워크플로우까지 여덟 개의 발표.',
            en: 'The third VimEnter: eight talks, from IdeaVim and vscode-vim to nix, vised, and an intent-first Git workflow.',
            ja: '3回目の VimEnter。IdeaVim や vscode-vim の体験談から nix、vised、意図を先に宣言する Git ワークフローまで8本の発表。',
        },
        links: [
            {
                label: { ko: '행사 후기', en: 'Recap', ja: 'レポート' },
                href: 'https://au-vimenter.github.io/post/2024-12-21-au-vimenter/',
            },
        ],
        talks: [
            {
                title: 'IdeaVim 사용 경험 공유',
                speaker: '이효승',
                youtube: '5g7rDb4B9zs',
            },
            {
                title: '터미널에서 Vim을 활용해서 생산성을 높이는 방법',
                speaker: '이광효',
                youtube: '9BsrhrBfARQ',
            },
            {
                title: '대학생의 터미널 생활 적응기',
                speaker: '은은수',
                youtube: 'A41LpWIZ6v0',
            },
            {
                title: 'vi 문법으로 sed 처럼 사용할 수 있는 명령어, vised 개발 후기',
                speaker: '이종립',
                youtube: 'd1uZhjpVMfo',
            },
            {
                title: 'nix를 활용해서 vim의 다양한 문제를 해결하기',
                speaker: 'aca',
                youtube: 'fdMTxqQyYjs',
            },
            {
                title: 'vscode-vim 사용후기',
                speaker: '황정현',
                youtube: 'oOLoE4pJQf4',
            },
            {
                title: '개발자의 의도를 먼저 선언하는 Git Workflow 제안',
                speaker: '차주훈',
                youtube: 'yDRs4Pl1Lq0',
            },
            {
                title: 'You don’t need Plugin, Long live the command-line',
                speaker: '이재열',
                youtube: 'zwgdQclEQoE',
            },
        ],
        photos: [
            {
                src: `${AU}/B1/F54AC0-3DB5-4C66-9E0A-70DA128319B1/vimenter-2024-wide.jpg`,
            },
        ],
    },
    {
        id: 'vimenter-2023',
        name: 'VimEnter 2023',
        date: '2023-12-23',
        summary: {
            ko: '두 번째 VimEnter. Neovim으로 생산성 높이기, 트리시터 플러그인 만들기, Vimwiki용 LSP 만들기 등 여섯 개의 발표.',
            en: 'The second VimEnter: six talks on Neovim productivity, writing a Tree-sitter plugin, building an LSP for Vimwiki, and more.',
            ja: '2回目の VimEnter。Neovim で生産性を上げる話、Tree-sitter プラグイン作り、Vimwiki 用 LSP 作りなど6本の発表。',
        },
        links: [
            {
                label: { ko: '행사 후기', en: 'Recap', ja: 'レポート' },
                href: 'https://au-vimenter.github.io/post/2023-12-23-au-vimenter/',
            },
        ],
        talks: [
            {
                title: 'Neovim으로 생산성 퀀텀점프하기',
                speaker: '이재열',
                youtube: 'DAtLK9AvspI',
            },
            {
                title: '트리시터를 활용해서 나만의 플러그인 만들기',
                speaker: '차주훈',
                youtube: 'EacPHrYRc_4',
            },
            {
                title: 'Windows Unreal Engine 개발자의 Neovim',
                speaker: '이효승',
                youtube: 'I_ZuLhM5bXw',
            },
            {
                title: 'Vimwiki에서 사용하기 위한 나만의 LSP를 만들자',
                speaker: '이종립',
                youtube: 'XlcrTAUVuPI',
            },
            {
                title: 'Vim 힘들고 빠르게 배우는 방법',
                speaker: '한윤석',
                youtube: 'Zy5vBLDAGVA',
            },
            {
                title: 'toggleTerm 플러그인으로 내 손에 맞는 터미널 환경 만들기',
                speaker: '조성진',
                youtube: 'lbZkCPaFom0',
            },
        ],
        photos: [
            '00.jpeg',
            '00-1.jpg',
            '02-cho-1.jpeg',
            '03-johngrib-1.jpeg',
            '04-lee.jpeg',
            '05-cha-1.jpeg',
            '06-kojima.jpeg',
        ].map((f) => ({
            src: `${AU}/A1/3C4C10-123F-43E1-A636-9474A66BA549/${f}`,
        })),
    },
    {
        id: 'vimenter-2022',
        name: 'VimEnter 2022',
        date: '2022-12-23',
        summary: {
            ko: '첫 번째 VimEnter. Vim을 좋아하는 사람들이 처음으로 온라인과 오프라인에서 함께 모였습니다.',
            en: 'The first VimEnter, where people who love Vim met for the first time, online and offline.',
            ja: '最初の VimEnter。Vim を愛する人たちがオンラインとオフラインで初めて集まりました。',
        },
        links: [
            {
                label: { ko: '행사 후기', en: 'Recap', ja: 'レポート' },
                href: 'https://au-vimenter.github.io/post/2022-12-23-au-vimenter/',
            },
        ],
        talks: [],
        photos: ['photo-on.jpeg', 'photo-online.jpeg'].map((f) => ({
            src: `${AU}/94/DF5E75-D0EF-43A9-ABCA-E169D4A67BFB/${f}`,
        })),
    },
]

export const featured = events[0]
