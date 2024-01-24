import { useStore } from '@nanostores/react'
import { $usecase, selectUsecase } from 'stores/usecase-store'
import UsecaseLabel from './usecase-label'
import UsecaseRoundedLabel from './usecase-rounded-label'

const usecases = ['vim-as-ide', 'note-taking', 'research', 'vim-as-tui']

const usecaseMetadata = {
    ['vim-as-ide']: {
        headline: 'Vim as IDE',
    },
    ['note-taking']: {
        headline: 'Note taking',
    },
    ['research']: {
        headline: 'Research',
    },
    ['vim-as-tui']: {
        headline: 'Vim as TUI',
    },
}

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
            {usecases.map((usecase) => (
                <div onClick={() => selectUsecase(usecase)}>
                    <UsecaseLabel isActive={usecase === activeUsecase}>
                        {usecaseMetadata[usecase]['headline']}
                    </UsecaseLabel>
                </div>
            ))}
        </div>
    )
}

export default UsecaseSelection
