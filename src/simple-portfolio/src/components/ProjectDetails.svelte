<script>
    import {fly, fade} from 'svelte/transition'
    export let description
    export let github
    export let website
</script>

<div>
    <p in:fly="{{ x: -100, duration: 700, delay: 500 }}" out:fade>{description}</p>
    <div class="mt-1" in:fly="{{ y: -35, duration: 700, delay: 1500 }}" out:fade>
        {#if github !== ''}
        <a href="{github}"
           target="_blank" class="link mr-2"><img alt="github"
                                                  src="/icons/github-alt.svg"
                                                  class="icon"/>
            <span class="link">GitHub</span>
        </a>
        {/if}
        {#if website !== ''}
            <a href="{website}"
               target="_blank" class="link"><img alt="website" src="/icons/web.svg"
                                                 class="icon"/>
                <span class="link">Website</span>
            </a>
        {/if}
    </div>
</div>
