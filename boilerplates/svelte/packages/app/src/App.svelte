<h1>Hello {name}!</h1>
<Form />

<style>
	h1 {
		color: purple;
	}
</style>

<script lang="ts">
	import Form from "./Form.svelte";

	export let name:string;
</script>
