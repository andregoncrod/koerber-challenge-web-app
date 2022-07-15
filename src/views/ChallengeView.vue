<script>
export default {
    data: function () {
        return {
            errors: [],
            email: null
        };
    },
    methods: {
        checkForm: function (e) {
            if (this.email && this.validateEmail()) {
                this.errors = [];
                return true;
            }

            this.errors = [];

            if (!this.validateEmail()) {
                this.errors.push('Please enter a valid email address');
            }

            e.preventDefault();
        },
        validateEmail() {
            if (
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
            ) {
                return true;
            } else {
                return false;
            }
        }
    }
};
</script>

<template>
    <div id="challenge">
        <div v-if="!this.$store.state.userIsAuthorized" id="not-logged-in">
            <h5>Challenge page - authentication needed</h5>
        </div>
        <div v-else id="challenge" class="col-md-12">
            <h5>Challenge page</h5>

            <form @submit="checkForm">
                <p v-if="errors.length">
                    <b>Please correct the following error(s):</b>
                    <ul>
                        <li v-for="error in errors">{{ error }}</li>
                    </ul>
                </p>
                <div class="form-group">
                    <label for="inputEmail1">Email address</label>
                    <input
                        for="email"
                        class="form-control"
                        id="inputEmail"
                        placeholder="Please enter your email here"
                        required
                        v-model="email"
                    />
                </div>
                <button id="submitForm" type="submit" class="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    </div>
</template>

<style>
#challenge {
    padding: 20px;
}

#challenge h5,
#not-logged-in {
    text-align: center;
    margin-top: 30px;
}

#submitForm {
    margin-top: 15px;
}

#inputEmail {
    width: 30%;
}
</style>
