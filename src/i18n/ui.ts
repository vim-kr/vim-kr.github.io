import type { Lang } from '../data/events'

export const langs: { code: Lang; label: string; path: string }[] = [
    { code: 'ko', label: '한국어', path: '/' },
    { code: 'en', label: 'English', path: '/en/' },
    { code: 'ja', label: '日本語', path: '/ja/' },
]

export const DISCORD = 'https://discord.gg/FCDhM2cw65'
export const GITHUB = 'https://github.com/vim-kr/vim-kr.github.io'

// 연습 화면 문구. `x` 처럼 백틱으로 감싼 것은 키캡으로 그린다.
interface Lesson {
    title: string
    body: string
    success: string
}

const ko = {
    metaTitle: 'vim.kr — 한국 Vim 커뮤니티',
    metaDesc:
        'Vim을 처음 쓰는 사람도 환영하는 한국 Vim 커뮤니티. 브라우저에서 Vim 키를 직접 눌러 보고, 행사 영상과 사진을 볼 수 있어요.',
    nav: {
        start: '처음이라면',
        events: '행사',
        gallery: '사진',
        join: '함께하기',
    },
    discord: '디스코드',
    heroKicker: '한국 Vim 커뮤니티',
    heroTyped: ['Vim,', '처음이어도 괜찮아요'],
    heroCta: '지금 해 보기',
    facts: ['매년 오프라인 모임'],
    factsLink: '역대 신청 페이지 보기',
    signup: '신청 페이지',
    list: {
        title: '역대 행사 신청 페이지',
        lead: '지금까지 열린 vim.kr 모임이에요. 다음 행사도 여기에 올라와요.',
        back: '홈으로',
        empty: '공개된 신청 페이지가 없어요',
    },
    pg: {
        label: 'Vim 연습',
        start: '눌러서 시작',
        startSub: '키보드로 입력해요',
        reset: '처음부터',
        prev: '이전',
        next: '다음',
        pressed: '누른 키',
        hangul: '한글 입력 상태여도 괜찮아요',
        lessons: [
            {
                title: '커서 움직이기',
                body: '`h` `j` `k` `l` 로 `*` 까지 가 보세요.',
                success: '좋아요! 화살표 없이 움직였어요.',
            },
            {
                title: '글자 지우기',
                body: '틀린 글자 위에서 `x` 를 눌러 지워요.',
                success: '깔끔해요!',
            },
            {
                title: '글자 쓰기',
                body: '`i` 로 단어를 넣고 `Esc` 로 나와요.',
                success: '이게 Vim의 입력 모드예요.',
            },
            {
                title: '줄 지우기',
                body: '대문자 줄로 가서 `d` `d`.',
                success: '한 줄이 통째로 사라졌죠?',
            },
            {
                title: '되돌리기',
                body: '`d` `d` 로 지우고 `u` 로 되돌려요.',
                success: '언제든 되돌릴 수 있어요.',
            },
            {
                title: 'Vim 나가기',
                body: '`:` `w` `q` 를 치고 `Enter`.',
                success: '이제 Vim을 나갈 줄 알아요!',
            },
        ] as Lesson[],
        doneTitle: '다 했어요!',
        doneBody: [
            '방금 Vim을 직접 써 봤어요.',
            '다음은 터미널에서 vimtutor 예요.',
        ],
        again: '다시 하기',
    },
    latestKicker: '최근 행사',
    latestWatch: 'YouTube에서 보기',
    latestPage: '행사 페이지',
    startTitle: '처음이라면',
    steps: [
        {
            title: '연습하기',
            body: '터미널에 입력해 보세요.\n30분짜리 공식 튜토리얼이 열려요.',
            code: 'vimtutor',
        },
        {
            title: '설정하기',
            body: 'Neovim이라면\n파일 하나로 시작해요.',
            link: {
                label: 'Kickstart.nvim',
                href: 'https://github.com/nvim-lua/kickstart.nvim',
            },
        },
        {
            title: '물어보기',
            body: '막히면 디스코드에 물어보세요.\n초보 질문도 환영해요.',
            link: { label: '디스코드 열기', href: DISCORD },
        },
    ],
    copy: '복사',
    copied: '복사됨',
    eventsTitle: '행사',
    eventsLead: ['2022년부터 매년 만나요.'],
    talks: (n: number) => `발표 ${n}개`,
    photos: (n: number) => `사진 ${n}장`,
    showMore: '펼쳐 보기',
    seePhotos: '사진 보기',
    play: '재생',
    galleryTitle: '사진',
    galleryAll: '전체',
    joinTitle: '함께해요',
    joinBody: ['질문, 설정 자랑, 행사 소식.', '모두 디스코드에 있어요.'],
    joinButton: '디스코드 참여하기',
    footerCode: '이 사이트 고치기',
    lightbox: { close: '닫기', prev: '이전', next: '다음' },
    cmd: {
        hint: '를 눌러 보세요. 이 페이지도 Vim처럼 움직여요.',
        touch: '눌러서 명령 메뉴 열기',
        keys: 'j k 스크롤, gg G 처음과 끝',
        notCmd: 'E492: 없는 명령이에요',
        quit: 'E37: 아직 나가지 마세요!',
        list: [
            ['try', 'Vim 연습'],
            ['start', '처음이라면'],
            ['events', '행사와 영상'],
            ['gallery', '사진'],
            ['join', '디스코드'],
            ['lang en', 'English'],
            ['lang ja', '日本語'],
        ],
    },
}

