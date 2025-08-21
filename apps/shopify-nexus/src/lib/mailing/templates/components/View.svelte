<script lang="ts">
    let { children } = $props();
</script>


<table style="width: 100%;  margin: 40px 0; color: #777;">
    <tbody>
    <tr>
        <td>
            <center>
                {@render children()}
            </center>
        </td>
    </tr>
    </tbody>
</table>
