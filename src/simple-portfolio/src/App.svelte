<script>
  import { fade } from 'svelte/transition'
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
</script>

<main>
  
  <h1><span>{author}</span></h1>
  <h3>{position}</h3> 
  <div>
    <h5>Projects</h5>
    {#each projects as {name, description}}
      <h2 on:click={toggleProjectVisibility(name)}>{name}</h2>
      {#if getProjectVisibility(name)}
        <p transition:fade>{description}</p>
      {/if}
    {/each}
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

	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>