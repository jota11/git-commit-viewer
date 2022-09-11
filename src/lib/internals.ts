import { global_Repositories } from "config";
import { Github } from "@lib/github";
import { Gitlab } from "@lib/gitlab";
import { ICommitData, IConfigRepo } from "types";

// This class contains all the calls available to be used globally.
export class GlobalCalls {
    private static repositories = global_Repositories.map((repo) => {
        return repo;
    });

    private static sortArrayChronologically = (arr: ICommitData[]) => arr.sort((a, b) => {
        //@ts-ignore
        return new Date(b.date) - new Date(a.date);
    });

    /**
    * Returns all commits from the repositories specified in the config file.
    * @returns {ICommitData[]} Array of commits
    */
    public static async getCommits(): Promise<ICommitData[]> {
        let commitsArray: ICommitData[] = [];
        for (let i = 0; i < this.repositories.length; i++) {
            switch (this.repositories[i].provider) {
                case "github":
                    commitsArray.push(...await Github.getCommits(this.repositories[i].url, this.repositories[i].private));
                    break;
                case "gitlab":
                    commitsArray.push(...await Gitlab.getCommits(this.repositories[i].url, this.repositories[i].private));
                    break;
                default:
                    console.log("Provider not supported.");
                    break;
            }
        }
        return this.sortArrayChronologically(commitsArray);
    }
    
    /**
    * Returns all commits from a specific repository specified in the config file.
    * @param {string} slug - The repository's URL slug
    * @returns {ICommitData[]} array of commits
    */
    public static async getCommitsFromSpecificRepo(slug: string): Promise<ICommitData[]> {
        let commitsArray: ICommitData[] = [];
        let repository!: IConfigRepo;
        let doesThisRepoActuallyExists = false;
        for (let i = 0; i < this.repositories.length; i++) {
            if (slug == this.repositories[i].url.split("/")[4]) {
                repository = this.repositories[i];
                doesThisRepoActuallyExists = true;
            }
        }

        if (doesThisRepoActuallyExists) {
            switch (repository.provider) {
                case "github":
                    commitsArray.push(...await Github.getCommits(repository.url, repository.private));
                    break;
                case "gitlab":
                    commitsArray.push(...await Gitlab.getCommits(repository.url, repository.private));
                    break;
                default:
                    console.log("Provider not supported.");
                    break;
            }
        }
        return this.sortArrayChronologically(commitsArray);
    }

    /**
    * Returns a specific commit.
    * @param {string} repo The repository's full URL
    * @param {string} sha The commit's full SHA
    * @returns {ICommitData} commit
    */
    public static async getCommit(repo: string, sha: string): Promise<ICommitData> {
        let commitInfo!: ICommitData;

        let repository!: IConfigRepo;
        let doesThisRepoActuallyExists = false;
        for (let i = 0; i < this.repositories.length; i++) {
            if (repo == this.repositories[i].url.split("/")[4] && sha.length == 40) {
                repository = this.repositories[i];
                doesThisRepoActuallyExists = true;
            }
        }

        if (doesThisRepoActuallyExists) {
            switch (repository.provider) {
                case "github":
                    commitInfo = await Github.getCommit(repository.url, repository.private, sha);
                    break;
                case "gitlab":
                    commitInfo = await Gitlab.getCommit(repository.url, repository.private, sha);
                    break;
                default:
                    console.log("Provider not supported.");
                    break;
            }
        }
        return commitInfo;
    }

    /**
    * TODO: Is this really the better way?
    *
    * Checks if the commit was made by an automated [bot] account.
    * @param {string} handle
    * @returns boolean
    */
    public static isUserBot(handle: string): boolean {
        if (handle.endsWith("[bot]")) {
            return true;
        } else {
            return false;
        }
    }
}