type Dict = typeof ko

const en: Dict = {
    metaTitle: 'vim.kr — Korean Vim community',
    metaDesc:
        'A Korean Vim community that welcomes beginners. Try Vim keys right in your browser, and watch our meetup talks.',
    nav: {
        start: 'Start here',
        events: 'Events',
        gallery: 'Photos',
        join: 'Join',
    },
    discord: 'Discord',
    heroKicker: 'Korean Vim community',
    heroTyped: ['New to Vim?', 'You’re welcome here'],
    heroCta: 'Try it now',
    facts: ['Meetups every year'],
    factsLink: 'See past sign-up pages',
    signup: 'Sign-up page',
    list: {
        title: 'Past event sign-up pages',
        lead: 'Every vim.kr meetup so far. The next one will show up here too.',
        back: 'Home',
        empty: 'No public sign-up page',
    },
    pg: {
        label: 'Try Vim',
        start: 'Click to start',
        startSub: 'Then use your keyboard',
        reset: 'Restart',
        prev: 'Back',
        next: 'Next',
        pressed: 'Keys',
        hangul: 'Works with any keyboard layout',
        lessons: [
            {
                title: 'Move the cursor',
                body: 'Reach the `*` with `h` `j` `k` `l`.',
                success: 'Nice! No arrow keys needed.',
            },
            {
                title: 'Delete a letter',
                body: 'Press `x` on the wrong letters.',
                success: 'Clean!',
            },
            {
                title: 'Type text',
                body: 'Press `i`, add a word, then `Esc`.',
                success: 'That was insert mode.',
            },
            {
                title: 'Delete a line',
                body: 'Go to the uppercase line, press `d` `d`.',
                success: 'The whole line is gone.',
            },
            {
                title: 'Undo',
                body: 'Delete with `d` `d`, undo with `u`.',
                success: 'You can always undo.',
            },
            {
                title: 'Quit Vim',
                body: 'Type `:` `w` `q` and press `Enter`.',
                success: 'You can quit Vim now!',
            },
        ],
        doneTitle: 'All done!',
        doneBody: [
            'You just used Vim.',
            'Next, run vimtutor in your terminal.',
        ],
        again: 'Try again',
    },
    latestKicker: 'Latest event',
    latestWatch: 'Watch on YouTube',
    latestPage: 'Event page',
    startTitle: 'Start here',
    steps: [
        {
            title: 'Practice',
            body: 'Type this in your terminal.\nThe official 30-minute tutorial opens.',
            code: 'vimtutor',
        },
        {
            title: 'Set up',
            body: 'Using Neovim?\nStart from a single file.',
            link: {
                label: 'Kickstart.nvim',
                href: 'https://github.com/nvim-lua/kickstart.nvim',
            },
        },
        {
            title: 'Ask',
            body: 'Stuck? Ask on Discord.\nBeginner questions are welcome.',
            link: { label: 'Open Discord', href: DISCORD },
        },
    ],
    copy: 'Copy',
    copied: 'Copied',
    eventsTitle: 'Events',
    eventsLead: ['We meet every year since 2022.'],
    talks: (n: number) => `${n} talks`,
    photos: (n: number) => `${n} photos`,
    showMore: 'Show',
    seePhotos: 'See photos',
    play: 'Play',
    galleryTitle: 'Photos',
    galleryAll: 'All',
    joinTitle: 'Join us',
    joinBody: [
        'Questions, configs, event news.',
        'It all happens on Discord (mostly Korean).',
    ],
    joinButton: 'Join Discord',
    footerCode: 'Edit this site',
    lightbox: { close: 'Close', prev: 'Previous', next: 'Next' },
    cmd: {
        hint: 'Press it. This page moves like Vim too.',
        touch: 'Tap to open the command menu',
        keys: 'j k scroll, gg G top and bottom',
        notCmd: 'E492: Not an editor command',
        quit: 'E37: Don’t leave yet!',
        list: [
            ['try', 'Try Vim'],
            ['start', 'Start here'],
            ['events', 'Events and videos'],
            ['gallery', 'Photos'],
            ['join', 'Discord'],
            ['lang ko', '한국어'],
            ['lang ja', '日本語'],
        ],
    },
}

