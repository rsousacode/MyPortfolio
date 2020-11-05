<script>
    import {fly, fade, crossfade} from 'svelte/transition'
    import {flip} from 'svelte/animate';
    import {quintOut} from 'svelte/easing';

    // animation

    const [send, receive] = crossfade({
        duration: d => Math.sqrt(d * 200),

        fallback(node, params) {
            const style = getComputedStyle(node);
            const transform = style.transform === 'none' ? '' : style.transform;

            return {
                duration: 600,
                easing: quintOut,
                css: t => `
					transform: ${transform} scale(${t});
					opacity: ${t}
				`
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
        return projects.filter(d => d.name === name)[0].visible
    }

    let id = 0

    function toggleProjectVisibility(name) {

        const index = projects.findIndex(p => p.name === name)
        const project = projects[index]
        project.visible = !project.visible
        if (project.visible) {
            currentSelProject = project
            addTechToBuffer(project.tech)
        } else {
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
        for (i = 0; i < projects.length; i++) {
            const project = projects[i]
            if (project.name !== name) {
                projects[i].visible = false
            }
        }
    }

    function simulateLoading() {
        setTimeout(() => {
            pageLoaded = true
        }, 800)
    }


    simulateLoading()

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
            <div class="col-left" transition:fly="{{ x: -200, duration: 300}}">
                <div class="projects-title" transition:fly>Projects</div>

                {#each projects as {name, description, id, github, website}}
                    <div class="project-container" data-flip-key={id} data-flip-no-scale
                         transition:fade="{{x: -100, delay: 500 + 260 * (id + 1)}}">
                        <h2 class="project-title mb-1" data-flip-no-scale on:click={closeAllVisibilityExcept(name)}>
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
            </div> <!-- close col -->
            <div class="col-right">
                <div class="board">
                    {#each techStack as tech(tech)}

                        <div class="card"
                             in:receive="{{key: tech}}"
                             out:send="{{key: tech}}"
                             animate:flip>
                            {tech}
                        </div>
                    {/each}
                </div>
            </div>

        </div> <!-- close row -->
    {/if}
</main>

<style>
    .board {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        grid-gap: 1em;
        max-width: 36em;
        margin: 3rem auto;
    }

    label {
        position: relative;
        line-height: 1.2;
        padding: 0.5em 2.5em 0.5em 2em;
        margin: 0 0 0.5em 0;
        border-radius: 2px;
        user-select: none;
        border: 1px solid hsl(240, 8%, 70%);
        background-color: hsl(240, 8%, 93%);
        color: #333;
    }
</style>
