import { global_APIURLs, commitConfigs } from "config";
import { ICommitData } from "types";

export class Gitlab {
    private static headers_gitlabRequest = new Headers([
        ["Content-Type", "application/json"],
    ]);
    private static headers_gitlabRequestAuth = new Headers([
        ["Content-Type", "application/json"],
        ["PRIVATE-TOKEN", `${process.env.APIKEY_GITLAB}`]
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

     private static makeCommitData(commit: any, avatar: string, branchName: string): ICommitData {
        let obj: ICommitData;
        obj = {
            sha: commit.id,
            author: {
                avatar: avatar,
                name: commit.author_name,
                handle: commit.author_name,
                accountType: ""
            },
            date: commit.created_at,
            title: commit.title,
            message: commit.message,
            repository_name: commit.web_url.split("/")[4],
            branch_name: branchName,
            hidden: false
        }

        if (this.hideInfo(commit.message)) {
            obj.sha = commitConfigs.hiddenCommit_sha,
            obj.title = commitConfigs.hiddenCommit_message,
            obj.message = commitConfigs.hiddenCommit_message,
            obj.repository_name = commitConfigs.hiddenCommit_repositoryName,
            obj.branch_name = commitConfigs.hiddenCommit_branchName,
            obj.hidden = true
        }

        return obj;
    }

    /**
    * GitLab doesn't return the author's avatar in the commit
    * response, so we need to call a different endpoint.
    * @param {string} email
    */
    private static async getAvatar(email: string): Promise<string> {
        let avatarUrl = "";
        await fetch(global_APIURLs.gitlab + "/avatar?email=" + email + "&size=128")
            .then(res => { if (res.status == 200) return res.json() })
            .then(data => avatarUrl = data.avatar_url)
            .catch(error => console.error("[gitlab] Error getting author avatar! " + error));
        return avatarUrl;
    }

    /**
    * Returns the branch of the commit.
    * @param {string} url The commit's full URL
    * @param {boolean} isPrivate - boolean
    */
    private static async getBranch(url: string, isPrivate: boolean): Promise<string> {
        let branch = "";

        if (isPrivate) {
            await fetch(url + "/refs?type=branch", {
                headers: this.headers_gitlabRequestAuth
            })
            .then(res => { if (res.status == 200) return res.json() })
            .then(data => branch = data[0].name)
            .catch(error => console.error("[gitlab] Error getting private branch! " + error));
        } else {
            await fetch(url + "/refs?type=branch", {
                headers: this.headers_gitlabRequestAuth
            })
            .then(res => { if (res.status == 200) return res.json() })
            .then(data => branch = data[0].name)
            .catch(error => console.error("[gitlab] Error getting public branch! " + error));
        }
        return branch;
    }

    /**
    * Returns all commits in the repository.
    * @param {string} url The repository's full URL
    */
    public static async getCommits(url: string): Promise<ICommitData[]> {
        let gitlabCommits: ICommitData[] = [];
        const repoNameId = url.slice(19).split("/").join("%2F");
        const urlL = global_APIURLs.gitlab + "projects/" + repoNameId + "/repository/commits?all=1";
        await fetch(urlL, {
            headers: this.headers_gitlabRequestAuth
        })
        .then(res => {
            if (res.status == 200) {
                console.log(res.status + " - [gitlab] successfully got commits.");
                return res.json();
            }
        })
        .then(async commits => {
            await Promise.all(commits.map(async (commit: any) => {
                let avatar = await this.getAvatar(commit.author_email);
                let branchName = await this.getBranch(urlL.slice(0, -6) + "/" + commit.id, true);
                let obj: ICommitData = this.makeCommitData(commit, avatar, branchName)

                gitlabCommits.push(obj);
            }));
        })
        .catch(error => console.error("[gitlab] error getting commits! " + error));

        return gitlabCommits;
    }

    /**
    * Returns a specific commit in the repository.
    * @param {string} url The repository's full URL
    * @param {string} sha - The commit's full SHA
    */
    public static async getCommit(url: string, sha: string): Promise<ICommitData> {
        let gitlabCommit!: ICommitData;
        const repoNameId = url.slice(19).split("/").join("%2F");
        const urlL = global_APIURLs.gitlab + "projects/" + repoNameId + "/repository/commits/" + sha;
        await fetch(urlL, {
            headers: this.headers_gitlabRequestAuth
        })
        .then(res => {
            if (res.status == 200) {
                console.log(res.status + " - Successfully got GitLab commit.");
                return res.json();
            }
        })
        .then(async commit => {
            let avatar = await this.getAvatar(commit.author_email);
            let branchName = await this.getBranch(urlL, true);
            let obj: ICommitData = this.makeCommitData(commit, avatar, branchName)

            gitlabCommit = obj;
        })
        .catch(error => console.error("Error getting Gitlab commit! " + error));

        return gitlabCommit;
    }
}
