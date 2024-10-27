import { useStore } from '@nanostores/react'
import { $usecase, selectUsecase } from 'stores/usecase-store'
import UsecaseLabel from './usecase-label'
import UsecaseRoundedLabel from './usecase-rounded-label'

const usecaseMetadata = {
    ['getting-started']: {
        headline: 'Getting started',
        description: 'vim의 기본기능 보러가기',
        route: '/getting-started/how-to-vim',
        icon: <i className="fa-solid fa-shoe-prints"></i>,
    },
    ['vim-as-ide']: {
        headline: 'Vim as IDE',
        description: 'vim을 환경을 IDE로 사용하기',
        route: '/vim-as-ide/kickstart',
        icon: <i className="fa-solid fa-rocket"></i>,
    },
    ['note-taking']: {
        headline: 'Note taking',
        description: 'vim을 노트 테이킹에 활용하기',
        route: '/note-taking/vimwiki',
        icon: <i className="fa-regular fa-pen-to-square"></i>,
    },
    ['neovim-news']: {
        headline: 'Neovim News',
        description: 'Neovim 관련 업데이트 내용 보러가기',
        route: '/neovim-news/inspect',
        icon: <i className="fa-solid fa-newspaper"></i>,
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
                            key={usecase}
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
            <div className="flex flex-col md:!grid md:grid-cols-2 md:gap-x-16 md:gap-y-12">
                {usecases.map((usecase) => {
                    const isActive = usecase === activeUsecase
                    return (
                        <a
                            key={usecase}
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
                                        <i className="fa-solid fa-arrow-up-right-from-square ml-[4px]"></i>
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
