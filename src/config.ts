// In order to be able to track private repositories.
// If you are not tracking any private repositories, leave it untouched.
export const apikeyGithub = process.env.APIKEY_GITHUB;
export const apikeyGitlab = process.env.APIKEY_GITLAB;

// Here you can customize the page to your liking.
// They should be pretty much self-explanatory.
export const globalConfigs = {
    name: "[INSERT TEXT HERE] Commits",
    nameColor: "#77777799",
    logo: "",
    dark_logo: "",
    light_logo: "",
    logoSquared: "",
    dark_logoSquared: "",
    light_logoSquared: "",
};

// All configuration related to commits.
// showObfuscatedCommits: whether you wanna obfuscate or hide a commit from the page
//                        false: the commit will not be shown on the page at all
//                        true: the commit will be shown (blurred with dummy values) [DEFAULT]
//
// prefix_hideCommit: Commits that have a message starting with one of the prefixes below
//                    will be hidden/obfuscated from view, you can change them to whatever
//                    you want them to be, but once you add you cannot remove, as it will
//                    retroactively show commits that had a certain removed prefix.
//                    PREFIXES ARE CASE SENSITIVE!
//
// "hiddenCommit_*": The default values that will appear behind the
//                   blur if you choose to hide/obfuscate a commit.
export const commitConfigs = {
    msg_botMadeCommit: "This commit was made by an automated [bot] account",
    showObfuscatedCommits: true,
    prefix_hideCommit: [
        "[obfuscate]",
        "[blur]",
        "[hidden]",
        "[hide]",
        "[hid]",
    ],
    hiddenCommit_sha: "bffty",
    hiddenCommit_repositoryName: "repository-name",
    hiddenCommit_branch: "branch",
    hiddenCommit_message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    hiddenCommit_link: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    hiddenCommit_date: "1970-01-01T00:00:00Z",
};

// Set all the repositories you wish to be tracked here, in that exact format.
export const global_Repositories = [
    {
        url: "https://github.com/jota11/testing-repository",
        provider: "github",
        private: false
    },
    {
        url: "https://github.com/jota11/testing-repository-2",
        provider: "github",
        private: true
    },
    {
        url: "https://gitlab.com/jota11/test-gitlab-repository",
        provider: "gitlab",
        private: false
    },
    {
        url: "https://gitlab.com/jota11/test-gitlab-repository-2",
        provider: "gitlab",
        private: true
    }
];

// I should probably move these elsewhere
export const global_APIURLs = {
    github: "https://api.github.com/repos/",
    gitlab: "https://gitlab.com/api/v4/",
}
export const revalidateTime = 300;
