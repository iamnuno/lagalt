<template>
  <div class="m-5">
    <div class="container card">
      <div class="row mt-4 p-3">
        <div class="col-12">
          <span class="card-title">New Project</span>
          <hr />
        </div>
      </div>

      <form action="" @submit.prevent="addProject">
        <div class="row p-3">
          <div class="col-md-6">
            <!-- title -->
            <div
              class="form-group"
              :class="{ 'form-group--error': $v.title.$error }"
            >
              <label class="form-label">Project Title</label>
              <input
                class="form-field"
                type="text"
                v-model.trim="$v.title.$model"
              />
              <div v-if="!$v.title.required" class="error">Field required</div>
            </div>
          </div>
          <div class="col-md-3">
            <!-- industry -->
            <div class="form-group">
              <label class="form-label">Project Industry</label><br />
              <label class="select">
                <select v-model="type" @change="onProjectIndustryChange()">
                  <option
                    v-for="type in availableProjectTypes"
                    :key="type"
                    :value="type"
                  >
                    {{ type }}
                  </option>
                </select>
                <svg>
                  <use xlink:href="#select-arrow-down"></use>
                </svg>
                <svg class="sprites">
                  <symbol id="select-arrow-down" viewbox="0 0 10 6">
                    <polyline points="1 1 5 5 9 1"></polyline>
                  </symbol>
                </svg>
              </label>
            </div>
          </div>
          <div class="col-md-3">
            <!-- status -->
            <div class="form-group">
              <label class="form-label">Project Status</label><br />
              <label class="select">
                <select v-model="status">
                  <option
                    v-for="status in availableStatus"
                    :key="status"
                    :value="status"
                  >
                    {{ status }}
                  </option>
                </select>
                <svg>
                  <use xlink:href="#select-arrow-down"></use>
                </svg>
                <svg class="sprites">
                  <symbol id="select-arrow-down" viewbox="0 0 10 6">
                    <polyline points="1 1 5 5 9 1"></polyline>
                  </symbol>
                </svg>
              </label>
            </div>
          </div>
        </div>
        <div class="row p-3">
          <div class="col-md-6">
            <!-- description -->
            <div
              class="form-group"
              :class="{ 'form-group--error': $v.description.$error }"
            >
              <label class="form-label">Project Description</label>
              <textarea
                class="form-field"
                type="text"
                v-model.trim="$v.description.$model"
              />
            </div>
            <div v-if="!$v.description.required" class="error">
              Field required
            </div>
          </div>
          <div class="col-md-3">
            <!-- skills -->
            <div
              class="form-group"
              :class="{ 'form-group--error': $v.projectSkills.$error }"
            >
              <div class="form-label">Project Skills</div>
              <br />
              <div v-for="skill in availableSkills" :key="skill.name">
                <SkillCheckbox
                  v-if="skill.industry == type"
                  :skill="skill"
                  :edit="true"
                  @updateSkills="updateSkills"
                />
              </div>
              <div v-if="!$v.projectSkills.required" class="error">
                You need at least one skill
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <!-- tags -->
            <div class="form-group">
              <div
                class="form-label"
                :class="{ 'form-group--error': $v.projectTags.$error }"
              >
                Project Tags
              </div>
              <br />
              <div v-for="tag in availableTags" :key="tag.name">
                <TagCheckbox
                  v-if="tag.industry == type"
                  :tag="tag"
                  @updateProjectTags="updateProjectTags"
                />
              </div>
              <div v-if="!$v.projectTags.required" class="error">
                You need at least one tag
              </div>
            </div>
          </div>
        </div>
        <div class="row p-3">
          <div class="col-md-6">
            <!-- external url -->
            <div
              class="form-group"
              :class="{ 'form-group--error': $v.externalUrl.$error }"
            >
              <label class="form-label">External URL</label>
              <input
                class="form-field"
                type="text"
                v-model.trim="$v.externalUrl.$model"
              />
              <div v-if="!$v.externalUrl.url" class="error">
                Enter valid URL
              </div>
            </div>
          </div>
          <div class="col-md-6">
            <!-- background url -->
            <div
              class="form-group"
              :class="{ 'form-group--error': $v.backgroundUrl.$error }"
            >
              <label class="form-label">Background URL</label>
              <input
                class="form-field"
                type="text"
                v-model.trim="$v.backgroundUrl.$model"
              />
              <div v-if="!$v.backgroundUrl.url" class="error">
                Enter valid URL
              </div>
            </div>
          </div>
        </div>
        <div class="row p-3">
          <div class="col-md-6">
            <!-- photos -->
            <div
              class="form-group"
              :class="{ 'form-group--error': $v.newPhotoUrl.$error }"
            >
              <label class="form-label">Photo URL</label>
              <div class="add-photo">
                <input
                  class="form-field"
                  type="text"
                  v-model.trim="$v.newPhotoUrl.$model"
                />
                <font-awesome-icon
                  :icon="['fas', 'plus']"
                  size="1x"
                  @click="addPhoto"
                  class="add-button"
                />
              </div>
              <div v-if="!$v.newPhotoUrl.url" class="error">
                Enter valid URL
              </div>
            </div>
          </div>
          <div class="col-md-6 d-flex">
            <div class="form-group">
              <label class="form-label">Photo List</label><br />
              <span
                v-for="photo in photos"
                :key="photo"
                @click="removePhoto(photo)"
                class="photo"
                >{{ photo }}</span
              >
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <button class="new-button">Create project</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { INDUSTRY, STATUS, SKILLS, TAGS } from "../constants/constants";

