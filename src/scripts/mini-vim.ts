// 연습 화면용 아주 작은 Vim. 초보 연습에 필요한 키만 다룬다.
export type Mode = 'normal' | 'insert' | 'command'

interface Snapshot {
    lines: string[]
    row: number
    col: number
}

export class MiniVim {
    lines: string[]
    row: number
    col: number
    mode: Mode = 'normal'
    cmd = ''
    msg = ''
    pending = ''
    undoCount = 0
    deleteCount = 0
    lastEx = ''
    private undo: Snapshot[] = []
    private reg: string[] | null = null
    private wantCol = 0

    constructor(lines: string[], row = 0, col = 0) {
        this.lines = [...lines]
        this.row = row
        this.col = col
        this.wantCol = col
    }

    get line() {
        return this.lines[this.row] ?? ''
    }

    private snap() {
        this.undo.push({ lines: [...this.lines], row: this.row, col: this.col })
    }

    private clamp() {
        if (this.lines.length === 0) this.lines = ['']
        this.row = Math.max(0, Math.min(this.row, this.lines.length - 1))
        const max =
            this.mode === 'insert'
                ? this.line.length
                : Math.max(0, this.line.length - 1)
        this.col = Math.max(0, Math.min(this.col, max))
    }

    private nextWord(): number {
        const s = this.line
        let i = this.col
        const kind = (c: string) => (/\s/.test(c) ? 0 : /\w/.test(c) ? 1 : 2)
        const k = kind(s[i] ?? ' ')
        while (i < s.length && kind(s[i]) === k && k !== 0) i++
        while (i < s.length && kind(s[i]) === 0) i++
        return i
    }

    private prevWord(): number {
        const s = this.line
        let i = this.col - 1
        while (i > 0 && /\s/.test(s[i])) i--
        const w = /\w/.test(s[i] ?? '')
        while (i > 0 && !/\s/.test(s[i - 1]) && /\w/.test(s[i - 1]) === w) i--
        return Math.max(0, i)
    }

    key(k: string) {
        this.msg = ''
        if (this.mode === 'insert') this.insertKey(k)
        else if (this.mode === 'command') this.commandKey(k)
        else this.normalKey(k)
        this.clamp()
    }

    private normalKey(k: string) {
        const p = this.pending
        this.pending = ''
        if (p === 'd') {
            if (k === 'd') {
                this.snap()
                this.reg = [this.line]
                this.lines.splice(this.row, 1)
                this.deleteCount++
            } else if (k === 'w') {
                this.snap()
                const end = this.nextWord()
                this.lines[this.row] =
                    this.line.slice(0, this.col) + this.line.slice(end)
            }
            return
        }
        if (p === 'g') {
            if (k === 'g') this.row = 0
            return
        }
        if (p === 'y') {
            if (k === 'y') this.reg = [this.line]
            return
        }
        const vertical = (d: number) => {
            this.row += d
            this.col = this.wantCol
        }
        switch (k) {
            case 'h':
            case 'ArrowLeft':
                this.col--
                break
            case 'l':
            case 'ArrowRight':
                this.col++
                break
            case 'j':
            case 'ArrowDown':
                return vertical(1)
            case 'k':
            case 'ArrowUp':
                return vertical(-1)
            case '0':
                this.col = 0
                break
            case '^':
                this.col = this.line.search(/\S|$/)
                break
            case '$':
                this.col = this.line.length
                break
            case 'w':
                if (
                    this.nextWord() >= this.line.length &&
                    this.row < this.lines.length - 1
                ) {
                    this.row++
                    this.col = this.line.search(/\S|$/)
                } else this.col = this.nextWord()
                break
            case 'b':
                this.col = this.prevWord()
                break
            case 'G':
                this.row = this.lines.length - 1
                break
            case 'd':
            case 'g':
            case 'y':
                this.pending = k
                return
            case 'x':
                if (this.line.length) {
                    this.snap()
                    this.lines[this.row] =
                        this.line.slice(0, this.col) +
                        this.line.slice(this.col + 1)
                }
                break
            case 'p':
                if (this.reg) {
                    this.snap()
                    this.lines.splice(this.row + 1, 0, ...this.reg)
                    this.row++
                    this.col = 0
                }
                break
            case 'u': {
                const s = this.undo.pop()
                if (s) {
                    this.lines = s.lines
                    this.row = s.row
                    this.col = s.col
                    this.undoCount++
                    this.msg = '1 change; before #' + (this.undo.length + 1)
                } else this.msg = 'Already at oldest change'
                break
            }
            case 'i':
                this.snap()
                this.mode = 'insert'
                break
            case 'a':
                this.snap()
                this.mode = 'insert'
                if (this.line.length) this.col++
                break
            case 'I':
                this.snap()
                this.mode = 'insert'
                this.col = this.line.search(/\S|$/)
                break
            case 'A':
                this.snap()
                this.mode = 'insert'
                this.col = this.line.length
                break
            case 'o':
            case 'O':
                this.snap()
                this.mode = 'insert'
                if (k === 'o') this.row++
                this.lines.splice(this.row, 0, '')
                this.col = 0
                break
            case ':':
                this.mode = 'command'
                this.cmd = ''
                break
        }
        this.wantCol = this.col
    }

    private insertKey(k: string) {
        const s = this.line
        if (k === 'Escape') {
            this.mode = 'normal'
            this.col--
        } else if (k === 'Backspace') {
            if (this.col > 0) {
                this.lines[this.row] =
                    s.slice(0, this.col - 1) + s.slice(this.col)
                this.col--
            } else if (this.row > 0) {
                const prev = this.lines[this.row - 1]
                this.lines.splice(this.row - 1, 2, prev + s)
                this.row--
                this.col = prev.length
            }
        } else if (k === 'Enter') {
            this.lines.splice(
                this.row,
                1,
                s.slice(0, this.col),
                s.slice(this.col)
            )
            this.row++
            this.col = 0
        } else if (k === 'ArrowLeft') this.col--
        else if (k === 'ArrowRight') this.col++
        else if ([...k].length === 1) {
            this.lines[this.row] = s.slice(0, this.col) + k + s.slice(this.col)
            this.col++
        }
        this.wantCol = this.col
    }

    private commandKey(k: string) {
        if (k === 'Escape') this.mode = 'normal'
        else if (k === 'Backspace') {
            if (!this.cmd) this.mode = 'normal'
            this.cmd = this.cmd.slice(0, -1)
        } else if (k === 'Enter') {
            this.mode = 'normal'
            this.lastEx = this.cmd.trim()
            if (!/^(w|q|q!|wq|wq!|x|qa|qa!)$/.test(this.lastEx))
                this.msg = `E492: Not an editor command: ${this.lastEx}`
        } else if ([...k].length === 1) this.cmd += k
    }
}
