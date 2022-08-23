import { global_APIURLs, apikeyGithub, commitConfigs } from "config";
import { ICommitData } from "types";

export class Github {
    private static headers_githubRequest = [
        ["Accept", "application/vnd.github+json"],
    ];
    private static headers_githubRequestAuth = [
        ["Accept", "application/vnd.github+json"],
        ["Authorization", `token ${apikeyGithub}`]
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

    public static async Github_getCommits(url: string, isPrivate: boolean): Promise<ICommitData[]> {
        // let githubCommits = [""];
        // githubCommits.shift();
        let githubCommits: ICommitData[] = [];
        const urlL = url.slice(19);
        if (isPrivate) {
            await fetch(global_APIURLs.github + urlL + "/commits", {
                headers: new Headers(this.headers_githubRequestAuth)
            })
            .then(res => res.json())
            .then(data => {
                data.map((data: any) => {
                    let obj: ICommitData;
                    if (this.hideInfo(data.commit.message)) {
                        obj = {
                            sha: commitConfigs.hiddenCommit_sha,
                            author: {
                                avatar: data.author.avatar_url,
                                name: data.commit.author.name,
                                handle: data.author.login
                            },
                            date: data.commit.author.date,
                            title: commitConfigs.hiddenCommit_message,
                            message: commitConfigs.hiddenCommit_message,
                            repository_name: commitConfigs.hiddenCommit_repositoryName,
                            hidden: true
                        }
                    } else {
                        obj = {
                            sha: data.sha,
                            author: {
                                avatar: data.author.avatar_url,
                                name: data.commit.author.name,
                                handle: data.author.login
                            },
                            date: data.commit.author.date,
                            title: data.commit.message,
                            message: data.commit.message,
                            repository_name: data.html_url.split("/")[4],
                            hidden: false
                        }
                    }
                    githubCommits.push(obj);
                    // githubCommits.push(...obj);
                });
            }).catch(error => console.error("Error getting private Github commits! " + error));
        } else {
            await fetch(global_APIURLs.github + urlL + "/commits", {
                headers: new Headers(this.headers_githubRequest)
            })
            .then(res => res.json())
            .then(data => {
                data.map((data: any) => {
                    let obj: ICommitData;
                    if (this.hideInfo(data.commit.message)) {
                        obj = {
                            sha: commitConfigs.hiddenCommit_sha,
                            author: {
                                avatar: data.author.avatar_url,
                                name: data.commit.author.name,
                                handle: data.author.login
                            },
                            date: data.commit.author.date,
                            title: commitConfigs.hiddenCommit_message,
                            message: commitConfigs.hiddenCommit_message,
                            repository_name: commitConfigs.hiddenCommit_repositoryName,
                            hidden: true
                        }
                    } else {
                        obj = {
                            sha: data.sha,
                            author: {
                                avatar: data.author.avatar_url,
                                name: data.commit.author.name,
                                handle: data.author.login
                            },
                            date: data.commit.author.date,
                            title: data.commit.message,
                            message: data.commit.message,
                            repository_name: data.html_url.split("/")[4],
                            hidden: false
                        }
                    }
                    githubCommits.push(obj);
                });
            }).catch(error => console.error("Error getting Github commits! " + error));
        }
        return githubCommits;
    }

    public static async Github_getCommit(url: string, isPrivate: boolean, sha: string): Promise<ICommitData> {
        let githubCommit!: ICommitData;
        const urlL = url.slice(19);
        if (isPrivate) {
            await fetch(global_APIURLs.github + urlL + "/commits/" + sha, {
                headers: new Headers(this.headers_githubRequestAuth)
            })
            .then(res => res.json())
            .then(data => {
                let obj: ICommitData;
                if (this.hideInfo(data.commit.message)) {
                    obj = {
                        sha: commitConfigs.hiddenCommit_sha,
                        author: {
                            avatar: data.author.avatar_url,
                            name: data.commit.author.name,
                            handle: data.author.login
                        },
                        date: data.commit.author.date,
                        title: commitConfigs.hiddenCommit_message,
                        message: commitConfigs.hiddenCommit_message,
                        repository_name: commitConfigs.hiddenCommit_repositoryName,
                        hidden: true,
                    }
                } else {
                    obj = {
                        sha: data.sha,
                        author: {
                            avatar: data.author.avatar_url,
                            name: data.commit.author.name,
                            handle: data.author.login
                        },
                        date: data.commit.author.date,
                        title: data.commit.message,
                        message: data.commit.message,
                        repository_name: data.html_url.split("/")[4],
                        hidden: false
                    }
                }
                githubCommit = obj;
            }).catch(error => console.error("Error getting private Github commit! " + error));
        } else {
            await fetch(global_APIURLs.github + urlL + "/commits/" + sha, {
                headers: new Headers(this.headers_githubRequest)
            })
            .then(res => res.json())
            .then(data => {
                let obj: ICommitData
                if (this.hideInfo(data.commit.message)) {
                    obj = {
                        sha: commitConfigs.hiddenCommit_sha,
                        author: {
                            avatar: data.author.avatar_url,
                            name: data.commit.author.name,
                            handle: data.author.login
                        },
                        date: data.commit.author.date,
                        title: commitConfigs.hiddenCommit_message,
                        message: commitConfigs.hiddenCommit_message,
                        repository_name: commitConfigs.hiddenCommit_repositoryName,
                        hidden: true,
                    }
                } else {
                    obj = {
                        sha: data.sha,
                        author: {
                            avatar: data.author.avatar_url,
                            name: data.commit.author.name,
                            handle: data.author.login
                        },
                        date: data.commit.author.date,
                        title: data.commit.message,
                        message: data.commit.message,
                        repository_name: data.html_url.split("/")[4],
                        hidden: false
                    }
                }
                githubCommit = obj;
            }).catch(error => console.error("Error getting Github commit! " + error));
        }
        return githubCommit;
    }
}
