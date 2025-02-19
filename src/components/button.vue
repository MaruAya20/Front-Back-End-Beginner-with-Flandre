<script setup>
import { defineProps,defineEmits } from 'vue'

const props = defineProps(['text'])
const emit = defineEmits(['ok'])

function send()
{
    emit('ok','hello')
    //ok事件发生后,用参数激发
}

</script>
<template>

    <div @click="send" class="button">{{ props.text }}</div>

</template>


<style>
.button{
    user-select: none;
    cursor: pointer;
    margin: 30px auto;
    width: 98%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: #4d20a7;
    border-radius: 10px;
    box-shadow: 0 7px 8px rgba(0, 0, 0, 0.2);

}

</style>