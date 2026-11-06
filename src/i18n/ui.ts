import type { Lang } from '../data/events'

export const langs: { code: Lang; label: string; path: string }[] = [
    { code: 'ko', label: '한국어', path: '/' },
    { code: 'en', label: 'English', path: '/en/' },
    { code: 'ja', label: '日本語', path: '/ja/' },
]

export const DISCORD = 'https://discord.gg/FCDhM2cw65'
export const GITHUB = 'https://github.com/vim-kr/vim-kr.github.io'

const ko = {
    metaTitle: 'vim.kr — Vim을 좋아하는 사람들의 커뮤니티',
    metaDesc:
        'Vim과 Neovim을 좋아하는 한국 개발자 커뮤니티. VimEnter, VIMRC 같은 행사와 발표 영상, 사진을 모았습니다.',
    tabs: {
        home: '소개',
        events: '행사',
        gallery: '사진',
        join: '참여',
        docs: '문서',
    },
    heroKicker: 'Vi IMproved, in Korea',
    heroTitle: 'Vim을 좋아하는 사람들이 모이는 곳',
    heroBody:
        '처음 :q 를 찾던 사람부터 플러그인을 만드는 사람, 10년 넘게 써 온 사람까지. 디스코드에서 묻고 답하고, 일 년에 몇 번은 직접 만나 설정을 자랑합니다.',
    heroCmds: [
        { cmd: ':join', desc: '디스코드에 참여하기', href: '#join' },
        { cmd: ':events', desc: '지난 행사와 발표 영상', href: '#events' },
        { cmd: ':gallery', desc: '행사 사진 보기', href: '#gallery' },
        { cmd: ':help', desc: '키보드 단축키', href: '#help' },
    ],
    latest: '최근 행사 다시 보기',
    aboutTitle: '소개',
    about: [
        {
            tag: 'vimkr-love',
            title: 'Vim에 대한 애정',
            body: 'Vim을 좋아하는 마음 하나로 모인 따뜻한 커뮤니티입니다. 설정 하나, 단축키 하나에도 진심입니다.',
        },
        {
            tag: 'vimkr-help',
            title: '언제든 물어볼 수 있는 곳',
            body: '초보자부터 플러그인 개발자, 10년 넘게 써 온 사람까지 함께 있어서 막히면 바로 물어볼 수 있습니다.',
        },
        {
            tag: 'vimkr-melting-pot',
            title: '여러 분야의 개발자',
            body: '웹, 모바일, SRE, 연구원까지 다양한 일을 하는 사람들이 각자의 방식으로 Vim을 씁니다.',
        },
    ],
    usedFor: '여기서 Vim으로 하는 일',
    eventsTitle: '행사',
    eventsLead:
        '2022년 첫 VimEnter부터 매년 직접 만나고 있습니다. 접힌 행사는 눌러서 펼칠 수 있어요 (zo).',
    talks: '발표',
    talksUnit: '개 발표',
    photosUnit: '장의 사진',
    seePhotos: '사진 보기',
    playLabel: '재생',
    galleryTitle: '사진',
    galleryAll: '전체',
    joinTitle: '참여',
    joinBody:
        '질문, 설정 자랑, 플러그인 소식, 다음 행사 공지는 모두 디스코드에서 나눕니다.',
    joinButton: '디스코드 참여하기',
    docsTitle: '문서',
    docsBody:
        '커뮤니티가 함께 쓰는 문서입니다. 고치고 싶은 곳이 있으면 GitHub에 PR을 보내 주세요.',
    docs: [
        { title: 'Kickstart.nvim', href: '/vim-as-ide/kickstart/' },
        {
            title: ':Inspect 로 highlight 확인하기',
            href: '/neovim-news/inspect/',
        },
        { title: 'How to Vim', href: '/getting-started/how-to-vim/' },
        { title: 'Note taking with Vim', href: '/note-taking/vimwiki/' },
    ],
    contribute: 'GitHub에서 기여하기',
    helpTitle: '키보드 단축키',
    help: [
        ['j / k', '아래, 위로 스크롤'],
        ['gg / G', '맨 위, 맨 아래로'],
        [':', '명령줄 열기'],
        [':events :gallery :join :docs', '해당 섹션으로 이동'],
        [':lang en', '언어 바꾸기 (ko, en, ja)'],
        ['h / l, Esc', '사진 넘기기, 닫기'],
    ],
    hint: ': 를 눌러 명령을 입력하세요',
    hintTouch: '여기를 눌러 명령 입력',
    notCmd: 'E492: 편집기의 명령이 아님',
    quit: 'E37: 나가지 마세요, 아직 볼 게 많아요',
    lightbox: { close: '닫기', prev: '이전', next: '다음' },
}

type Dict = typeof ko

