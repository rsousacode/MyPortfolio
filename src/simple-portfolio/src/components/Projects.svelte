<script>
    import {fade} from 'svelte/transition'
    import {onMount, onDestroy} from 'svelte';
    import ProjectDetails from "./ProjectDetails.svelte";
    import TechStackStore, { cleanTechStack } from "../stores/TechStackStore";

    // Props Data
    export let projects

    // Aux data
    let currentSelProject
    let techStack
    let currentOpenEl;
    let flipping = new Flipping({
        easing: "cubic-bezier(.01, 0, .5, 1)"
    });
    let projectsElements = []

    function projectElementsCount() {
        return projectsElements.length
    }

    function mapButtons() {
        currentOpenEl = null
        let validElements = projectsElements.filter(el => el !== null).map(el => el);
        validElements.map(button => {
            if (currentOpenEl) return
            button.hasListener = true
            let parent = button.parentNode
            button.addEventListener(
                "click",
                flipping.wrap(() => {

                    if (parent.dataset.open) {
                        delete parent.dataset.open;
                        currentOpenEl = null;
                    } else {
                        parent.dataset.open = true;
                        if (currentOpenEl) {
                            delete currentOpenEl.dataset.open;
                        }
                        currentOpenEl = parent;
                    }
                }));
        });
    }

    TechStackStore.subscribe(data => {
        techStack = data
    })

    onMount(() => {
        mapButtons()
    })

    onDestroy (() => {
        projectsElements = []
    })


    function closeAllVisibilityExcept(name) {
        toggleProjectVisibility(name)
        let i;
        for (i = 0; i < projects.length; i++) {
            const project = projects[i]
            if (project.name !== name) {
                projects[i].toggled = false
            }
        }
    }


    function toggleProjectVisibility(name) {
        const index = projects.findIndex(p => p.name === name)
        const project = projects[index]
        project.toggled = !project.toggled
        if (project.toggled) {
            currentSelProject = project
            addTechToBuffer(project.tech)
        } else {
            currentSelProject = undefined
            cleanTechStack()
        }
    }

    function addTechToBuffer() {
        cleanTechStack()
        if (!currentSelProject) return
        let i;
        for (i = 0; i < currentSelProject.tech.length; i++) {
            const tech = currentSelProject.tech[i]
            TechStackStore.update(techStack => {
                return [tech, ...techStack]
            })
        }
    }


</script>

{#each projects as {name, description, id, github, website, toggled}, i}
    <div class="project-container" data-flip-key={id} data-flip-no-scale
         in:fade="{{x: -100, delay: 500 + 260 * (i + 1)}}">
        <h2 class="project-title mb-1" data-flip-no-scale bind:this={projectsElements[projectElementsCount()]}  on:click={closeAllVisibilityExcept(name)}
            transition:fade  >
            {name}</h2>
        <div class="details">
            {#if toggled}
                <ProjectDetails
                        description={description}
                        github={github}
                        website={website}/>
            {/if}
        </div> <!-- close class details -->
    </div> <!-- close project container -->
{/each}
