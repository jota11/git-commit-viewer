import { global_APIURLs, commitConfigs } from "config";
import { ICommitData } from "types";

export class Github {
    // Remove?
    // private static headers_githubRequest = [
    //     ["Accept", "application/vnd.github+json"],
    // ];

    private static headers_githubRequestAuth = [
        ["Accept", "application/vnd.github+json"],
        ["Authorization", `token ${process.env.APIKEY_GITHUB}`]
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

    public static async getBranches(url: string) {
        const urlL = url.slice(19);
        let branches: IBranch[] = [];
        await fetch(global_APIURLs.github + urlL + "/branches", {
            headers: new Headers(this.headers_githubRequestAuth)
        })
        .then(res => { if (res.status == 200) return res.json() })
        .then(async data => {
            await Promise.all(data.map(async (data: any) => {
                let branch: IBranch = {};
                branch.name = data.name;
                branch.sha = data.commit.sha;
                branch.commits = [];
                await this.traverseCommitTree(urlL, data.commit.sha, branch.commits, 0, data.commit.sha);
                branches.push(branch);
            }))
        })
        .catch(err => console.log("Error getting branches. " + err));


        // branches.forEach(branch => {
        //     branch.commits.forEach(sha => {
        //         branches.forEach(otherBranch => {
        //             if(branch != otherBranch) {
        //                 if(otherBranch.commits.indexOf(sha) != -1) {
        //                     otherBranch.commits.splice(otherBranch.commits.indexOf(sha), 1)
        //                 }                        
        //             }
        //         })
        //     })
        // })

        return branches;
    }

    private static determineBranch(sha: string, branches: string[]): string {
        var returnValue = "";
        branches.forEach(branch => {
            for(var x=0; x<branch.commits.length;x++) {
                if(branch.commits[x] == sha) {
                    returnValue += branch.name; 
                }
            }
        });

        // currently, branches are not guaranteed to be correct.
        // they need to be processed in order.
        return returnValue
    }


    public static async traverseCommitTree(urlL:string, name:string, accumulator: string[], page: int, branchSHA: string ): Promise<string[]> {
        await fetch(global_APIURLs.github + urlL + "/commits?per_page=100&page=" + page + "&sha=" + name, {
            headers: new Headers(this.headers_githubRequestAuth)
        })
        .then(res => { if (res.status == 200) return res.json() })
        .then(async data => {  
            data.map((data: any) => {
                accumulator.push(data.sha);
            });

            // putting a cap on how many commits we should really process
            // if(data.length == 100 && page < 4) {
            //     await this.traverseCommitTree(urlL, name, accumulator, ++page);
            // }
        })

        return accumulator;
    }   

    private static makeCommitData(data: any, branches: string[]): ICommitData {
        let obj: ICommitData;
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
            branch: this.determineBranch(data.sha, branches),
            repository_name: data.html_url.split("/")[4],
            hidden: false
        }

        if (this.hideInfo(data.commit.message)) {
            obj.sha = commitConfigs.hiddenCommit_sha;
            obj.title = commitConfigs.hiddenCommit_message;
            obj.message = commitCOnfigs.hiddenCommit_message;
            obj.repository_name = commitCOnfigs.hiddenCommit_repositoryName;
            obj.hidden = true;
        }

        return obj
    }

    public static async Github_getCommits(url: string, isPrivate: boolean): Promise<ICommitData[]> {
        const branchesOnRepo = await this.getBranches(url);
        let githubCommits: ICommitData[] = [];
        const urlL = url.slice(19);
        await fetch(global_APIURLs.github + urlL + "/commits", {
            headers: new Headers(this.headers_githubRequestAuth)
        })
        .then(res => { if (res.status == 200) return res.json() })
        .then(commits => {
            commits.map((commits: any) => {
                let obj = this.makeCommitData(commits, branchesOnRepo);
                githubCommits.push(obj);
            });
        }).catch(error => console.error("Error getting Github commits! " + error));
        return githubCommits;
    }

    public static async Github_getCommit(url: string, isPrivate: boolean, sha: string): Promise<ICommitData> {
        const branchesOnRepo = await this.getBranches(url);
        let githubCommit!: ICommitData;
        const urlL = url.slice(19);
        await fetch(global_APIURLs.github + urlL + "/commits/" + sha, {
            headers: new Headers(this.headers_githubRequestAuth)
        })
        .then(res => { if (res.status == 200) return res.json() })
        .then(commit => {
            githubCommit = this.makeCommitData(commit, branchesOnRepo);
        }).catch(error => console.error("Error getting Github commit! " + error));

        return githubCommit;
    }
}
