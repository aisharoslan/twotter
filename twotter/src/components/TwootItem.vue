<template>
    <div class="twoot-item"> <!-- @click="favouriteTwoot(twoot.id) -->
        <div class="user-profile__twoot">
            <div class="twoot-item__user">
                @ {{ username }}
            </div>
            <div class="twoot-item__content">
                {{ twoot.content }}
            </div>
        </div>
    </div>
</template>

<script>
export default { // no vue composition api cause no data, computed, method
    name: "TwootItem",
    props: {
        username: {
            type: String,
            required: true
        },
        twoot: {
            type: Object,
            required: true
        }
    }
    // methods: {
    //     favouriteTwoot(id) {
    //         // emit is to send from child to parent
    //         // emit favourite event and the id
    //         // passes data to parent from child
    //         this.$emit('favourite', id)
    //     }
    // }
};
</script>

<style lang="scss" scoped>
.twoot-item {
    padding: 20px;
    background-color: white;
    border-radius: 5px;
    border: 1px solid #DFE3E8;
    box-sizing: border-box;
    cursor: pointer;
    transition: all 0.25s ease;

    // .twoot-item:hover { //hover has to be right next to :
    &:hover { // this is enabled using scss, hover is a special keyword in css
        transform: scale(1.1, 1.1);
    }

    .twoot-item__user {
        font-weight: bold;
    }
}

</style>