<template>
    <form class="create-twoot-panel" @submit.prevent="createNewTwoot" :class="{ '--exceeded': newTwootCharacterCount > 180 }">
        <label for="newTwoot"><strong>New Twoot</strong> ({{ newTwootCharacterCount }}/180)</label>
        <textarea id="newTwoot" rows="4" v-model="state.newTwootContent"/>

        <div class="create-twoot-panel__submit">
            <div class="create-twoot-type">
                <label for="newTwootType"><strong>Type: </strong></label>
                <select id="newTwootType" v-model="state.selectedTwootType">
                    <option :value="option.value" v-for="(option, index) in state.twootTypes" :key="index">
                        {{ option.name }}
                    </option>
                </select>
            </div>

            <button>
                Twoot It!
            </button>
        </div>
    </form>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
    name: "CreateTwootPanel",
    setup(props, ctx) { // ctx is context of component, remove need for $ on emit
        // local state but sometimes we wanna use global states
        const state = reactive({
            newTwootContent: '',
            selectedTwootType: 'instant',
            twootTypes: [
                { value: 'draft', name: 'Draft' },
                { value: 'instant', name: 'Instant Twoot' }
            ],
        })

        const newTwootCharacterCount = computed(() => state.newTwootContent.length)

        function createNewTwoot() {
            if (state.newTwootContent && state.selectedTwootType !== 'draft') {
                ctx.emit('add-twoot', state.newTwootContent)
                state.newTwootContent = '';
            }
        }

        return { // return to template to use
            state,
            newTwootCharacterCount,
            createNewTwoot
        }
    }
    // data() {
    //     return {
    //         newTwootContent: '',
    //         selectedTwootType: 'instant',
    //         twootTypes: [
    //             { value: 'draft', name: 'Draft' },
    //             { value: 'instant', name: 'Instant Twoot' }
    //         ],
    //     }
    // },
    // computed: {
    //     newTwootCharacterCount() {
    //         return this.newTwootContent.length;
    //     }
    // },
    // methods: {
    //     createNewTwoot() {
    //         if (this.newTwootContent && this.selectedTwootType !== 'draft') {
    //             this.$emit('add-twoot', this.newTwootContent)
    //             this.newTwootContent = '';
    //         }
    //     }
    // }
};
</script>

<style lang="scss" scoped>
.create-twoot-panel {
    margin-top: 20px;
    padding: 20px 0;
    display: flex;
    flex-direction: column;

    textarea {
        border: 1px solid #DFE3E8;
        border-radius: 5px;
    }

    .create-twoot-panel__submit {
        display: flex;
        justify-content: space-between;

        .create-twoot-type {
            padding: 10px 0;
        }

        button {
            padding: 5px 20px;
            margin: auto 0;
            border-radius: 5px;
            border: none;
            background-color: rebeccapurple;
            color: white;
            font-weight: bold;
        }
    }

    &.--exceeeded {
        color: red;
        border-color: red;

        .create-twoot-panel__submit {
            button {
                background-color: red;
                color: white;
            }
        }
    }
}
</style>