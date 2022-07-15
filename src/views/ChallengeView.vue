<script>
import axios from 'axios';

export default {
    data: function () {
        const LAST_SAVED_EMAIL = localStorage.getItem(
            `lastValipAPIEmailSaved#${localStorage.getItem('nickName')}`
        );
        const LAST_SAVED_USERID = localStorage.getItem(
            `lastValipAPIUserIDSaved#${localStorage.getItem('nickName')}`
        );

        return {
            errors: [],
            email: LAST_SAVED_EMAIL ? LAST_SAVED_EMAIL : null,
            users: [],
            actualUserID: LAST_SAVED_USERID ? LAST_SAVED_USERID : -1,
            posts: []
        };
    },
    mounted() {
        this.getUsersFromAPI();
    },
    methods: {
        createRandomPost() {
            if (this.actualUserID != -1) {
                const RANDOM_NUMBER = Math.floor(Math.random() * 9999) + 1;
                axios
                    .post('https://jsonplaceholder.typicode.com/posts/', {
                        title: `Random Test - ${RANDOM_NUMBER}`,
                        body: `Rand Test Body - ${RANDOM_NUMBER}`,
                        userId: this.actualUserID
                    })
                    .then((response) => {
                        this.posts.push(response.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        },
        validateIfUserExixtsOnAPI() {
            let found = false;
            if (this.users.length > 0) {
                for (let i = 0; i < this.users.length; i++) {
                    if (this.users[i].email === this.email) {
                        found = true;
                        this.actualUserID = this.users[i].id;
                        localStorage.setItem(
                            `lastValipAPIUserIDSaved#${localStorage.getItem(
                                'nickName'
                            )}`,
                            this.users[i].id
                        );
                    }
                }
            }
            return found;
        },
        getPostsFromUser() {
            if (this.actualUserID != -1) {
                axios
                    .get(
                        `https://jsonplaceholder.typicode.com/posts?userId=${this.actualUserID}`
                    )
                    .then((response) => {
                        this.posts = response.data;
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            } else {
                this.posts = [];
            }
        },
        getUsersFromAPI() {
            axios
                .get('https://jsonplaceholder.typicode.com/users/')
                .then((response) => {
                    this.users = response.data;
                    this.getPostsFromUser();
                })
                .catch((err) => {
                    console.log(err);
                });
        },
        checkForm: function (e) {
            this.errors = [];
            e.preventDefault();

            if (this.email && this.validateEmail()) {
                if (!this.validateIfUserExixtsOnAPI()) {
                    this.errors.push('User not known on API');
                    return false;
                }

                localStorage.setItem(
                    `lastValipAPIEmailSaved#${localStorage.getItem(
                        'nickName'
                    )}`,
                    this.email
                );
                this.getPostsFromUser();
                this.errors = [];
                return true;
            }

            this.errors = [];

            if (!this.validateEmail()) {
                this.errors.push('Please enter a valid email address');
            }
        },
        validateEmail() {
            if (
                /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(this.email)
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
        <div v-else id="challenge">
            <div class="col-md-12">
                <h5>Challenge page</h5>
            </div>
            <div class="col-md-12" style="margin-top: 30px">
                <div class="col-md-6" style="float: left">
                    <form @submit="checkForm">
                        <div v-if="errors.length">
                            <b>Please correct the following error(s):</b>
                            <ul>
                                <li v-for="error in errors" :key="error">
                                    {{ error }}
                                </li>
                            </ul>
                        </div>
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
                        <button
                            id="submitForm"
                            type="submit"
                            class="btn btn-primary"
                        >
                            Submit
                        </button>
                    </form>
                </div>
                <div class="col-md-6" style="float: left">
                    <h6>User Posts - ID: {{ actualUserID }}</h6>
                    <button
                        id="submitPost"
                        type="button"
                        class="btn btn-primary"
                        @click="createRandomPost"
                    >
                        Create Random Post
                    </button>
                    <div v-if="actualUserID != -1">
                        <table class="table table-striped table-responsive">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Title</th>
                                    <th scope="col">Body</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="post in posts" :key="post.id">
                                    <th scope="row">{{ post.id }}</th>
                                    <td>{{ post.title }}</td>
                                    <td>{{ post.body }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div v-else>
                        <h6>No known user on API inserted</h6>
                    </div>
                </div>
            </div>
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
    width: 60%;
}
table {
    font-size: 10px;
}
</style>
