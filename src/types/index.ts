export interface IHeader {
    name: string
    image?: string
}

export interface ICommitDataComponent {
    sha: string
    author: {
        avatar: string
        name: string
        handle: string
    }
    date: string
    repositoryName: string
    repositoryLink: string
    branch: string
    message: string
}

export interface ICommitData {
    sha: string
    author: {
        avatar: string
        name: string
        handle: string
    },
    date: string
    title: string
    message: string
    repository_name: string
    branch_name: string
    hidden: boolean
}

export interface IConfigRepo {
    url: string
    provider: string
    private: boolean
}

export interface IStatsComponent {
    repoName: string
    repoTotalCommits: number
    repoTodayCommits: number
}

export interface ILabel {
    warningLevel?: string
    iconName?: string
    message: string
    closable?: boolean
}
