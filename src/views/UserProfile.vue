<template>
  <div class="d-flex justify-content-center align-items-center flex-grow-1">
    <div
      v-if="name !== ''"
      class="d-flex flex-lg-row flex-column justify-content-between shadow rounded overflow-hidden m-5"
    >
      <div class="bg-c-lite-green">
        <div class="card-block text-center text-white">
          <div>
            <!-- Profile icon-->
            <img
              src="../assets/user.png"
              class="img-radius pb-2"
              alt="User-Profile-Image"
            />
          </div>
          <!-- User description -->
          <h5 class="f-w-600">{{ name }}</h5>
          <textarea
            v-model="description"
            :disabled="!isEditing"
            class="description"
            :class="{ textarea_edit: isEditing }"
            placeholder="Describe yourself here..."
          />
          <br />
          <!-- Edit icon-->
          <div v-if="!isEditing" class="mt-3 icon" @click="editProfile()">
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
      <div>
        <div class="card-block">
          <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
          <div class="wrapper">
            <div class="row h-50">
              <!-- Visibility checkbox -->
              <div class="col-sm-6">
                <p class="m-b-10 f-w-600">Visibility</p>
                <input
                  type="checkbox"
                  id="profileVisibility"
                  :disabled="!isEditing"
                  :checked="visibility"
                  v-model="visibility"
                />
                <label class="ml-2" for="profileVisibility"
                  >Public profile</label
                >
              </div>
              <!-- Email label -->
              <div class="col-sm-6">
                <div>
                  <p class="m-b-10 f-w-600">Email</p>
                  <label class="text-muted f-w-400">{{ email }}</label>
                </div>
              </div>
            </div>
            <div class="">
              <!-- Skills -->
              <div class="mt-3">
                <span class="m-b-10 f-w-600">Skills</span><br />
                <div class="d-flex flex-column flex-md-row flex-lg-row">
                  <div class="col-md-3 mt-3">
                    <div v-for="skill in availableSkills" :key="skill.name">
                      <SkillCheckbox
                        v-if="skill.industry == 'Web development'"
                        :skill="skill"
                        :edit="isEditing"
                        @updateSkills="updateSkills"
                      />
                    </div>
                  </div>
                  <div class="col-md-3 mt-3">
                    <div v-for="skill in availableSkills" :key="skill.name">
                      <SkillCheckbox
                        v-if="skill.industry == 'Game development'"
                        :skill="skill"
                        :edit="isEditing"
                        @updateSkills="updateSkills"
                      />
                    </div>
                  </div>
                  <div class="col-md-3 mt-3">
                    <div v-for="skill in availableSkills" :key="skill.name">
                      <SkillCheckbox
                        v-if="skill.industry == 'Music'"
                        :skill="skill"
                        :edit="isEditing"
                        @updateSkills="updateSkills"
                      />
                    </div>
                  </div>
                  <div class="col-md-3 mt-3">
                    <div v-for="skill in availableSkills" :key="skill.name">
                      <SkillCheckbox
                        v-if="skill.industry == 'Film'"
                        :skill="skill"
                        :edit="isEditing"
                        @updateSkills="updateSkills"
                      />
                    </div>
                  </div>
                </div>
                <!-- <div class="d-flex flex-column flex-md-row flex-lg-row">
                 Web dev skills 
               <div class="col-sm-3 mt-3">
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="java"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Java</label>
                    </div>
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="javascript"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Javascript</label>
                    </div>
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="vue"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Vue</label>
                    </div>
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="frontend"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Frontend</label>
                    </div>
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="backend"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Backend</label>
                    </div>
                  </div>
                  Game dev skills
             <div class="col-sm-3 mt-3">
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="unity"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Unity</label>
                    </div>
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="libgdx"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">LibGDX</label>
                    </div>
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="unreal"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Unreal</label>
                    </div>
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="animations2D"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Animations 2D</label>
                    </div>
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="animations3D"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Animations 3D</label>
                    </div>
                  </div>
                Music skills
                <div class="col-sm-3 mt-3">
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="guitar"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Guitar</label>
                    </div>
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="drums"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Drums</label>
                    </div>
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="piano"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Piano</label>
                    </div>
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="vocals"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Vocals</label>
                    </div>
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="violin"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Violin</label>
                    </div>
                  </div> 
                Film skills 
                <div class="col-sm-3 mt-3">
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="acting"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Acting</label>
                    </div>
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="directing"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Directing</label>
                    </div>
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="production"
                        :disabled="!isEditing"
                        v-text="production"
                      />
                      <label class="ml-2">Production</label>
                    </div>
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="audioEditing"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2">Audio editing</label>
                    </div>
                    <div
                      class="d-flex flex-row flex-nowrap justify-content-start align-items-center text-nowrap mx-2"
                    >
                      <input
                        type="checkbox"
                        v-model="videoEditing"
                        :disabled="!isEditing"
                      />
                      <label class="ml-2 my-2">Video editing</label>
                    </div> 
                  </div> 
                </div> -->
              </div>
              <!-- Portfolio -->
              <div class="col-sm-12 mt-4">
                <p class="m-b-10 f-w-600">Portfolio</p>
                <textarea
                  v-model="portfolio"
                  :disabled="!isEditing"
                  :class="{ portfolio_edit: isEditing }"
                  class="text-muted f-w-400 portfolio"
                  placeholder="Portfolio information here..."
                >
                </textarea>
              </div>
              <div class="col-sm-12 mt-3">
                <p class="m-b-10 f-w-600">Project Applications</p>
                <h6 v-if="userProjects.length" class="text-muted f-w-400">
                  {{ userProjects }}
                </h6>
                <h6 v-else class="text-muted f-w-400">No applications yet</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import SkillCheckbox from "../components/SkillCheckbox";
