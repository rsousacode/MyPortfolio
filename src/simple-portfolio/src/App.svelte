<script>
    import {fly, fade} from 'svelte/transition'
    import TypeWriter from 'svelte-typewriter'
    // props data
    export let author
    export let position
    export let projects
    export let twitter
    export let linkedin
    export let github

    // auxiliar
    let termPrompt = '> '
    let pageLoaded = false
    let timeouts = []

    // functions
    function getProjectVisibility(name) {
        return projects.filter(d => d.name === name)[0].visible
    }

    function toggleProjectVisibility(name) {

        const index = projects.findIndex(p => p.name === name)
        projects[index].visible = !projects[index].visible

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
        }, 1500)
    }


    simulateLoading()

</script>
<main>
  <div class="flex-container">
    <div class="flex-item">
      <div class="author-card">
        <div class="author" transition:fade>{author}</div>
        <div class="position">{position}</div>
        <a href="{github}" target="_blank" class="link ml-4">
          <img alt="github" src="/icons/github-alt.svg" class="icon"/>
        </a>
        <a href="{linkedin}" target="_blank" class="link ml-4">
          <img alt="linkedin" src="/icons/linkedin.svg" class="icon"/>
        </a>
        <a href="{twitter}" target="_blank" class="link ml-4"><img alt="twitter" src="/icons/twitter.svg" class="icon"/></a>
      </div>
    </div> <!-- close flex item-->
  </div> <!-- close flex container -->
  {#if pageLoaded}
    <div class="flex-container" transition:fade>
      <div class="flex-item">
        <div class="projects-title" transition:fade>Projects</div>

        {#each projects as {name, description, id, github, website}}
          <div class="stuff" data-flip-key={id} data-flip-no-scale>
            <h2 class="pointer" data-flip-no-scale on:click={closeAllVisibilityExcept(name)}>
              {name}</h2>
            <div class="details">
              {#if getProjectVisibility(name)}
                <div transition:fly="{{ x: -100, duration: 700, delay: 500 }}">
                  <p>{description}</p>
                  <a transition:fly="{{ y: 200, duration: 700, delay: 1500 }}" href="{github}"
                     target="_blank" class="link"><img alt="github" src="/icons/github-alt.svg"
                                                       class="icon"/>
                    <span class="link">GitHub</span>
                  </a>
                  {#if website !== ''}
                    <a transition:fly="{{ y: 200, duration: 700, delay: 2500 }}" href="{website}"
                       target="_blank" class="link"><img alt="website" src="/icons/web.svg"
                                                         class="icon"/>
                      <span class="link">Website</span>
                    </a>
                  {/if}
                </div>
              {/if}
            </div> <!-- close class details -->
          </div> <!-- close class stuff -->
        {/each}
      </div> <!-- close class flex item -->
    </div> <!-- close class flex container -->
  {/if}
</main>
