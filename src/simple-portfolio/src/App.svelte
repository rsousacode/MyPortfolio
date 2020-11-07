<script>
    import {fly, fade, crossfade} from 'svelte/transition'
    import {flip} from 'svelte/animate';
    import {quintOut} from 'svelte/easing';
    import { onMount, beforeUpdate, afterUpdate } from 'svelte';

    // animation

    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 200),

        fallback(node, params) {
            const style = getComputedStyle(node);

            return {
                duration: 600,
                easing: quintOut
            };
        }
    });

    let techStack = []
    let currentSelProject

    function add(element) {
        techStack = [element, ...techStack];
    }


    // props data
    export let author
    export let position
    export let projects
    export let twitter
    export let linkedin
    export let github

    let pageLoaded = false

    // functions
    function getProjectVisibility(name) {
        return shownProjects.filter(d => d.name === name)[0].visible
    }

    function toggleProjectVisibility(name) {

        const index = shownProjects.findIndex(p => p.name === name)
        const project = shownProjects[index]
        project.visible = !project.visible
        if (project.visible) {
            currentSelProject = project
            addTechToBuffer(project.tech)
        } else {
            currentSelProject = undefined
            techStack = []
        }
    }

    function addTechToBuffer(techArr) {
        techStack = []
        if (!currentSelProject) return
        let i;
        for (i = 0; i < currentSelProject.tech.length; i++) {
            add(currentSelProject.tech[i])
        }
    }

    function closeAllVisibilityExcept(name) {
        toggleProjectVisibility(name)
        let i;
        for (i = 0; i < shownProjects.length; i++) {
            const project = shownProjects[i]
            if (project.name !== name) {
                shownProjects[i].visible = false
            }
        }
    }

    let transitioning = false // We use this flag to refresh flipping when the dom is updated

    function simulateLoading(exec) {
        transitioning = true
        setTimeout(() => {
            exec()
            transitioning = false
        }, 800)
    }

    function onPageLoaded() {
        pageLoaded = true
    }

    let currentPage = 1
    let projectsPerPage = 3
    let shownProjects = []
    let hideProjects = false


    function initProjects() {
        let startIndex
        startIndex = currentPage * projectsPerPage - 3

        if (currentPage === 1) {
            startIndex = 0
        }

        let t = projectsPerPage * currentPage

        if (projects.length < t) {
            shownProjects = projects.slice(startIndex)
        } else {
            shownProjects = projects.slice(startIndex, projectsPerPage * currentPage)
        }

    }

    function getMaxNumPages() {
        if (projects.length % projectsPerPage > 0) {
            return Math.floor(projects.length / projectsPerPage) + 1
        }
        return projects.length / projectsPerPage

    }


    function onPageSwitched() {
        hideProjects = false
        initProjects()
    }


    function nextPage() {
        hideProjects = true
        currentPage++
        simulateLoading(onPageSwitched)

    }

    function previousPage() {
        hideProjects = true
        currentPage--
        simulateLoading(onPageSwitched)
    }

    initProjects()
    simulateLoading(onPageLoaded)

    let pointerDoms = []

    beforeUpdate(async () => {
        console.log(pointerDoms)

    });

    afterUpdate(async () => {
        console.log(pointerDoms)
    });



    onMount(async () => {
        console.log('on mount')
        const flipping = new Flipping({
            easing: "cubic-bezier(.01, 0, .5, 1)"
        });

        setTimeout(() => {
            let currentOpenEl;
            Array.from(document.querySelectorAll(".project-title"), button => {
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
        }, 850)


    });

</script>
<main>
    <div class="row">
        <div class="col-left">
            <div class="author-card">
                <div class="author" transition:fade>{author}</div>
                <div class="position">{position}</div>
                <a href="{github}" target="_blank" class="link ml-4">
                    <img alt="github" src="/icons/github-alt.svg" class="icon"/>
                </a>
                <a href="{linkedin}" target="_blank" class="link ml-4">
                    <img alt="linkedin" src="/icons/linkedin.svg" class="icon"/>
                </a>
                <a href="{twitter}" target="_blank" class="link ml-4"><img alt="twitter" src="/icons/twitter.svg"
                                                                           class="icon"/></a>
            </div> <!-- close author card-->
        </div> <!-- close flex col-->
    </div> <!-- close flex container -->
    {#if pageLoaded}
        <div class="row mt-4">
            <div class="col-left pr-1 mb-2" transition:fly="{{ x: -200, duration: 300}}">
                <div class="projects-title" transition:fly>Projects</div>
                {#if !hideProjects}
                    {#each shownProjects as {name, description, id, github, website}, i}
                        <div class="project-container" data-flip-key={id} data-flip-no-scale
                             in:fade="{{x: -100, delay: 500 + 260 * (i + 1)}}">
                            <h2 class="project-title mb-1" data-flip-no-scale  on:click={closeAllVisibilityExcept(name)}
                                transition:fade  >
                                {name}</h2>
                            <div class="details">
                                {#if getProjectVisibility(name)}
                                    <div>
                                        <p in:fly="{{ x: -100, duration: 700, delay: 500 }}" out:fade>{description}</p>
                                        <div class="mt-1" in:fly="{{ y: -35, duration: 700, delay: 1500 }}" out:fade>
                                            <a href="{github}"
                                               target="_blank" class="link mr-2"><img alt="github"
                                                                                      src="/icons/github-alt.svg"
                                                                                      class="icon"/>
                                                <span class="link">GitHub</span>
                                            </a>
                                            {#if website !== ''}
                                                <a href="{website}"
                                                   target="_blank" class="link"><img alt="website" src="/icons/web.svg"
                                                                                     class="icon"/>
                                                    <span class="link">Website</span>
                                                </a>
                                            {/if}
                                        </div>
                                    </div>
                                {/if}
                            </div> <!-- close class details -->
                        </div> <!-- close project container -->
                    {/each}
                {/if}
            </div> <!-- close col -->
            <div class="col">
                <p> {currentPage} - {getMaxNumPages()}</p>
                {#if currentPage > 1}
                    <button on:click={previousPage}>Previous Page</button>
                {/if}
                {#if getMaxNumPages() != currentPage}
                    <button on:click={nextPage}>Next Page</button>
                {/if}
            </div>
            {#if currentSelProject}
                <div class="col-right" in:fly="{{ x: 300, duration: 1000, delay: 2500 }}"
                     out:fly="{{ x: 300, duration: 1000, delay: 600 }}">

                    <div class="projects-title mb-2">Project tech</div>
                    <div class="board">
                        {#each techStack as tech(tech)}
                            <div class="card"
                                 animate:flip>
                                {tech}
                            </div>
                        {/each}
                    </div>
                </div>
            {/if}
        </div> <!-- close row -->
    {/if}
</main>

<style>
    .board {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 1em;
        max-width: 36em;
        margin: 0rem auto;
    }

</style>
