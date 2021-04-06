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
                <div v-if="projectApplications.length">
                  <div
                    v-for="project in projectApplications"
                    :key="project.title"
                    class="text-muted f-w-400 mt-3"
                  >
                    <div v-if="!project.isAdmin">
                      <h6>Project Title: {{ project.title }}</h6>
                      <h6>Application Status: {{ project.status }}</h6>
                    </div>
                  </div>
                </div>

                <h6 v-else class="text-muted f-w-400">No applications yet</h6>
              </div>
              <div class="col-sm-12 mt-3">
                <p class="m-b-10 f-w-600">Admin</p>
                <div v-if="projectApplications.length">
                  <div
                    v-for="project in projectApplications"
                    :key="project.title"
                    class="text-muted f-w-400 mt-3"
                  >
                    <div v-if="project.isAdmin">
                      <h6
                        @click="navigateToAdminPage(project.id.projectId)"
                        class="show-pointer"
                      >
                        Project Title: {{ project.title }}
                      </h6>
                    </div>
                  </div>
                </div>

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
import {
  getUser,
  updateUser,
  getUsersProjectsById,
  getProjectById,
} from "../utils/apiService";

import SkillCheckbox from "../components/SkillCheckbox";
import { SKILLS } from "../constants/constants";

export default {
  components: { SkillCheckbox },
  data() {
    return {
      isEditing: false,
      userId: "",
      name: "",
      description: "",
      portfolio: "",
      visibility: false,
      email: "",
      availableSkills: SKILLS,
      userSkills: [],
      userProjects: [],
      projectApplications: [],
    };
  },
  mounted() {
    this.userId = this.$store.getters.userId;
    this.addHasSkillBoolean();
    this.getUserInformation();
  },
  methods: {
    navigateToAdminPage(projectId) {
      this.$router.push({ path: `/project/${projectId}/admin` });
    },
    addHasSkillBoolean() {
      this.availableSkills = this.availableSkills.map((x) => ({
        name: x.name,
        industry: x.industry,
        hasSkill: false,
      }));
    },
    //TODO: implement real user verification
    async getUserInformation() {
      let user = await getUser();

      this.name = user.userName;
      this.email = user.userEmail;
      this.description = user.userDescription;
      this.visibility = user.userVisibility;
      this.portfolio = user.userPortfolio;

      this.userSkills = user.userSkills;

      // checkboxes need to be checked for skills user has
      this.availableSkills.forEach((skill) => {
        if (this.userSkills.includes(skill.name)) skill.hasSkill = true;
      });

      this.userProjects = user.userProjects;

      this.updateProjectApplications();
    },
    // show project title and application status
    async updateProjectApplications() {
      this.userProjects.forEach(async (project) => {
        let projectId = project.substring(project.lastIndexOf("/") + 1);

        let usersProjects = await getUsersProjectsById(this.userId, projectId);

        let projectTitle = "";
        let status = usersProjects.approvalStatus;
        let isAdmin = usersProjects.admin;
        let id = usersProjects.id;

        let projectData = await getProjectById(projectId);
        projectTitle = projectData.projectTitle;
        this.projectApplications.push({
          title: projectTitle,
          status: status,
          isAdmin,
          id,
        });
      });
    },
    editProfile() {
      this.isEditing = !this.isEditing;
    },
    async saveProfile() {
      this.isEditing = !this.isEditing;

      let user = {
        userId: this.userId,
        userName: this.name,
        userEmail: this.email,
        userDescription: this.description,
        userVisibility: this.visibility,
        userPortfolio: this.portfolio,
        userSkills: this.userSkills,
      };

      await updateUser(user);
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

.show-pointer:hover {
  cursor: pointer;
}
</style>