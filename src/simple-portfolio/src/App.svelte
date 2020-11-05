<script>
    import {fly, fade} from 'svelte/transition'
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
        }, 800)
    }


    simulateLoading()

</script>
<main>
  <div class="row">
    <div class="col">
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
        </div> <!-- close author card-->
      </div> <!-- close flex item-->
    </div> <!-- close flex col-->
  </div> <!-- close flex container -->
  {#if pageLoaded}
    <div class="row mt-4" >
      <div class="col" transition:fly="{{ x: -200, duration: 300}}">
          <div class="projects-title" transition:fly>Projects</div>

          {#each projects as {name, description, id, github, website}}
            <div class="project-container" data-flip-key={id} data-flip-no-scale transition:fade="{{x: -100, delay: 500 + 260 * (id + 1)}}">
              <h2 class="project-title mb-1" data-flip-no-scale on:click={closeAllVisibilityExcept(name)}>
                {name}</h2>
              <div class="details">
                {#if getProjectVisibility(name)}
                  <div >
                    <p in:fly="{{ x: -100, duration: 700, delay: 500 }}" out:fade>{description}</p>
                    <div class="mt-1" in:fly="{{ y: -35, duration: 700, delay: 1500 }}" out:fade>
                      <a href="{github}"
                         target="_blank" class="link mr-2"><img alt="github" src="/icons/github-alt.svg"
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
            </div> <!-- close project-details -->
          {/each}
      </div>
    </div> <!-- close class flex row -->
  {/if}
</main>
