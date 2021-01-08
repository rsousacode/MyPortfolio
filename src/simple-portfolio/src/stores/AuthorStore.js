import { writable } from "svelte/store";

const AuthorStore = writable({
    name: 'Rui Sousa',
    position: "Software Developer",
    twitter: 'https://twitter.com/rsousacode',
    github: 'https://github.com/rsousacode',
    linkedin: 'https://linkedin.com/in/rsousa'
})

export default AuthorStore
