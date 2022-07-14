<template>
    <div id="challenge">
        <div v-if="!this.$store.state.userIsAuthorized" id="not-logged-in">
            <h5>Challenge page - authentication needed</h5>
        </div>
        <div v-else id="challenge">
            <h5>Challenge page</h5>
        </div>
    </div>
</template>

<style>
#challenge,
#not-logged-in {
    text-align: center;
    margin-top: 30px;
}
</style>
