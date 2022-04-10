<script>
    import AuthorCard from "./AuthorCard.svelte";
    export let author;
</script>
<div class="row">
    <div class="col-left">
        <AuthorCard author={author}/>
    </div>
</div>
