<script>
import TextCaption from "$lib/mailing/templates/components/TextCaption.svelte";

let {orderId, label} = $props();
</script>

<table
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        style=" width: 100%; max-width: 600px; margin-bottom: 40px;"
>
    <tbody>
    <tr>
        <td>
            <a href="https://theknottyones.com" target="_blank">
                <img
                        style="width: 240px;"
                        src="https://cdn.shopify.com/s/files/1/1243/8188/files/tko-logo-png_800x800_90dc571a-fa57-4f07-a98a-4b2a6276587b.png?v=1678286452"
                        alt="The Knotty Ones Logo"
                />
            </a>
        </td>
        <td style="text-align: right; color: #999;"
        >{#if orderId}<TextCaption>{label} #{orderId}</TextCaption>{/if}</td
        >
    </tr>
    </tbody>
</table>