const ja: Dict = {
    metaTitle: 'vim.kr — 韓国の Vim コミュニティ',
    metaDesc:
        '初心者を歓迎する韓国の Vim コミュニティ。ブラウザで Vim のキーを試したり、イベントの発表動画を見たりできます。',
    nav: {
        start: 'はじめて',
        events: 'イベント',
        gallery: '写真',
        join: '参加',
    },
    discord: 'Discord',
    heroKicker: '韓国の Vim コミュニティ',
    heroTyped: ['Vim、', 'はじめてでも大丈夫'],
    heroCta: '今すぐ試す',
    facts: ['毎年オフラインで集まり'],
    factsLink: '過去の申込ページを見る',
    signup: '申込ページ',
    list: {
        title: '過去のイベント申込ページ',
        lead: 'これまでの vim.kr の集まりです。次のイベントもここに載ります。',
        back: 'ホームへ',
        empty: '公開された申込ページはありません',
    },
    pg: {
        label: 'Vim 練習',
        start: 'クリックして開始',
        startSub: 'キーボードで入力します',
        reset: '最初から',
        prev: '前へ',
        next: '次へ',
        pressed: '押したキー',
        hangul: 'かな入力のままでも大丈夫',
        lessons: [
            {
                title: 'カーソル移動',
                body: '`h` `j` `k` `l` で `*` まで行こう。',
                success: 'いいですね！矢印キーなしで動けました。',
            },
            {
                title: '文字を消す',
                body: '間違った文字の上で `x`。',
                success: 'きれいになりました！',
            },
            {
                title: '文字を書く',
                body: '`i` で単語を入れて `Esc`。',
                success: 'これが挿入モードです。',
            },
            {
                title: '行を消す',
                body: '大文字の行で `d` `d`。',
                success: '一行まるごと消えました。',
            },
            {
                title: '元に戻す',
                body: '`d` `d` で消して `u` で戻す。',
                success: 'いつでも元に戻せます。',
            },
            {
                title: 'Vim を終了',
                body: '`:` `w` `q` を打って `Enter`。',
                success: 'もう Vim を終了できます！',
            },
        ],
        doneTitle: 'できました！',
        doneBody: [
            'いま Vim を使いました。',
            '次はターミナルで vimtutor です。',
        ],
        again: 'もう一度',
    },
    latestKicker: '最新イベント',
    latestWatch: 'YouTube で見る',
    latestPage: 'イベントページ',
    startTitle: 'はじめての方へ',
    steps: [
        {
            title: '練習する',
            body: 'ターミナルで入力してみましょう。\n公式の30分チュートリアルが開きます。',
            code: 'vimtutor',
        },
        {
            title: '設定する',
            body: 'Neovim なら\nファイルひとつで始められます。',
            link: {
                label: 'Kickstart.nvim',
                href: 'https://github.com/nvim-lua/kickstart.nvim',
            },
        },
        {
            title: '質問する',
            body: '困ったら Discord で質問を。\n初心者の質問も歓迎です。',
            link: { label: 'Discord を開く', href: DISCORD },
        },
    ],
    copy: 'コピー',
    copied: 'コピー済み',
    eventsTitle: 'イベント',
    eventsLead: ['2022年から毎年集まっています。'],
    talks: (n: number) => `発表 ${n}本`,
    photos: (n: number) => `写真 ${n}枚`,
    showMore: '開く',
    seePhotos: '写真を見る',
    play: '再生',
    galleryTitle: '写真',
    galleryAll: 'すべて',
    joinTitle: '一緒にどうぞ',
    joinBody: [
        '質問、設定自慢、イベント情報。',
        'すべて Discord で（主に韓国語）。',
    ],
    joinButton: 'Discord に参加',
    footerCode: 'このサイトを直す',
    lightbox: { close: '閉じる', prev: '前へ', next: '次へ' },
    cmd: {
        hint: 'を押してみて。このページも Vim のように動きます。',
        touch: 'タップしてコマンドメニューを開く',
        keys: 'j k スクロール、gg G 先頭と末尾',
        notCmd: 'E492: エディタのコマンドではありません',
        quit: 'E37: まだ終わらないで！',
        list: [
            ['try', 'Vim 練習'],
            ['start', 'はじめて'],
            ['events', 'イベントと動画'],
            ['gallery', '写真'],
            ['join', 'Discord'],
            ['lang ko', '한국어'],
            ['lang en', 'English'],
        ],
    },
}

export const ui: Record<Lang, Dict> = { ko, en, ja }