import { SKILLS, API_URL } from "../constants/constants";

export default {
  components: { SkillCheckbox },
  data() {
    return {
      // user: null,
      // java: false,
      // javascript: false,
      // frontend: false,
      // backend: false,
      // vue: false,
      // unity: false,
      // libgdx: false,
      // unreal: false,
      // animations3D: false,
      // animations2D: false,
      // acting: false,
      // directing: false,
      // production: false,
      // videoEditing: false,
      // audioEditing: false,
      // drums: false,
      // guitar: false,
      // piano: false,
      // violin: false,
      // vocals: false,
      isEditing: false,
      userId: 2,
      name: "",
      description: "",
      portfolio: "",
      visibility: false,
      email: "",
      availableSkills: SKILLS,
      userSkills: [],
      userProjects: [],
    };
  },
  mounted() {
    //TODO: implement real user verification
    // fetch("http://localhost:3000/user")
    //   .then((res) => res.json())
    //   .then((data) => (this.user = data))
    //   .catch((err) => console.log(err));

    this.availableSkills = this.availableSkills.map((x) => ({
      name: x.name,
      industry: x.industry,
      hasSkill: false,
    }));

    axios
      .get(API_URL + `/users/${this.userId}`, {
        userDescription: this.description,
        userPortfolio: this.portfolio,
        userSkills: this.userSkills,
        userVisibility: this.visibility,
      })
      .then((res) => {
        console.log(res);
        this.name = res.data.userName;
        this.email = res.data.userEmail;
        this.description = res.data.userDescription;
        this.visibility = res.data.userVisibility;
        this.portfolio = res.data.userPortfolio;

        this.userSkills = res.data.userSkills;

        // checkboxes need to be checked for skills user has
        this.availableSkills.forEach((skill) => {
          if (this.userSkills.includes(skill.name)) skill.hasSkill = true;
        });

        this.userProjects = res.data.userProjects;
      })
      .catch((error) => console.log(error));
  },
  methods: {
    editProfile() {
      this.isEditing = !this.isEditing;
    },
    saveProfile() {
      this.isEditing = !this.isEditing;

      // this.updateWebDevSkills();
      // this.updateGameDevSkills();
      // this.updateMusicSkills();
      // this.updateFilmSkills();

      // TODO: http post request on save
      // alert(
      //   `Name: ${this.user.name}\nEmail: ${this.user.email}\nVisibility: ${this.user.visibility}\nSkills: ${this.user.skills}\nPortfolio: ${this.user.portfolio}\nDescription: ${this.user.description}`
      // );
      axios
        .put(API_URL + `/users/${this.userId}`, {
          userName: this.name,
          userEmail: this.email,
          userDescription: this.description,
          userVisibility: this.visibility,
          userPortfolio: this.portfolio,
          userSkills: this.userSkills,
        })
        .then((res) => {
          console.log(res);
          alert("User updated successfully");
        })
        .catch((error) => {
          console.log(error);
          alert("User not updated");
        });
    },
    updateSkills(e) {
      this.availableSkills.forEach((skill) => {
        if (skill.name === e.name) skill.hasSkill = e.hasSkill;
      });

      this.availableSkills.forEach((skill) => {
        if (skill.hasSkill === true && !this.userSkills.includes(skill.name)) {
          this.userSkills.push(skill.name);
        }
        if (skill.hasSkill === false && this.userSkills.includes(skill.name)) {
          this.userSkills = this.userSkills.filter((x) => x !== skill.name);
        }
      });
    },
    // user skills are saved in user.skills
    // check corresponding boolean in checkbox before adding/removing skill
    // updateWebDevSkills() {
    //   if (this.java) {
    //     if (!this.user.skills.includes("Java")) this.user.skills.push("Java");
    //   } else {
    //     if (this.user.skills.includes("Java"))
    //       this.user.skills = this.user.skills.filter((x) => x !== "Java");
    //   }

    //   if (this.javascript) {
    //     if (!this.user.skills.includes("Javascript"))
    //       this.user.skills.push("Javascript");
    //   } else {
    //     if (this.user.skills.includes("Javascript"))
    //       this.user.skills = this.user.skills.filter((x) => x !== "Javascript");
    //   }

    //   if (this.frontend) {
    //     if (!this.user.skills.includes("Frontend"))
    //       this.user.skills.push("Frontend");
    //   } else {
    //     if (this.user.skills.includes("Frontend"))
    //       this.user.skills = this.user.skills.filter((x) => x !== "Frontend");
    //   }

    //   if (this.backend) {
    //     if (!this.user.skills.includes("Backend"))
    //       this.user.skills.push("Backend");
    //   } else {
    //     if (this.user.skills.includes("Backend"))
    //       this.user.skills = this.user.skills.filter((x) => x !== "Backend");
    //   }

    //   if (this.vue) {
    //     if (!this.user.skills.includes("Vue")) this.user.skills.push("Vue");
    //   } else {
    //     if (this.user.skills.includes("Vue"))
    //       this.user.skills = this.user.skills.filter((x) => x !== "Vue");
    //   }
    // },
    // updateGameDevSkills() {
    //   if (this.unity) {
    //     if (!this.user.skills.includes("Unity")) this.user.skills.push("Unity");
    //   } else {
    //     if (this.user.skills.includes("Unity"));
    //   }

    //   if (this.unreal) {
    //     if (!this.user.skills.includes("Unreal"))
    //       this.user.skills.push("Unreal");
    //   } else {
    //     if (this.user.skills.includes("Unreal"))
    //       this.user.skills = this.user.skills.filter((x) => x !== "Unreal");
    //   }

    //   if (this.libgdx) {
    //     if (!this.user.skills.includes("LibGDX"))
    //       this.user.skills.push("LibGDX");
    //   } else {
    //     if (this.user.skills.includes("LibGDX"))
    //       this.user.skills = this.user.skills.filter((x) => x !== "LibGDX");
    //   }

    //   if (this.animations2D) {
    //     if (!this.user.skills.includes("Animations 2D"))
    //       this.user.skills.push("Animations 2D");
    //   } else {
    //     if (this.user.skills.includes("Animations 2D"))
    //       this.user.skills = this.user.skills.filter(
    //         (x) => x !== "Animations 2D"
    //       );
    //   }

    //   if (this.animations3D) {
    //     if (!this.user.skills.includes("Animations 3D"))
    //       this.user.skills.push("Animations 3D");
    //   } else {
    //     if (this.user.skills.includes("Animations 3D"))
    //       this.user.skills = this.user.skills.filter(
    //         (x) => x !== "Animations 3D"
    //       );
    //   }
    // },
    // updateMusicSkills() {
    //   if (this.guitar) {
    //     if (!this.user.skills.includes("Guitar"))
    //       this.user.skills.push("Guitar");
    //   } else {
    //     if (this.user.skills.includes("Guitar"))
    //       this.user.skills = this.user.skills.filter((x) => x !== "Guitar");
    //   }

    //   if (this.drums) {
    //     if (!this.user.skills.includes("Drums")) this.user.skills.push("Drums");
    //   } else {
    //     if (this.user.skills.includes("Drums"))
    //       this.user.skills = this.user.skills.filter((x) => x !== "Drums");
    //   }

    //   if (this.piano) {
    //     if (!this.user.skills.includes("Piano")) this.user.skills.push("Piano");
    //   } else {
    //     if (this.user.skills.includes("Piano"))
    //       this.user.skills = this.user.skills.filter((x) => x !== "Piano");
    //   }

    //   if (this.vocals) {
    //     if (!this.user.skills.includes("Vocals"))
    //       this.user.skills.push("Vocals");
    //   } else {
    //     if (this.user.skills.includes("Vocals"))
    //       this.user.skills = this.user.skills.filter((x) => x !== "Vocals");
    //   }

    //   if (this.violin) {
    //     if (!this.user.skills.includes("Violin"))
    //       this.user.skills.push("Violin");
    //   } else {
    //     if (this.user.skills.includes("Violin"))
    //       this.user.skills = this.user.skills.filter((x) => x !== "Violin");
    //   }
    // },
    // updateFilmSkills() {
    //   if (this.acting) {
    //     if (!this.user.skills.includes("Acting"))
    //       this.user.skills.push("Acting");
    //   } else {
    //     if (this.user.skills.includes("Acting"))
    //       this.user.skills = this.user.skills.filter((x) => x !== "Acting");
    //   }

    //   if (this.directing) {
    //     if (!this.user.skills.includes("Directing"))
    //       this.user.skills.push("Directing");
    //   } else {
    //     if (this.user.skills.includes("Directing"))
    //       this.user.skills = this.user.skills.filter((x) => x !== "Directing");
    //   }

    //   if (this.production) {
    //     if (!this.user.skills.includes("Piano")) this.user.skills.push("Piano");
    //   } else {
    //     if (this.user.skills.includes("Production"))
    //       this.user.skills = this.user.skills.filter((x) => x !== "Piano");
    //   }

    //   if (this.audioEditing) {
    //     if (!this.user.skills.includes("Audio editing"))
    //       this.user.skills.push("Audio editing");
    //   } else {
    //     if (this.user.skills.includes("Audio editing"))
    //       this.user.skills = this.user.skills.filter(
    //         (x) => x !== "Audio editing"
    //       );
    //   }

    //   if (this.videoEditing) {
    //     if (!this.user.skills.includes("Video editing"))
    //       this.user.skills.push("Video editing");
    //   } else {
    //     if (this.user.skills.includes("Video editing"))
    //       this.user.skills = this.user.skills.filter(
    //         (x) => x !== "Video editing"
    //       );
    //   }
    // },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
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
  margin-left: -1px;
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
  background-repeat: no-repeat;
  background-size: cover !important;
  max-width: 250px;
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

.f-w-600 {
  font-weight: 600;
}

.m-b-20 {
  margin-bottom: 20px;
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
  flex-wrap: wrap;
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
  resize: both;
}

textarea.portfolio {
  text-align: left;
  width: 100%;
  border-style: none;
  border-color: Transparent;
}

textarea.portfolio_edit,
textarea.textarea_edit {
  color: black;
  box-shadow: 0 0 3px rgb(126, 207, 247);
}

textarea:focus {
  outline: none;
}
</style>