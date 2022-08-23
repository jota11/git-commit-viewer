import { global_APIURLs, apikeyGitlab, commitConfigs } from "config";
import { ICommitData } from "types";

export class Gitlab {
    private static headers_gitlabRequest = [
        ["Content-Type", "application/json"],
    ];
    private static headers_gitlabRequestAuth = [
        ["Content-Type", "application/json"],
        ["PRIVATE-TOKEN", `${apikeyGitlab}`]
    ];

    private static hideInfo(message: string): boolean {
        let hide = false;
        commitConfigs.prefix_hideCommit.map((prefix) => {
            if (message.startsWith(prefix)) {
                hide = true;
            }
        });
        return hide;
    }

    /**
    * ========== !FIGURE THIS OUT! ==========
    *
    * GitLab doesn't return the commit's author's avatar in the
    * commit response, so we need to call a different endpoint.
    * @param {string} email
    */
    private static async getAvatarOfCommitsAuthor(email: string): Promise<string> {
        let avatarUrl = "";
        await fetch(global_APIURLs.gitlab + "/avatar?email=" + email + "&size=128")
        .then(res => res.json())
        .then(data => avatarUrl = data.avatar_url)
        .catch(error => console.error("Avatar error! " + error));
        return avatarUrl;
    }

    public static async Gitlab_getCommits(url: string, isPrivate: boolean): Promise<ICommitData[]> {
        let gitlabCommits: ICommitData[] = [];
        const urlL = url.slice(19).split("/").join("%2F");
        if (isPrivate) {
            await fetch(global_APIURLs.gitlab + "projects/" + urlL + "/repository/commits", {
                headers: new Headers(this.headers_gitlabRequestAuth),
            })
            .then(res => res.json())
            .then(data => {
                data.map((data: any) => {
                    let obj: ICommitData;
                    if (this.hideInfo(data.message)) {
                        obj = {
                            sha: commitConfigs.hiddenCommit_sha,
                            author: {
                                avatar: "/images/avatar.jpg",
                                name: data.author_name,
                                handle: data.author_name
                            },
                            date: data.created_at,
                            title: commitConfigs.hiddenCommit_message,
                            message: commitConfigs.hiddenCommit_message,
                            repository_name: commitConfigs.hiddenCommit_repositoryName,
                            hidden: true
                        }
                    } else {
                        obj = {
                            sha: data.id,
                            author: {
                                avatar: "/images/avatar.jpg",
                                name: data.author_name,
                                handle: data.author_name
                            },
                            date: data.created_at,
                            title: data.title,
                            message: data.message,
                            repository_name: data.web_url.split("/")[4],
                            hidden: false
                        }
                    }
                    gitlabCommits.push(obj);
                });
            }).catch(error => console.error("Error getting private Gitlab commits! " + error));
        } else {
            await fetch(global_APIURLs.gitlab + "projects/" + urlL + "/repository/commits", {
                headers: new Headers(this.headers_gitlabRequest)
            })
            .then(res => res.json())
            .then(data => {
                data.map(async (data: any) => {
                    let obj: ICommitData;
                    // let avatar = await this.getAvatarOfCommitsAuthor(d.author_email);
                    if (this.hideInfo(data.message)) {
                        obj = {
                            sha: commitConfigs.hiddenCommit_sha,
                            author: {
                                avatar: "/images/avatar.jpg",
                                name: data.author_name,
                                handle: data.author_name
                            },
                            date: data.created_at,
                            title: commitConfigs.hiddenCommit_message,
                            message: commitConfigs.hiddenCommit_message,
                            repository_name: commitConfigs.hiddenCommit_repositoryName,
                            hidden: true
                        }
                    } else {
                        obj = {
                            sha: data.id,
                            author: {
                                avatar: "/images/avatar.jpg",
                                name: data.author_name,
                                handle: data.author_name
                            },
                            date: data.created_at,
                            title: data.title,
                            message: data.message,
                            repository_name: data.web_url.split("/")[4],
                            hidden: false
                        }
                    }
                    gitlabCommits.push(obj);
                });
            }).catch(error => console.error("Error getting Gitlab commits! " + error));
        }
        return gitlabCommits;
    }

    public static async Gitlab_getCommit(url: string, isPrivate: boolean, sha: string): Promise<ICommitData> {
        let gitlabCommit!: ICommitData;
        const urlL = url.slice(19).split("/").join("%2F");
        if (isPrivate) {
            await fetch(global_APIURLs.gitlab + "projects/" + urlL + "/repository/commits/" + sha, {
                headers: new Headers(this.headers_gitlabRequestAuth)
            })
            .then(res => res.json())
            .then(async data => {
                let obj: ICommitData;
                let avatar = await this.getAvatarOfCommitsAuthor(data.author_email);
                if (this.hideInfo(data.message)) {
                    obj = {
                        sha: commitConfigs.hiddenCommit_sha,
                        author: {
                            avatar: "/images/avatar.jpg",
                            name: data.author_name,
                            handle: data.author_name
                        },
                        date: data.created_at,
                        title: commitConfigs.hiddenCommit_message,
                        message: commitConfigs.hiddenCommit_message,
                        repository_name: commitConfigs.hiddenCommit_repositoryName,
                        hidden: true
                    }
                } else {
                    obj = {
                        sha: data.id,
                        author: {
                            avatar: avatar,
                            name: data.author_name,
                            handle: data.author_name
                        },
                        date: data.created_at,
                        title: data.title,
                        message: data.message,
                        repository_name: data.web_url.split("/")[4],
                        hidden: false
                    }
                }
                gitlabCommit = obj;
            }).catch(error => console.error("Error getting private Gitlab commit! " + error));
        } else {
            await fetch(global_APIURLs.gitlab + "projects/" + urlL + "/repository/commits/" + sha, {
                headers: new Headers(this.headers_gitlabRequest)
            })
            .then(res => res.json())
            .then(async data => {
                let obj: ICommitData;
                let avatar = await this.getAvatarOfCommitsAuthor(data.author_email);
                if (this.hideInfo(data.message)) {
                    obj = {
                        sha: commitConfigs.hiddenCommit_sha,
                        author: {
                            avatar: "/images/avatar.jpg",
                            name: data.author_name,
                            handle: data.author_name
                        },
                        date: data.created_at,
                        title: commitConfigs.hiddenCommit_message,
                        message: commitConfigs.hiddenCommit_message,
                        repository_name: commitConfigs.hiddenCommit_repositoryName,
                        hidden: true
                    }
                } else {
                    obj = {
                        sha: data.id,
                        author: {
                            avatar: avatar,
                            name: data.author_name,
                            handle: data.author_name
                        },
                        date: data.created_at,
                        title: data.title,
                        message: data.message,
                        repository_name: data.web_url.split("/")[4],
                        hidden: false
                    }
                }
                gitlabCommit = obj;
            }).catch(error => console.error("Error getting Gitlab commit! " + error));
        }
        return gitlabCommit;
    }
}