import { newProject } from "../utils/apiService";

import SkillCheckbox from "../components/SkillCheckbox";
import TagCheckbox from "../components/TagCheckbox";

import { required, url } from "vuelidate/lib/validators";

export default {
  components: { SkillCheckbox, TagCheckbox },
  data() {
    return {
      name: "",
      title: "",
      description: "",
      availableStatus: STATUS,
      status: "Founding",
      availableProjectTypes: INDUSTRY,
      type: "Web development",
      availableSkills: SKILLS,
      projectSkills: [],
      availableTags: TAGS,
      projectTags: [],
      externalUrl: "",
      backgroundUrl: "",
      photos: [],
      newPhotoUrl: "",
    };
  },
  // vuelidator
  validations: {
    title: { required },
    description: { required },
    externalUrl: { url },
    backgroundUrl: { url },
    newPhotoUrl: { url },
    projectSkills: { required },
    projectTags: { required },
  },
  mounted() {
    this.availableSkills = this.availableSkills.map((x) => ({
      name: x.name,
      industry: x.industry,
      hasSkill: false,
    }));

    this.availableTags = this.availableTags.map((x) => ({
      name: x.name,
      industry: x.industry,
      hasTag: false,
    }));
  },
  methods: {
    async addProject() {
      if (!this.$v.$invalid) {
        const project = {
          userId: this.$store.getters.userId,
          projectTitle: this.title,
          projectDescription: this.description,
          projectProgress: this.status.toUpperCase().replace(" ", "_"),
          projectType: this.type.toUpperCase().replace(" ", "_"),
          projectSkills: this.projectSkills,
          projectTags: this.projectTags,
          externalUrl: this.externalUrl,
          projectBackgroundPhoto: this.backgroundUrl,
          projectPhotos: this.photos,
        };

        let res = await newProject(project);
        console.log(res);

        // axios
        //   .post(API_URL + "/projects/2", {
        //     projectTitle: this.title,
        //     projectDescription: this.description,
        //     projectProgress: this.status.toUpperCase().replace(" ", "_"),
        //     projectType: this.type.toUpperCase().replace(" ", "_"),
        //     projectSkills: this.projectSkills,
        //     projectTags: this.projectTags,
        //     externalUrl: this.externalUrl,
        //     projectBackgroundPhoto: this.backgroundUrl,
        //     projectPhotos: this.photos,
        //   })
        //   .then((res) => {
        //     console.log(res);
        //     alert("Project created successfully");
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //     alert("Project not created");
        //   });
      } else {
        alert("Please fill the form correctly.");
      }
    },
    updateSkills(e) {
      this.availableSkills.forEach((skill) => {
        if (skill.name === e.name) skill.hasSkill = e.hasSkill;
      });

      this.availableSkills.forEach((skill) => {
        if (
          skill.hasSkill === true &&
          !this.projectSkills.includes(skill.name)
        ) {
          this.projectSkills.push(skill.name);
        }
        if (
          skill.hasSkill === false &&
          this.projectSkills.includes(skill.name)
        ) {
          this.projectSkills = this.projectSkills.filter(
            (x) => x !== skill.name
          );
        }
      });
    },
    updateProjectTags(e) {
      this.availableTags.forEach((tag) => {
        if (tag.name === e.name) tag.hasTag = e.hasTag;
      });

      this.availableTags.forEach((tag) => {
        if (tag.hasTag === true && !this.projectTags.includes(tag.name)) {
          this.projectTags.push(tag.name);
        }
        if (tag.hasTag === false && this.projectTags.includes(tag.name)) {
          this.projectTags = this.projectTags.filter((x) => x !== tag.name);
        }
      });
    },
    onProjectIndustryChange() {
      this.availableSkills.forEach((skill) => {
        if (skill.hasSkill === true) skill.hasSkill = false;
      });
      this.projectSkills = [];

      this.availableTags.forEach((tag) => {
        if (tag.hasTag === true) tag.hasTag = false;
      });
      this.projectTags = [];
    },
    addPhoto() {
      if (
        !this.photos.includes(this.newPhotoUrl) &&
        !this.$v.newPhotoUrl.$invalid &&
        this.newPhotoUrl !== ""
      ) {
        this.photos.push(this.newPhotoUrl);
        this.newPhotoUrl = "";
      }
    },
    removePhoto(photo) {
      this.photos = this.photos.filter((x) => x !== photo);
    },
  },
};
</script>

