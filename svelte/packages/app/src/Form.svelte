<div>
  <h1>A Form component</h1>
  <h2>Person</h2>
  <ul>
    <li>name: {p.name}</li>
    <li>age: {p.age}</li>
    <li>phone: {p.phone}</li>
  </ul>

  <h3>Sum</h3>
  <p>1 + 2 = {sum}</p>
</div>

<script lang="ts">
  import { Person } from "./types";
  import { add } from "./funcs";

  const p: Person = {
    name: "Alice",
    age: 18
  };

  const sum = add(1, 2);
</script>
