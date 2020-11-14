import { writable } from "svelte/store";

const AuthorStore = writable({
    author: 'Rui Sousa',
    position: "Software developer",
    twitter: 'https://twitter.com/rsousacode',
    github: 'https://github.com/rsousacode',
    linkedin: 'https://linkedin.com/in/rsousa'
})

export default AuthorStore