<style scoped>
.card {
  width: 90%;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.page-title {
  text-align: center;
}

.card-title {
  letter-spacing: 0.25em;
}

form {
  width: 100%;
}
.form-group {
  padding: 15px 0 0;
}

.form-group--error label {
  color: red;
}

.form-field {
  width: 100%;
  border: 0;
  border-bottom: 1px solid #9b9b9b;
  outline: 0;
  color: black;
  padding: 7px 0;
  background: transparent;
  transition: border-color 0.2s;
}

.form-label {
  color: #9b9b9b;
}

.form-field:focus {
  padding-bottom: 6px;
  border-width: 1px;
  border-image-slice: 1;
}

.select {
  position: relative;
}

.select svg {
  position: absolute;
  right: 12px;
  top: calc(50% - 3px);
  width: 10px;
  height: 6px;
  stroke-width: 2px;
  stroke: #9098a9;
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  pointer-events: none;
}

.select select {
  -webkit-appearance: none;
  padding: 7px 40px 7px 12px;
  width: 100%;
  border: 1px solid #e8eaed;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 1px 3px -2px #9098a9;
  cursor: pointer;
  font-family: inherit;
  font-size: 16px;
  transition: all 150ms ease;
}

.select select:required:invalid {
  color: #5a667f;
}

.select select option {
  color: #223254;
}

.select select option[value=""][disabled] {
  display: none;
}

.select select:focus {
  outline: none;
  border-color: #07f;
  box-shadow: 0 0 0 2px rgba(0, 119, 255, 0.2);
}

.select select:hover + svg {
  stroke: #07f;
}

.sprites {
  position: absolute;
  width: 0;
  height: 0;
  pointer-events: none;
  user-select: none;
}

.add-photo {
  display: flex;
}

.add-button {
  align-self: flex-end;
}

.fa-plus {
  margin-left: 1em;
  color: grey;
}

.add-button:hover {
  cursor: pointer;
}

.new-button {
  background-color: #07f;
  border: none;
  color: white;
  padding: 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: 4px 2px;
  border-radius: 5px;
  cursor: pointer;
  margin: 2em;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
}

.new-button:hover {
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
}

.photo {
  display: inline-flex;
  flex-wrap: wrap;
  align-self: flex-end;
  background-color: lightgray;
  border-radius: 10px;
  margin-right: 1em;
  margin-bottom: 0.5em;
  padding: 0.25em;
  color: white;
}

.photo:hover {
  cursor: pointer;
  background-color: grey;
}

.error {
  font-size: 0.75em;
  color: red;
}
</style>