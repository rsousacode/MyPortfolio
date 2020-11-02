<script>
  import { fade } from 'svelte/transition'
  import TypeWriter from 'svelte-typewriter'
  // props data
  export let author
  export let position
  export let projects
  let termText = '> Welcome to my full stack portfolio!'
  let allProjectsClosed = true

  // functions
  function getProjectVisibility (name) {
    return projects.filter(d => d.name === name)[0].visible
  }

  function toggleProjectVisibility (name) {
    const index = projects.findIndex(p => p.name === name)
    projects[index].visible = !projects[index].visible
    if(projects[index].visible) {
      // termText = `Project tech: ${projects[index].tech}`
      allProjectsClosed = false
    } else {
      allProjectsClosed = true;
    }
  }

  function closeAllVisibilityExcept (name) {
    allProjectsClosed = true;
    toggleProjectVisibility(name)  

    var i;
    for (i = 0; i < projects.length; i++) {
      var project = projects[i]
      if(project.name !== name) {
        projects[i].visible = false

      }
    } 
  }
let show = true
  function testTimer () {
    setTimeout(() => {
      show = true
      termText = 'another text'
    }, 4000)
    setTimeout(() => {
          show = false
    }, 2000)
    setTimeout(() => {
          show = true
    }, 3500)
  }
  testTimer()
  
</script>

<main>
  <div class="container">
  <h1>{author}</h1>
  <p>{position}</p> 
    <h5 >Projects</h5>
      <div class="flex-container">
        <div class="flex-item">
          {#each projects as {name, description, id}}
          <div class="stuff" data-flip-key={id} data-flip-no-scale>
            <h2 class="pointer" data-flip-no-scale on:click={closeAllVisibilityExcept(name)}>
              {name}</h2>
              <div class="details">
                {#if getProjectVisibility(name)}
                <TypeWriter interval={8}>
                  <p transition:fade>{description}</p>
                </TypeWriter>
                {/if}
              </div> <!-- close class details -->
            </div> <!-- close class stuff -->
          {/each}
      </div> <!-- close class flex item -->
    </div> <!-- close class flex container -->
  </div> <!-- close class container -->
    <footer>
      {#if show}
      <TypeWriter>
      <p> {termText} </p>
    </TypeWriter>
    {/if}
    </footer>

</main>

<style>

</style>