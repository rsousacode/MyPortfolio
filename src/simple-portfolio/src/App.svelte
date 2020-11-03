<script>
  import { fly, fade } from 'svelte/transition'
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
  let termText = termPrompt + 'Loading...'
  let pageLoaded = false
  let timeouts = []

  // functions
  function getProjectVisibility (name) {
    return projects.filter(d => d.name === name)[0].visible
  }

  function toggleProjectVisibility (name) {

    const index = projects.findIndex(p => p.name === name)
    projects[index].visible = !projects[index].visible
    if(projects[index].visible) {
      clearTimeouts()
      typeWriteAfter(2500, `Stack: ${projects[index].tech}`)
    }  else {
      clearTimeouts()
      typeWriteAfter(30, defaultTermText)
    }

  }


  function closeAllVisibilityExcept (name) {
    toggleProjectVisibility(name)  

    var i;
    for (i = 0; i < projects.length; i++) {
      var project = projects[i]
      if(project.name !== name) {
        projects[i].visible = false
      }
    } 
  }

  function clearTimeouts () {
    var i
    for (i = 0; i < timeouts.length; i++) {
      clearTimeout(timeouts[i])
    }
  }

  let defaultTermText = '...'

  function simulateLoading () {
    setTimeout(() => {
      pageLoaded = true
      
      typeWriteAfter(1000, 'Welcome to my portfolio! :) ')
    }, 1500)
  }

  function typeWriteAfter(delay, text) {
    timeouts.push(setTimeout (() => {
      typeWriting = true
      termText = termPrompt + text
    }, delay))
  }

  // term
  let typeWriting = true

  function OnTypeWritingFinished () {
    setTimeout(() => {
      typeWriting = false
    }, 1000)

  }

  simulateLoading()
  
</script>
<main>
      <div class="flex-container-header">
        <div class="flex-item">
    <div class="author-card">
      <div class="author" transition:fade>{author}</div>
      
      <div class="position">{position}</div>
      <a href="{github}" target="_blank" class="link ml-5">
        <img alt="github" src="/icons/github-alt.svg" class="icon"/>
      </a>
      <a href="{linkedin}" target="_blank" class="link ml-5">
        <img alt="linkedin" src="/icons/linkedin.svg" class="icon"/>
      </a>
      <a href="{twitter}" target="_blank" class="link ml-5"><img alt="twitter" src="/icons/twitter.svg" class="icon"/></a>

    </div>
    </div> <!-- close flex item-->
    </div>
      {#if pageLoaded}
      <div class="projects-title"  transition:fade>Projects</div>
        <div class="flex-container-header"  transition:fade>
          <div class="flex-item">
            {#each projects as {name, description, id, github}}
            <div class="stuff" data-flip-key={id} data-flip-no-scale>
              <h2 class="pointer" data-flip-no-scale on:click={closeAllVisibilityExcept(name)}>
                {name}</h2>
                <div class="details">
                  {#if getProjectVisibility(name)}
                  <div  transition:fly="{{ x: -100, duration: 700, delay: 500 }}">
                    <p>{description}</p>
                    <a transition:fly="{{ y: 200, duration: 700, delay: 1500 }}" href="{github}" target="_blank" class="link"><img alt="github" src="/icons/github-alt.svg" class="icon"/>
                      <span class="link">GitHub</span>
                    </a>
                  </div>
                  {/if}
                </div> <!-- close class details -->
              </div> <!-- close class stuff -->
            {/each}
        </div> <!-- close class flex item -->
      </div> <!-- close class flex container -->
      {/if}
    <footer>
      {#if typeWriting}
      <TypeWriter cursor=true on:done={() => OnTypeWritingFinished()}>
      <div class="term"> 
        <div class="term-text">{termText} </div>
      </div>
      </TypeWriter>
      {:else}
      <div class="term"> 
        <div class="term-text">{termText} </div>
      </div>
      {/if}
    </footer>

</main>
<style>

</style>