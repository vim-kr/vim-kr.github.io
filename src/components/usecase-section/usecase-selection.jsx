import { useStore } from '@nanostores/react'
import { $usecase, selectUsecase } from 'stores/usecase-store'
import UsecaseLabel from './usecase-label'
import UsecaseRoundedLabel from './usecase-rounded-label'

const usecaseMetadata = {
    ['getting-started']: {
        headline: 'Getting started',
        description: 'vim의 기본기능 보러가기',
        route: '/getting-started/how-to-vim',
        icon: <i class="fa-solid fa-shoe-prints"></i>,
    },
    ['vim-as-ide']: {
        headline: 'Vim as IDE',
        description: 'vim을 환경을 IDE로 사용하기',
        route: '/vim-as-ide/kickstart',
        icon: <i class="fa-solid fa-rocket"></i>,
    },
    ['note-taking']: {
        headline: 'Note taking',
        description: 'vim을 노트 테이킹에 활용하기',
        route: '/note-taking/vimwiki',
        icon: <i class="fa-regular fa-pen-to-square"></i>,
    },
    ['neovim-news']: {
        headline: 'Neovim News',
        description: 'Neovim 관련 업데이트 내용 보러가기',
        route: '/neovim-news/inspect',
        icon: <i class="fa-solid fa-newspaper"></i>,
    },
}

const usecases = Object.keys(usecaseMetadata)

const UsecaseSelection = () => {
    const activeUsecase = useStore($usecase)

    return (
        <div>
            {/* tab */}
            <div className="block md:hidden">
                <div className="flex gap-x-6">
                    {usecases.map((usecase) => (
                        <div
                            className="!m-0"
                            onClick={() => selectUsecase(usecase)}
                        >
                            <UsecaseRoundedLabel
                                isActive={usecase === activeUsecase}
                            >
                                {usecaseMetadata[usecase]['icon']}
                            </UsecaseRoundedLabel>
                        </div>
                    ))}
                </div>
            </div>
            {/* tab content */}
            <div className="md:flex md:justify-between">
                {usecases.map((usecase) => {
                    const isActive = usecase === activeUsecase
                    return (
                        <a
                            href={usecaseMetadata[usecase]['route']}
                            onClick={() => selectUsecase(usecase)}
                        >
                            <div className="!mt-0">
                                <UsecaseLabel isActive={isActive}>
                                    {usecaseMetadata[usecase]['headline']}
                                    <div className="ml-[4px] mt-[10px] text-sm">
                                        {
                                            usecaseMetadata[usecase][
                                                'description'
                                            ]
                                        }
                                        <i class="fa-solid fa-arrow-up-right-from-square ml-[4px]"></i>
                                    </div>
                                </UsecaseLabel>
                            </div>
                        </a>
                    )
                })}
            </div>
        </div>
    )
}

export default UsecaseSelection
