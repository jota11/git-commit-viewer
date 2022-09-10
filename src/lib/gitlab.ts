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

     private static makeCommitData(commit: any, branchName: string): ICommitData {
        let obj: ICommitData;
        obj = {
            sha: commit.id,
            author: {
                avatar: avatar,
                name: commit.author_name,
                handle: commit.author_name
            },
            date: commit.created_at,
            title: commit.title,
            message: commit.message,
            repository_name: commit.web_url.split("/")[4],
            branch_name: branchName,
            hidden: false
        }

        if (this.hideInfo(data.commit.message)) {
            obj.sha = commitConfigs.hiddenCommit_sha,
            obj.title = commitConfigs.hiddenCommit_message,
            obj.message = commitConfigs.hiddenCommit_message,
            obj.repository_name = commitConfigs.hiddenCommit_repositoryName,
            obj.branch_name = commitConfigs.hiddenCommit_branchName,
            obj.hidden = true
        }

        return obj
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
            .catch(error => console.error("Avatar error! " + error));
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
            .catch(error => console.error("Error getting branch private! " + error));
        } else {
            await fetch(url + "/refs?type=branch", {
                headers: this.headers_gitlabRequest
            })
            .then(res => { if (res.status == 200) return res.json() })
            .then(data => branch = data[0].name)
            .catch(error => console.error("Error getting branch! " + error));
        }
        return branch;
    }

    /**
    * Returns all commits in the repository.
    * @param {string} url The repository's full URL
    * @param {boolean} isPrivate - boolean
    */
    public static async getCommits(url: string, isPrivate: boolean): Promise<ICommitData[]> {
        let gitlabCommits: ICommitData[] = [];
        const repoNameId = url.slice(19).split("/").join("%2F");
        const urlL = global_APIURLs.gitlab + "projects/" + repoNameId + "/repository/commits?all=1";
        await fetch(urlL, {
            headers: this.headers_gitlabRequestAuth
        })
        .then(res => { console.log(res.status); if (res.status == 200) return res.json() })
        .then(async commits => {
            await Promise.all(commits.map(async (commit: any) => {
                let avatar = await this.getAvatar(commit.author_email);
                let branchName = await this.getBranch(urlL.slice(0, -6) + "/" + commit.id, true);
                let obj: ICommitData = makeCommitData(commit, branchName)

                gitlabCommits.push(obj);
            }));
        })
        .catch(error => console.error("Error getting Gitlab commits! " + error));

        return gitlabCommits;
    }

    /**
    * Returns a specific commit in the repository.
    * @param {string} url The repository's full URL
    * @param {boolean} isPrivate - boolean
    * @param {string} sha - The commit's full SHA
    */
    public static async getCommit(url: string, isPrivate: boolean, sha: string): Promise<ICommitData> {
        let gitlabCommit!: ICommitData;
        const repoNameId = url.slice(19).split("/").join("%2F");
        const urlL = global_APIURLs.gitlab + "projects/" + repoNameId + "/repository/commits/" + sha;
        await fetch(urlL, {
            headers: this.headers_gitlabRequestAuth
        })
        .then(res => { if (res.status == 200) return res.json() })
        .then(async commit => {
            let avatar = await this.getAvatar(commit.author_email);
            let branchName = await this.getBranch(urlL, true);
            let obj: ICommitData = makeCommitData(commit, branchName)

            gitlabCommit = obj;
        })
        .catch(error => console.error("Error getting Gitlab commit! " + error));

        return gitlabCommit;
    }
}
