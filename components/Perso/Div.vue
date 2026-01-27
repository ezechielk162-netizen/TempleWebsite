<template>
    <div :class="`m-${props.marginValue ?? 4}`">
    <slot/>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    marginValue:{
        type: Number
    }
})

</script>