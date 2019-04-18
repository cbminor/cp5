<template>
<div>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Create Scrapbook</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createScrapbook">
            <div class="form-group row">
              <label for="title" class="col-sm-3 col-form-label">Title</label>
              <div class="col-sm-9">
                <input type="text" class="form-control" id="title" v-model="title" placeholder="Title">
              </div>
            </div>
            <div class="form-group row">
              <label for="status" class="col-sm-3 col-form-label">Private or Public: </label>
              <div class="btn-group btn-group-toggle" data-toggle="buttons">
                <label class="btn btn-secondary active">
                  <input type="radio" name="options" id="option1" @click="setPrivacy('public')" autocomplete="off" checked> Public
                </label>
                <label class="btn btn-secondary">
                  <input type="radio" name="options" id="option2" @click="setPrivacy('private')" autocomplete="off"> Private
                </label>
              </div>
            </div>
            <button class="btn btn-dark" type="submit">Create</button>
          </form>

        </div>
      </div>
    </div>
  </div>

  <div v-if="user">
    <button @click="logout">Logout</button>
    <h2>{{ user.name}}'s Scrapbooks</h2>
    <div class="flex-container">
      <div v-for="scrapbook in albums" v-bind:key="scrapbook._id">
        <div class="card">
          <img src="/images/pic1.jpg" />
          <div class="container">
            <p>{{scrapbook.title}}</p>
          </div>
        </div>
      </div>
    </div>

    <button data-toggle="modal" data-target="#exampleModal" class="btn btn-dark">New Scrapbook</button>
  </div>
  <div v-else>
    <p>Please register or sign in to see and edit your scrapbooks</p>
    <router-link to="/register" class="pure-button">Register</router-link> or
    <router-link to="/login" class="pure-button">Login</router-link>
  </div>
</div>
</template>


<script>
// document.onload = function() {
//   document.getElementById("status").bootstrapToggle({
//     on: 'Enabled',
//     off: 'Disabled'
//   });
// }

export default {
  name: 'mypage',
  created() {
    this.$store.dispatch("getUser");
    this.$store.dispatch("getMyScrapbooks");

  },
  data() {
    return {
      title: "",
      privacy: "",
      file: null,
    }
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    albums() {
      return this.$store.state.scrapbooks;
    },
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async logout() {
      try {
        this.error = await this.$store.dispatch("logout");
      } catch (error) {
        console.log(error);
      }
    },
    async createScrapbook() {
      try {
        // const formData = new FormData();
        // formData.append('user', this.$store.state.user);
        // formData.append('title', this.title);
        // formData.append('type', this.privacy);
        await this.$store.dispatch("createScrapbook", {
          user: this.$store.state.user,
          title: this.title,
          type: this.privacy
        });
        this.title = '';
        this.privacy = '';
        this.file = null;
      } catch (error) {
        console.log(error);
      }
    },
    setPrivacy(privacy) {
      this.privacy = privacy;
    }
  }
}
</script>

<style scoped>
.card {
  /* Add shadows to create the "card" effect */
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  max-width: 25%;
  margin: 1rem;
  min-width: 315px !important;
}

/* On mouse-over, add a deeper shadow */
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.flex-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.card img {
  height: 250px;
  object-fit: cover;
}

.card p {
  margin-top: 1rem !important;
}
</style>
