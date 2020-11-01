<script>
  import { fade, blur, fly } from 'svelte/transition'
  import TypeWriter from 'svelte-typewriter'
  // props data
  export let author
  export let position
  export let projects

  // functions
  function getProjectVisibility (name) {
    return projects.filter(d => d.name === name)[0].visible
  }

  function toggleProjectVisibility (name) {
    const index = projects.findIndex(p => p.name === name)
    projects[index].visible = !projects[index].visible
  }

  function closeAllVisibilityExcept (name) {
    toggleProjectVisibility(name)
    console.log("ok")

    var i;
    for (i = 0; i < projects.length; i++) {
      console.log('run')
      var project = projects[i]
      if(project.name !== name) {
        projects[i].visible = false

      }
    } 
  }
  
</script>

<main>
  
  <h1><span>{author}</span></h1>
  <h3>{position}</h3> 
  <div>
    <h5 >Projects</h5>
      <div class="flex-container">
        <div>
          {#each projects as {name, description, id}}
          <div class="translate">
            <h2 class="pointer"
              on:click={closeAllVisibilityExcept(name)}>
              {name}</h2></div>
            {#if getProjectVisibility(name)}
            <TypeWriter interval={8}>
              <p transition:fly>{description} </p>
            </TypeWriter>
            {/if}
          {/each}
      </div>
    </div>
  </div>
</main>

<style>

	main {
		padding: 1em;
		max-width: 240px;
    margin: 0 auto;
	}

	h1 {
		color: #c1ffb5;
		text-transform: uppercase;
		font-size: 2.5em;
		font-weight: 100;
	}

  .translate h2{
	-webkit-transition:all 0.6s ease-in 0.1s;
	-moz-transition: all 0.6s ease-in 0.1s;
	-o-transition: all 0.6s ease-in 0.1s;
	transition: all 0.6s ease-in 0.1s;
}
.translate:hover h2{
	-webkit-transform: translate(1.3rem);
	-moz-transform: translate(1.3rem);
	-ms-transform: translate(1.3rem);
	-o-transform: translate(1.3rem);
	transform: translate(1.3rem);
}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>