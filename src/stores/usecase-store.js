import { atom } from 'nanostores'

export const $usecase = atom('vim-as-ide')

export function selectUsecase(label) {
    $usecase.set(label)
}