const en: Dict = {
    metaTitle: 'vim.kr — A community for people who love Vim',
    metaDesc:
        'A Korean community for people who love Vim and Neovim. Meetups like VimEnter and VIMRC, with talk videos and photos.',
    tabs: {
        home: 'about',
        events: 'events',
        gallery: 'photos',
        join: 'join',
        docs: 'docs',
    },
    heroKicker: 'Vi IMproved, in Korea',
    heroTitle: 'Where people who love Vim meet',
    heroBody:
        'From people still looking for :q to plugin authors and decade-long users. We ask and answer on Discord, and a few times a year we meet in person to show off our configs.',
    heroCmds: [
        { cmd: ':join', desc: 'Join our Discord', href: '#join' },
        { cmd: ':events', desc: 'Past meetups and talks', href: '#events' },
        { cmd: ':gallery', desc: 'Event photos', href: '#gallery' },
        { cmd: ':help', desc: 'Keyboard shortcuts', href: '#help' },
    ],
    latest: 'Watch our latest event',
    aboutTitle: 'About',
    about: [
        {
            tag: 'vimkr-love',
            title: 'Love for Vim',
            body: 'A warm community brought together by a love of Vim. We care about every option and every keystroke.',
        },
        {
            tag: 'vimkr-help',
            title: 'Ask anytime',
            body: 'Beginners, plugin developers and people with ten-plus years of Vim are all here, so help is never far away.',
        },
        {
            tag: 'vimkr-melting-pot',
            title: 'Many backgrounds',
            body: 'Web, mobile, SRE, research: people from all kinds of work use Vim in their own way.',
        },
    ],
    usedFor: 'What we do with Vim',
    eventsTitle: 'Events',
    eventsLead:
        'We have met in person every year since the first VimEnter in 2022. Click a folded event to open it (zo).',
    talks: 'Talks',
    talksUnit: ' talks',
    photosUnit: ' photos',
    seePhotos: 'See photos',
    playLabel: 'Play',
    galleryTitle: 'Photos',
    galleryAll: 'all',
    joinTitle: 'Join',
    joinBody:
        'Questions, config show-offs, plugin news and next-event announcements all happen on Discord. Korean is the main language, but everyone is welcome.',
    joinButton: 'Join Discord',
    docsTitle: 'Docs',
    docsBody:
        'Docs written together by the community (mostly in Korean). Pull requests are welcome on GitHub.',
    docs: ko.docs,
    contribute: 'Contribute on GitHub',
    helpTitle: 'Keyboard shortcuts',
    help: [
        ['j / k', 'Scroll down, up'],
        ['gg / G', 'Go to top, bottom'],
        [':', 'Open the command line'],
        [':events :gallery :join :docs', 'Jump to a section'],
        [':lang ko', 'Change language (ko, en, ja)'],
        ['h / l, Esc', 'Previous, next photo, close'],
    ],
    hint: 'Press : to enter a command',
    hintTouch: 'Tap here to enter a command',
    notCmd: 'E492: Not an editor command',
    quit: 'E37: Don’t leave yet, there’s more to see',
    lightbox: { close: 'Close', prev: 'Previous', next: 'Next' },
}

const ja: Dict = {
    metaTitle: 'vim.kr — Vim が好きな人たちのコミュニティ',
    metaDesc:
        'Vim と Neovim が好きな韓国の開発者コミュニティ。VimEnter や VIMRC などのイベント、発表動画、写真をまとめています。',
    tabs: {
        home: '紹介',
        events: 'イベント',
        gallery: '写真',
        join: '参加',
        docs: 'ドキュメント',
    },
    heroKicker: 'Vi IMproved, in Korea',
    heroTitle: 'Vim が好きな人たちが集まる場所',
    heroBody:
        ':q を探している人から、プラグインを作る人、10年以上使い続けている人まで。Discord で質問し合い、年に何度かは実際に集まって設定を自慢し合っています。',
    heroCmds: [
        { cmd: ':join', desc: 'Discord に参加する', href: '#join' },
        { cmd: ':events', desc: '過去のイベントと発表', href: '#events' },
        { cmd: ':gallery', desc: 'イベント写真', href: '#gallery' },
        { cmd: ':help', desc: 'キーボードショートカット', href: '#help' },
    ],
    latest: '最新イベントのアーカイブ',
    aboutTitle: '紹介',
    about: [
        {
            tag: 'vimkr-love',
            title: 'Vim への愛',
            body: 'Vim が好きという気持ちで集まった温かいコミュニティです。設定ひとつ、キーひとつにも本気です。',
        },
        {
            tag: 'vimkr-help',
            title: 'いつでも質問できる',
            body: '初心者からプラグイン開発者、10年以上のユーザーまでいるので、困ったらすぐに聞けます。',
        },
        {
            tag: 'vimkr-melting-pot',
            title: 'さまざまな分野',
            body: 'Web、モバイル、SRE、研究者まで、いろいろな仕事の人がそれぞれのやり方で Vim を使っています。',
        },
    ],
    usedFor: 'ここで Vim を使ってやっていること',
    eventsTitle: 'イベント',
    eventsLead:
        '2022年の最初の VimEnter から毎年集まっています。折りたたまれたイベントはクリックで開けます (zo)。',
    talks: '発表',
    talksUnit: '本の発表',
    photosUnit: '枚の写真',
    seePhotos: '写真を見る',
    playLabel: '再生',
    galleryTitle: '写真',
    galleryAll: 'すべて',
    joinTitle: '参加',
    joinBody:
        '質問、設定自慢、プラグインのニュース、次のイベントのお知らせはすべて Discord で。主な言語は韓国語ですが、どなたでも歓迎です。',
    joinButton: 'Discord に参加する',
    docsTitle: 'ドキュメント',
    docsBody:
        'コミュニティで一緒に書いているドキュメントです（主に韓国語）。GitHub での PR を歓迎します。',
    docs: ko.docs,
    contribute: 'GitHub で貢献する',
    helpTitle: 'キーボードショートカット',
    help: [
        ['j / k', '下、上にスクロール'],
        ['gg / G', '先頭、末尾へ'],
        [':', 'コマンドラインを開く'],
        [':events :gallery :join :docs', 'セクションへ移動'],
        [':lang ko', '言語を切り替える (ko, en, ja)'],
        ['h / l, Esc', '前の写真、次の写真、閉じる'],
    ],
    hint: ': を押してコマンドを入力',
    hintTouch: 'ここをタップしてコマンド入力',
    notCmd: 'E492: エディタのコマンドではありません',
    quit: 'E37: まだ見るものがありますよ',
    lightbox: { close: '閉じる', prev: '前へ', next: '次へ' },
}

export const ui: Record<Lang, Dict> = { ko, en, ja }
