<template>
  <div class="content">
    <div v-if="user">
      <div class="page-content page-container" id="page-content">
        <div class="padding">
          <div class="row container d-flex justify-content-center">
            <div class="card user-card-full">
              <div class="row m-l-0 m-r-0">
                <div class="col-sm-4 bg-c-lite-green user-profile">
                  <div class="card-block text-center text-white">
                    <div class="m-b-25">
                      <!-- Profile icon-->
                      <img
                        src="../assets/user.png"
                        class="img-radius"
                        alt="User-Profile-Image"
                      />
                    </div>
                    <!-- User description -->
                    <h5 class="f-w-600">{{ user.name }}</h5>
                    <textarea
                      v-model="user.description"
                      :disabled="!isEditing"
                      class="description"
                      :class="{ textarea_edit: isEditing }"
                      placeholder="Describe yourself here..."
                    />
                    <br />
                    <!-- Edit icon-->
                    <div
                      v-if="!isEditing"
                      class="mt-3 icon"
                      @click="editProfile()"
                    >
                      <font-awesome-icon :icon="['fas', 'edit']" size="2x" />
                      <span lass="ml-3">Edit profile</span>
                    </div>
                    <!-- Save icon-->
                    <div v-else class="mt-3 icon" @click="saveProfile()">
                      <font-awesome-icon :icon="['fas', 'save']" size="2x" />
                      <span class="ml-1">Save profile</span>
                    </div>
                  </div>
                </div>
                <div class="col-sm-8">
                  <div class="card-block">
                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600">
                      Information
                    </h6>
                    <div class="wrapper">
                      <div class="row h-50">
                        <!-- Visibility checkbox -->
                        <div class="col-sm-6">
                          <p class="m-b-10 f-w-600">Visibility</p>
                          <input
                            type="checkbox"
                            id="profileVisibility"
                            :disabled="!isEditing"
                            v-model="user.visibility"
                          />
                          <label class="ml-2" for="profileVisibility"
                            >Public profile</label
                          >
                        </div>
                        <!-- Email label -->
                        <div class="col-sm-6">
                          <div>
                            <p class="m-b-10 f-w-600">Email</p>
                            <label class="text-muted f-w-400">{{
                              user.email
                            }}</label>
                          </div>
                        </div>
                      </div>
                      <div class="row">
                        <!-- Skills -->
                        <div class="col-sm-12 mt-3">
                          <span class="m-b-10 f-w-600">Skills</span><br />
                          <div
                            class="skills mt-2"
                            v-for="skill in user.skills"
                            :key="skill"
                          >
                            <font-awesome-icon
                              :icon="['fas', 'times-circle']"
                              size="1x"
                              class="delete_skill"
                              :class="{ delete_skill_edit: isEditing }"
                              @click="removeSkill(skill)"
                            />
                            <span
                              class="text-muted f-w-400"
                              :class="{ skill: isEditing }"
                            >
                              {{ skill }}
                            </span>
                          </div>
                          <p
                            v-if="user.skills.length === 0"
                            class="text-muted f-w-400"
                          >
                            No skills yet!
                          </p>
                          <!-- Add skills -->
                          <div v-if="isEditing" class="mt-3 new-skill">
                            <input
                              type="text"
                              v-model="newSkill"
                              placeholder="New skill..."
                            />

                            <font-awesome-icon
                              :icon="['fas', 'plus-circle']"
                              size="2x"
                              v-if="isEditing"
                              @click="addSkill"
                              class="add-skill"
                            />
                          </div>
                        </div>
                        <!-- Portfolio -->
                        <div class="col-sm-12 mt-4">
                          <p class="m-b-10 f-w-600">Portfolio</p>
                          <textarea
                            v-model="user.portfolio"
                            :disabled="!isEditing"
                            :class="{ portfolio_edit: isEditing }"
                            class="text-muted f-w-400 portfolio"
                            placeholder="Portfolio information here..."
                          >
                          </textarea>
                        </div>
                        <div class="col-sm-12 mt-3">
                          <p class="m-b-10 f-w-600">Project Applications</p>
                          <h6
                            v-if="user.applications"
                            class="text-muted f-w-400"
                          >
                            {{ user.applications }}
                          </h6>
                          <h6 v-else class="text-muted f-w-400">
                            No applications yet
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      newSkill: "",
      isEditing: false,
    };
  },
  mounted() {
    //TODO: implement real user verification
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((data) => (this.user = data))
      .catch((err) => console.log(err));
  },
  methods: {
    editProfile() {
      this.isEditing = !this.isEditing;
    },
    //TODO: http post request on save
    saveProfile() {
      this.isEditing = !this.isEditing;
      alert(
        `Name: ${this.user.name}\nEmail: ${this.user.email}\nVisibility: ${this.user.visibility}\nSkills: ${this.user.skills}\nPortfolio: ${this.user.portfolio}\nDescription: ${this.user.description}`
      );
      this.newSkill = "";
    },
    addSkill() {
      if (!this.user.skills.includes(this.newSkill) && this.newSkill) {
        this.user.skills.push(this.newSkill);
      }
    },
    removeSkill(skill) {
      if (this.isEditing) {
        this.user.skills = this.user.skills.filter((x) => skill !== x);
      }
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.padding {
  padding: 3rem !important;
}

.user-card-full {
  overflow: hidden;
}

.card {
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  box-shadow: 0 1px 20px 0 rgba(69, 90, 100, 0.08);
  border: none;
  margin-bottom: 30px;
}

.m-r-0 {
  margin-right: 0px;
}

.m-l-0 {
  margin-left: 0px;
}

.user-card-full .user-profile {
  border-radius: 5px 0 0 5px;
}

.bg-c-lite-green {
  background: -webkit-gradient(
    linear,
    left top,
    right top,
    from(#17a2b8),
    to(#90e0ef)
  );
  background: linear-gradient(to right, #17a2b8, #90e0ef);
}

.user-profile {
  padding: 20px 0;
}

.card-block {
  padding: 1.25rem;
}

.m-b-25 {
  margin-bottom: 25px;
}

.img-radius {
  border-radius: 5px;
  filter: drop-shadow(0px 0px 2px blue);
}

img {
  width: 75%;
}

h6 {
  font-size: 14px;
}

.card .card-block p {
  line-height: 25px;
}

@media only screen and (min-width: 1400px) {
  p {
    font-size: 14px;
  }
}

.card-block {
  padding: 1.25rem;
}

.b-b-default {
  border-bottom: 1px solid #e0e0e0;
}

.m-b-20 {
  margin-bottom: 20px;
}

.p-b-5 {
  padding-bottom: 5px !important;
}

.card .card-block p {
  line-height: 25px;
}

.m-b-10 {
  margin-bottom: 10px;
}

.text-muted {
  color: #919aa3 !important;
}

.b-b-default {
  border-bottom: 1px solid #e0e0e0;
}

.f-w-600 {
  font-weight: 600;
}

.m-b-20 {
  margin-bottom: 20px;
}

.m-t-40 {
  margin-top: 20px;
}

.p-b-5 {
  padding-bottom: 5px !important;
}

.m-b-10 {
  margin-bottom: 10px;
}

.m-t-40 {
  margin-top: 20px;
}

.user-card-full .social-link li {
  display: inline-block;
}

.user-card-full .social-link li a {
  font-size: 20px;
  margin: 0 10px 0 0;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.icon {
  filter: drop-shadow(0px 0px 2px rgb(126, 207, 247));
}

.icon:hover {
  cursor: pointer;
}

.row {
  display: flex;
  justify-content: space-between;
}

.skills {
  display: inline-flex;
}

.skills span {
  background-color: rgb(126, 207, 247);
  margin-right: 1em;
  border-radius: 15px;
  padding: 0.5em;
  color: white !important;
  display: inline-block;
}

textarea.description {
  border-style: none;
  border-color: Transparent;
  background-color: transparent;
  overflow: auto;
  resize: none;
  color: white;
  text-align: center;
}

textarea.textarea_edit {
  color: black;
  box-shadow: 0 0 3px rgb(126, 207, 247);
  resize: both;
}

textarea.portfolio {
  text-align: left;
  width: 100%;
  border-style: none;
  border-color: Transparent;
}

textarea.portfolio_edit {
  color: black;
  box-shadow: 0 0 3px rgb(126, 207, 247);
}

textarea:focus {
  outline: none;
}

.skills {
  display: inline-flex;
  flex-direction: row-reverse;
}

.delete_skill {
  display: none;
  position: relative;
  right: 20px;
  color: #f25f5c;
}

.delete_skill_edit {
  display: block;
}

.delete_skill_edit:hover {
  cursor: pointer;
}

.delete_skill:hover ~ .skill {
  animation: shake 1s;
  animation-iteration-count: infinite;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}

.new-skill {
  display: flex;
  align-items: center;
}

.new-skill input {
  outline: 0;
  border-width: 0 0 2px;
  border-color: rgb(126, 207, 247);
}

.add-skill {
  margin-left: 0.1em;
  color: rgb(126, 207, 247);
  filter: drop-shadow(0px 0px 1px rgb(126, 207, 247));
}

.add-skill:hover {
  cursor: pointer;
}
</style>