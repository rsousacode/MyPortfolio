<script>
    import {fly, fade} from 'svelte/transition'
    import TypeWriter from 'svelte-typewriter'

    const props = {
        author: 'Rui Sousa',
        position: "Software developer",
        twitter: 'https://twitter.com/rsousacode',
        github: 'https://github.com/rsousacode',
        linkedin: 'https://linkedin.com/in/rsousa',
        uid: 0,
        projects: [
            {
                id: 0,
                name: 'Commands and Snippets',
                description: 'Web app that allows storing useful snippets and commands. It has a branch with authentication provided. ',
                github: 'https://github.com/rsousacode/CommandsAndSnippets',
                website: '',
                toggled: false,
                tech: '.Net Core Mvc 3.x, T-SQL, Angular, Vue.Js, Quasar'
            },
            {
                id: 1,
                name: 'Winter Come',
                description: 'Backend, for the Winter Come game. The player can do Qr login from the companion app to be able to sign in in the game. ',
                github: 'https://github.com/rsousacode/WinterComeBackend',
                toggled: false,
                website: 'https://bigmonte.com/projects/wintercome/',
                tech: 'Node.JS, Express, Mongoose, MongoDB, C# (Client)'
            },
            {
                id: 2,
                name: 'Puryon',
                description: 'Frontend and Backend, for the Puryon FPS multiplayer game made in UE4, which presents real-time statistics and data about the game being played.',
                github: 'https://github.com/rsousacode/puryon_backend',
                toggled: false,
                website: 'https://bigmonte.com/projects/puryon/',
                tech: 'Node.JS, Express, Mongoose, MongoDB, React.Js, C++ (Client)'

            },
            {
                id: 3,
                name: 'Lusoportunas',
                description: 'Streamlines the job finding process '
                    + 'and has a comprehensive dashboard for recruiters and job seekers with a communication'
                    + 'platform that allows both to connect easily.',
                github: 'https://github.com/rsousacode/Lusoportunas',
                toggled: false,
                website: '',
                tech: 'Node.JS, Express, Mongoose, MongoDB, Pug, Passport'

            },

        ]
    }

    // auxiliar
    let termPrompt = '> '
    let pageLoaded = false
    let timeouts = []

    // functions
    function getProjectVisibility(name) {
        return props.projects.filter(d => d.name === name)[0].visible
    }

    function toggleProjectVisibility(name) {

        const index = props.projects.findIndex(p => p.name === name)
        props.projects[index].visible = !props.projects[index].visible

    }

    function closeAllVisibilityExcept(name) {
        toggleProjectVisibility(name)

        let i;
        for (i = 0; i < props.projects.length; i++) {
            const project = props.projects[i]
            if (project.name !== name) {
                props.projects[i].visible = false
            }
        }
    }

    function simulateLoading() {
        setTimeout(() => {
            pageLoaded = true
        }, 800)
    }


    simulateLoading()

    $: {

        const flipping = new Flipping({
            easing: "cubic-bezier(.01, 0, .5, 1)"
        });

        setTimeout(() => {
            let currentOpenEl;
            Array.from(document.querySelectorAll(".pointer"), button => {
                let parent = button.parentNode
                console.log(parent)
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

    }
</script>
<main>
    <div class="flex-container mt-3">
        <div class="flex-item">
            <div class="author-card">
                <div class="author" transition:fade>{props.author}</div>
                <div class="position">{props.position}</div>
                <a href="{props.github}" target="_blank" class="link ml-4">
                    <img alt="github" src="/icons/github-alt.svg" class="icon"/>
                </a>
                <a href="{props.linkedin}" target="_blank" class="link ml-4">
                    <img alt="linkedin" src="/icons/linkedin.svg" class="icon"/>
                </a>
                <a href="{props.twitter}" target="_blank" class="link ml-4"><img alt="twitter" src="/icons/twitter.svg"
                                                                                 class="icon"/></a>
            </div>
        </div> <!-- close flex item-->
    </div> <!-- close flex container -->
    {#if pageLoaded}
        <div class="flex-container mt-4" transition:fly="{{ x: -200, duration: 300}}">
            <div class="flex-item">
                <div class="projects-title" transition:fly>Projects</div>

                {#each props.projects as {name, description, id, github, website}}
                    <div class="stuff" data-flip-key={id} data-flip-no-scale
                         transition:fade="{{x: -100, delay: 500 + 260 * (id + 1)}}">
                        <h2 class="pointer" data-flip-no-scale on:click={closeAllVisibilityExcept(name)}>
                            {name}</h2>
                        <div class="details">
                            {#if getProjectVisibility(name)}
                                <div>
                                    <p in:fly="{{ x: -100, duration: 700, delay: 500 }}" out:fade>{description}</p>
                                    <div in:fly="{{ y: -35, duration: 700, delay: 1500 }}" out:fade>
                                        <a href="{github}"
                                           target="_blank" class="link"><img alt="github" src="/icons/github-alt.svg"
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
                    </div> <!-- close class stuff -->
                {/each}
            </div> <!-- close class flex item -->
        </div> <!-- close class flex container -->
    {/if}
</main>
