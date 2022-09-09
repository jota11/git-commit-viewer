import { global_APIURLs, commitConfigs } from "config";
import { ICommitData } from "types";

export class Github {
    // Remove?
    // private static headers_githubRequest = [
    //     ["Accept", "application/vnd.github+json"],
    // ];
    private static headers_githubRequestAuth = new Headers([
        ["Accept", "application/vnd.github+json"],
        ["Authorization", `token ${process.env.APIKEY_GITHUB}`]
    ]);

    private static hideInfo(message: string): boolean {
        let hide = false;
        commitConfigs.prefix_hideCommit.map((prefix) => {
            if (message.startsWith(prefix)) {
                hide = true;
            }
        });
        return hide;
    }

    // /**
    // * TODO: Incomplete
    // *
    // * Returns the branch of the commit.
    // * @param {string} url
    // */
    // private static async getBranch(url: string): Promise<string> {
    // }

    /**
    * TODO: Incomplete
    *
    * Returns all commits in the repository.
    * @param {string} url The repository's full URL
    * @param {boolean} isPrivate - boolean
    */
    public static async getCommits(url: string, isPrivate: boolean): Promise<ICommitData[]> {
        // let githubCommits = [""];
        // githubCommits.shift();
        let githubCommits: ICommitData[] = [];
        const repoName = url.slice(19);
        const urlL = global_APIURLs.github + repoName + "/commits?per_page=100";
        if (isPrivate) {
            const commits = await fetch(urlL, {
                headers: this.headers_githubRequestAuth
            }).then(res => { if (res.status == 200) return res.json() })
            .catch(error => console.error("Error getting private Github commits! " + error));

            commits.map(async (data: any) => {
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
                        branch_name: commitConfigs.hiddenCommit_branchName,
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
                        branch_name: "[branch]",
                        hidden: false
                    }
                }
                githubCommits.push(obj);
                // githubCommits.push(...obj);
            });
        } else {
            const commits = await fetch(urlL, {
                headers: this.headers_githubRequestAuth
            }).then(res => { if (res.status == 200) return res.json() })
            .catch(error => console.error("Error getting Github commits! " + error));

            commits.map(async (data: any) => {
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
                        branch_name: commitConfigs.hiddenCommit_branchName,
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
                        branch_name: "[branch]",
                        hidden: false
                    }
                }
                githubCommits.push(obj);
            });
        }
        return githubCommits;
    }

    /**
    * Returns a specific commit in the repository.
    * @param {string} url The repository's full URL
    * @param {boolean} isPrivate - boolean
    * @param {string} sha - The commit's full SHA
    */
    public static async getCommit(url: string, isPrivate: boolean, sha: string): Promise<ICommitData> {
        let githubCommit!: ICommitData;
        const repoName = url.slice(19);
        const urlL = global_APIURLs.github + repoName + "/commits/" + sha;
        if (isPrivate) {
            const commit = await fetch(urlL, {
                headers: this.headers_githubRequestAuth
            }).then(res => { if (res.status == 200) return res.json() })
            .catch(error => console.error("Error getting private Github commit! " + error));

            let obj: ICommitData;
            if (this.hideInfo(commit.commit.message)) {
                obj = {
                    sha: commitConfigs.hiddenCommit_sha,
                    author: {
                        avatar: commit.author.avatar_url,
                        name: commit.commit.author.name,
                        handle: commit.author.login
                    },
                    date: commit.commit.author.date,
                    title: commitConfigs.hiddenCommit_message,
                    message: commitConfigs.hiddenCommit_message,
                    repository_name: commitConfigs.hiddenCommit_repositoryName,
                    branch_name: commitConfigs.hiddenCommit_branchName,
                    hidden: true
                }
            } else {
                obj = {
                    sha: commit.sha,
                    author: {
                        avatar: commit.author.avatar_url,
                        name: commit.commit.author.name,
                        handle: commit.author.login
                    },
                    date: commit.commit.author.date,
                    title: commit.commit.message,
                    message: commit.commit.message,
                    repository_name: commit.html_url.split("/")[4],
                    branch_name: "[branch]",
                    hidden: false
                }
            }
            githubCommit = obj;
        } else {
            const commit = await fetch(urlL, {
                headers: this.headers_githubRequestAuth
            }).then(res => { if (res.status == 200) return res.json() })
            .catch(error => console.error("Error getting Github commit! " + error));

            let obj: ICommitData;
            if (this.hideInfo(commit.commit.message)) {
                obj = {
                    sha: commitConfigs.hiddenCommit_sha,
                    author: {
                        avatar: commit.author.avatar_url,
                        name: commit.commit.author.name,
                        handle: commit.author.login
                    },
                    date: commit.commit.author.date,
                    title: commitConfigs.hiddenCommit_message,
                    message: commitConfigs.hiddenCommit_message,
                    repository_name: commitConfigs.hiddenCommit_repositoryName,
                    branch_name: commitConfigs.hiddenCommit_branchName,
                    hidden: true
                }
            } else {
                obj = {
                    sha: commit.sha,
                    author: {
                        avatar: commit.author.avatar_url,
                        name: commit.commit.author.name,
                        handle: commit.author.login
                    },
                    date: commit.commit.author.date,
                    title: commit.commit.message,
                    message: commit.commit.message,
                    repository_name: commit.html_url.split("/")[4],
                    branch_name: "[branch]",
                    hidden: false
                }
            }
            githubCommit = obj;
        }
        return githubCommit;
    }
}
