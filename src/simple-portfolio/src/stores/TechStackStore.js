import { writable } from "svelte/store";

const TechStackStore = writable([])

export function cleanTechStack () {
    TechStackStore.update(techStack => {
        return []
    })
}

export default TechStackStore
