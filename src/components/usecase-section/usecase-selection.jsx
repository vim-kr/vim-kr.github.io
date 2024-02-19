import { useStore } from '@nanostores/react'
import { $usecase, selectUsecase } from 'stores/usecase-store'
import UsecaseLabel from './usecase-label'
import UsecaseRoundedLabel from './usecase-rounded-label'
import UsecaseDescription from './usecase-description'

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
            {usecases.map((usecase) => {
                const isActive = usecase === activeUsecase
                return (
                    <div
                        className="!mt-0"
                        onClick={() => {
                            selectUsecase(usecase)
                        }}
                    >
                        <UsecaseLabel isActive={isActive}>
                            {usecaseMetadata[usecase]['headline']}
                        </UsecaseLabel>
                        {isActive && (
                            <UsecaseDescription
                                description={
                                    usecaseMetadata[usecase]['description']
                                }
                                route={usecaseMetadata[usecase]['route']}
                            />
                        )}
                    </div>
                )
            })}
        </div>
    )
}

export default UsecaseSelection
