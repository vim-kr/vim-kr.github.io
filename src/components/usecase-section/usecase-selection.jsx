import { useStore } from '@nanostores/react'
import { $usecase, selectUsecase } from 'stores/usecase-store'
import UsecaseLabel from './usecase-label'
import UsecaseRoundedLabel from './usecase-rounded-label'
import UsecaseDescription from './usecase-description'

const usecaseMetadata = {
    ['getting-started']: {
        headline: 'Getting started',
        description: 'vim의 기본기능에 대해서 알아보자',
        route: '/getting-started/how-to-vim',
    },
    ['vim-as-ide']: {
        headline: 'Vim as IDE',
        description: 'vim을 어떻게 하면 IDE처럼 사용하는 방법에 대해 알아보자',
        route: '/vim-as-ide/kickstart',
    },
    ['note-taking']: {
        headline: 'Note taking',
        description: 'vim을 어떻게 하면 노트 테이킹에 활용할 수 있을까',
        route: '/note-taking/vimwiki',
    },
    ['vim-as-tui']: {
        headline: 'Vim as TUI',
        description: 'vim을 어떻게 하면 TUI로 활용할 수 있을까',
        route: '/',
    },
}

const usecases = Object.keys(usecaseMetadata)

const UsecaseSelection = () => {
    const activeUsecase = useStore($usecase)

    return (
        <div>
            <div className="block md:hidden">
                <div className="flex gap-x-6">
                    {usecases.map((usecase, index) => (
                        <div
                            className="!m-0"
                            onClick={() => selectUsecase(usecase)}
                        >
                            <UsecaseRoundedLabel
                                isActive={usecase === activeUsecase}
                            >
                                {index + 1}
                            </UsecaseRoundedLabel>
                        </div>
                    ))}
                </div>
            </div>
            {usecases.map((usecase) => {
                const isActive = usecase === activeUsecase
                return (
                    <div
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
