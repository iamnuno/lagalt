<template>
  <div class="m-5">
    <div class="container card">
      <div class="row mt-4 p-3">
        <div class="col-12">
          <span class="card-title">Admin Area</span>
          <hr />
        </div>
      </div>

      <form action="" @submit.prevent="updateProject">
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
        <div class="row p-3">
          <!-- Announcements -->
          <div class="col-md-12">
            <div class="form-group">
              <label class="form-label">Announcements</label><br />
              <div v-if="announcements.length">
                <div class="table-responsive">
                  <table class="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col" class="text-muted">Title</th>
                        <th scope="col" class="text-muted">Text</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="announcement in $v.announcements.$each.$iter"
                        :key="announcement.id.$model"
                      >
                        <td>
                          <input
                            class="form-field-no-border"
                            type="text"
                            @input="
                              updateAnnouncementUpdatedAt(
                                announcement.id.$model
                              )
                            "
                            v-model.trim="announcement.title.$model"
                          />
                          <div
                            class="error"
                            v-if="!announcement.title.required"
                          >
                            Title is required
                          </div>
                        </td>
                        <td>
                          <input
                            class="form-field-no-border"
                            type="text"
                            @input="
                              updateAnnouncementUpdatedAt(
                                announcement.id.$model
                              )
                            "
                            v-model.trim="announcement.text.$model"
                          />
                          <div class="error" v-if="!announcement.text.required">
                            Text is required
                          </div>
                        </td>
                        <td>
                          <div v-if="!announcement.isDelete.$model">
                            <span
                              @click="
                                deleteAnnouncement(announcement.id.$model)
                              "
                              >Delete</span
                            >
                          </div>
                          <div v-else><i>Set for deletion...</i></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div v-else>No announcements yet</div>
            </div>
          </div>
        </div>
        <!-- New Announcement -->
        <div class="row p-3">
          <div class="col-md-12">
            <label class="form-label">New Announcement</label>
          </div>
          <div class="col-md-6">
            <div
              class="form-group"
              :class="{ 'form-group--error': newAnnouncement.titleError }"
            >
              <label class="form-label">Title</label>
              <input
                class="form-field"
                type="text"
                placeholder="Title..."
                v-model.trim="newAnnouncement.title"
              />
            </div>
            <div v-if="newAnnouncement.titleError" class="error">
              Field required
            </div>
          </div>
          <div class="col-md-6">
            <div
              class="form-group"
              :class="{ 'form-group--error': newAnnouncement.textError }"
            >
              <label class="form-label">Text</label>
              <div class="add-announcement">
                <input
                  class="form-field"
                  type="text"
                  placeholder="Text..."
                  v-model.trim="newAnnouncement.text"
                />
                <font-awesome-icon
                  :icon="['fas', 'plus']"
                  size="1x"
                  @click="addAnnouncement"
                  class="add-button"
                />
              </div>

              <div v-if="newAnnouncement.textError" class="error">
                Field required
              </div>
            </div>
          </div>
        </div>
        <div class="row p-3">
          <div class="col-md-12">
            <!-- Messages -->
            <div class="form-group">
              <label class="form-label">Messages</label><br />
              <div v-if="messages.length">
                <div class="table-responsive">
                  <table class="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col" class="text-muted">Title</th>
                        <th scope="col" class="text-muted">Text</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="message in $v.messages.$each.$iter"
                        :key="message.id.$model"
                      >
                        <td>
                          <input
                            class="form-field-no-border"
                            type="text"
                            @input="updateMessageUpdatedAt(message.id.$model)"
                            v-model.trim="message.title.$model"
                          />
                          <div class="error" v-if="!message.title.required">
                            Title is required
                          </div>
                        </td>
                        <td>
                          <input
                            class="form-field-no-border"
                            type="text"
                            @input="updateMessageUpdatedAt(message.id.$model)"
                            v-model.trim="message.text.$model"
                          />
                          <div class="error" v-if="!message.text.required">
                            Text is required
                          </div>
                        </td>
                        <td>
                          <div v-if="!message.isDelete.$model">
                            <span @click="deleteMessage(message.id.$model)"
                              >Delete</span
                            >
                          </div>
                          <div v-else><i>Set for deletion...</i></div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div v-else>No messages yet</div>
            </div>
          </div>
        </div>
        <div class="row p-3">
          <div class="col-md-12">
            <!-- Project applications -->
            <div class="form-group">
              <label class="form-label">Project Applications</label><br />
              <div v-if="applications.length">
                <div class="table-responsive">
                  <table class="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col" class="text-muted">Username</th>
                        <th scope="col" class="text-muted">Motivation</th>
                        <th scope="col" class="text-muted">Skills</th>
                        <th scope="col" class="text-muted">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        v-for="application in applications"
                        :key="application.id.userId"
                      >
                        <td>
                          {{ application.name }}
                        </td>
                        <td>
                          {{ application.motivation }}
                        </td>
                        <td>
                          <div v-if="application.skills.length">
                            <div
                              v-for="skill in application.skills"
                              :key="skill"
                            >
                              {{ skill }}
                            </div>
                          </div>
                          <div v-else>No skills...</div>
                        </td>
                        <td>
                          {{ application.status }}
                        </td>
                        <td @click="approveApplication(application.id)">
                          Approve
                        </td>
                        <td @click="rejectApplication(application.id)">
                          Reject
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div v-else>No applications</div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-center">
          <button class="new-button">Update project</button>
        </div>
      </form>
    </div>
    <!-- modal -->
    <b-modal ok-only id="alert" :title="alertTitle">
      <p class="my-4">{{ alertText }}</p>
    </b-modal>
  </div>
</template>

<script>
import axios from "axios";
import { required, url } from "vuelidate/lib/validators";
import {
  BASE_API_URL,
  API_URL,
  STATUS,
  INDUSTRY,
  SKILLS,
  TAGS,
} from "../constants/constants";
import SkillCheckbox from "../components/SkillCheckbox";
import TagCheckbox from "../components/TagCheckbox";

export default {
  components: { SkillCheckbox, TagCheckbox },
  data() {
    return {
      projectId: this.$route.params.id,
      userId: this.$store.getters.userId,
      announcements: [],
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
      messages: [],
      applications: [],
      newAnnouncement: {
        title: "",
        text: "",
        titleError: false,
        textError: false,
      },
      alertText: "",
      alertTitle: "",
    };
  },
  validations: {
    title: { required },
    description: { required },
    externalUrl: { url },
    backgroundUrl: { url },
    newPhotoUrl: { url },
    projectSkills: { required },
    projectTags: { required },
    messages: {
      $each: {
        id: {},
        isDelete: {},
        title: { required },
        text: { required },
      },
    },
    announcements: {
      $each: {
        id: {},
        isDelete: {},
        title: { required },
        text: { required },
      },
    },
  },
  mounted() {
    // fetch project details for displaying
    this.getProjectDetails();

    // add additional hasSkill boolean
    // it will keep track of which skills needs to be added to the projectSkills array
    this.availableSkills = this.availableSkills.map((x) => ({
      name: x.name,
      industry: x.industry,
      hasSkill: false,
    }));

    // add additional hasTag boolean
    // it will keep track of which tags needs to be added to the projectTags array
    this.availableTags = this.availableTags.map((x) => ({
      name: x.name,
      industry: x.industry,
      hasTag: false,
    }));
  },
  methods: {
    // using custom validation instead of Vuelidator
    addAnnouncement() {
      if (this.newAnnouncement.title === "") {
        this.newAnnouncement.titleError = true;
      } else {
        this.newAnnouncement.titleError = false;
      }
      if (this.newAnnouncement.text === "") {
        this.newAnnouncement.textError = true;
      } else {
        this.newAnnouncement.textError = false;
      }

      if (!this.newAnnouncement.titleError && !this.newAnnouncement.textError) {
        this.announcements.push({
          title: this.newAnnouncement.title,
          text: this.newAnnouncement.text,
          isCreate: true, // used to track which announcements are new
        });
      }
    },
    // on input change update updatedAt
    updateAnnouncementUpdatedAt(announcementId) {
      this.announcements.forEach((announcement) => {
        if (announcement.id === announcementId) {
          announcement.updatedAt = new Date().getTime();
        }
      });
    },
    // set an announcement to be deleted on project update
    deleteAnnouncement(announcementId) {
      this.announcements.forEach((announcement) => {
        if (announcement.id === announcementId) {
          announcement.isDelete = true;
        } else {
          announcement.isDelete = false;
        }
      });
    },
    // on input change update updatedAt
    updateMessageUpdatedAt(messageId) {
      this.messages.forEach((msg) => {
        if (msg.id === messageId) {
          msg.updatedAt = new Date().getTime();
        }
      });
    },
    // set a message to be deleted on project update
    deleteMessage(messageId) {
      this.messages.forEach((msg) => {
        if (msg.id === messageId) {
          msg.isDelete = true;
        } else {
          msg.isDelete = false;
        }
      });
    },
    updateProject() {
      // if it passes Vuelidator validation
      if (!this.$v.$invalid) {
        axios
          .put(
            BASE_API_URL + API_URL + `/projects/${this.projectId}`,
            {
              projectTitle: this.title,
              projectProgress: this.status.toUpperCase().replace(" ", "_"),
              projectType: this.type.toUpperCase().replace(" ", "_"),
              projectDescription: this.description,
              externalUrl: this.externalUrl,
              projectBackgroundPhoto: this.backgroundUrl,
              projectPhotos: this.photos,
              projectSkills: this.projectSkills,
              projectTags: this.projectTags,
            },
            {
              headers: {
                Authorization: "Bearer " + this.$store.getters.jwt,
              },
            }
          )
          .then(() => {
            this.messages.forEach((message) => {
              // delete messages
              if (message.isDelete === true) {
                axios.delete(API_URL + `/project-cards/${message.id}`);
                // do not show the message anymore
                this.messages = this.messages.filter(
                  (msg) => msg.id !== message.id
                );
              } else {
                // update messages
                axios
                  .put(
                    BASE_API_URL + API_URL + `/project-cards/${message.id}`,
                    {
                      projectCardTitle: message.title,
                      projectCardText: message.text,
                      projectCardCreatedAt: message.createdAt,
                      projectCardUpdatedAt: message.updatedAt,
                    },
                    {
                      headers: {
                        Authorization: "Bearer " + this.$store.getters.jwt,
                      },
                    }
                  )
                  .then(() => {})
                  .catch((error) => console.log(error));
              }
            });

            // update delete create announcement
            this.announcements.forEach((announcement) => {
              // delete announcement
              if (announcement.isDelete === true) {
                axios.delete(
                  BASE_API_URL + API_URL + `/announcements/${announcement.id}`,
                  {
                    headers: {
                      Authorization: "Bearer " + this.$store.getters.jwt,
                    },
                  }
                );
                // do not show the announcement anymore
                this.announcements = this.announcements.filter(
                  (a) => a.id !== announcement.id
                );
              } else if (announcement.isCreate == true) {
                // add new announcement
                axios
                  .post(
                    BASE_API_URL + API_URL + `/announcements`,
                    {
                      announcementTitle: announcement.title,
                      announcementText: announcement.text,
                      announcementCreatedAt: new Date().getTime(),
                      announcementUpdatedAt: new Date().getTime(),
                      project: { projectId: this.projectId },
                    },
                    {
                      headers: {
                        Authorization: "Bearer " + this.$store.getters.jwt,
                      },
                    }
                  )
                  .then(() => {})
                  .catch((error) => console.log(error));
              } else {
                // update announcement
                axios
                  .put(
                    BASE_API_URL +
                      API_URL +
                      `/announcements/${announcement.id}`,
                    {
                      announcementTitle: announcement.title,
                      announcementText: announcement.text,
                      announcementCreatedAt: announcement.createdAt,
                      announcementUpdatedAt: announcement.updatedAt,
                    },
                    {
                      headers: {
                        Authorization: "Bearer " + this.$store.getters.jwt,
                      },
                    }
                  )
                  .then(() => {})
                  .catch((error) => console.log(error));
              }

              // update access to project
              this.applications.forEach((application) => {
                axios
                  .put(
                    BASE_API_URL +
                      API_URL +
                      `/users-projects/${application.id.userId}/${application.id.projectId}`,
                    {
                      approvalStatus: application.status,
                      motivation: application.motivation,
                    },
                    {
                      headers: {
                        Authorization: "Bearer " + this.$store.getters.jwt,
                      },
                    }
                  )
                  .then(() => {})
                  .catch((error) => console.log(error));
              });
            });
            this.alertTitle = "Confirmation";
            this.alertText = "Project updated successfully";
            this.$bvModal.show("alert");
          })
          .catch((error) => {
            console.log(error);
            this.alertTitle = "Error";
            this.alertText = "Project not updated";
            this.$bvModal.show("alert");
          });
      } else {
        this.alertTitle = "Error";
        this.alertText = "Please fill in data correctly";
        this.$bvModal.show("alert");
      }
    },
    approveApplication(applicationId) {
      this.applications.forEach((application) => {
        if (
          application.id.projectId === applicationId.projectId &&
          application.id.userId === applicationId.userId
        ) {
          application.status = "APPROVED";
        }
      });
    },
    rejectApplication(applicationId) {
      this.applications.forEach((application) => {
        if (
          application.id.projectId === applicationId.projectId &&
          application.id.userId === applicationId.userId
        ) {
          application.status = "REJECTED";
        }
      });
    },
    getProjectDetails() {
      axios
        .get(BASE_API_URL + API_URL + `/projects/${this.projectId}`, {
          headers: {
            Authorization: "Bearer " + this.$store.getters.jwt,
          },
        })
        .then((res) => {
          this.title = res.data.projectTitle;
          this.description = res.data.projectDescription;
          this.getAnnouncements(res.data.announcements);
          this.getProgress(res.data.projectProgress);
          this.getType(res.data.projectType);
          this.externalUrl = res.data.externalUrl;
          this.backgroundUrl = res.data.projectBackgroundPhoto;

          this.projectSkills = res.data.projectSkills;
          // checkboxes need to be checked for skills project has
          this.availableSkills.forEach((skill) => {
            if (this.projectSkills.includes(skill.name)) skill.hasSkill = true;
          });

          this.projectTags = res.data.projectTags;
          // checkboxes need to be checked for skills project has
          this.availableTags.forEach((tag) => {
            if (this.projectTags.includes(tag.name)) tag.hasTag = true;
          });

          this.photos = res.data.projectPhotos;
          this.getMessages(res.data.projectCards);
          this.getApplications(res.data.projectUsers);
        })
        .catch((error) => console.log(error));
    },
    getMessages(projectCards) {
      projectCards.forEach((url) => {
        let projectCardId = url.substring(url.lastIndexOf("/") + 1);

        axios
          .get(BASE_API_URL + API_URL + `/project-cards/${projectCardId}`, {
            headers: {
              Authorization: "Bearer " + this.$store.getters.jwt,
            },
          })
          .then((res) => {
            let id = res.data.projectCardId;
            let title = res.data.projectCardTitle;
            let text = res.data.projectCardText;
            let createdAt = res.data.projectCardCreatedAt;
            let updatedAt = res.data.projectCardUpdatedAt;

            this.messages.push({
              id,
              title,
              text,
              createdAt,
              updatedAt,
              isDelete: false,
              isCreate: false,
            });
          })
          .catch((error) => console.log(error));
      });
    },
    getApplications(projectUsersURLs) {
      projectUsersURLs.forEach((url) => {
        let userId = url.substring(url.lastIndexOf("/") + 1);

        axios
          .get(
            BASE_API_URL +
              API_URL +
              `/users-projects/${userId}/${this.projectId}`,
            {
              headers: {
                Authorization: "Bearer " + this.$store.getters.jwt,
              },
            }
          )
          .then((res) => {
            let status = res.data.approvalStatus;
            let motivation = "";
            let skills = [];
            let name = "";

            motivation = res.data.motivation;
            axios
              .get(BASE_API_URL + API_URL + `/users/${userId}`, {
                headers: {
                  Authorization: "Bearer " + this.$store.getters.jwt,
                },
              })
              .then((res) => {
                skills = res.data.userSkills;
                name = res.data.userName;

                this.applications.push({
                  id: { userId, projectId: this.projectId },
                  name: name,
                  status: status,
                  motivation: motivation,
                  skills: skills,
                });
              })
              .catch((error) => console.log(error));
          })
          .catch((error) => console.log(error));
      });
    },
    getAnnouncements(announcementsURLs) {
      announcementsURLs.forEach((url) => {
        let announcementId = url.substring(url.lastIndexOf("/") + 1);
        axios
          .get(BASE_API_URL + API_URL + `/announcements/${announcementId}`, {
            headers: {
              Authorization: "Bearer " + this.$store.getters.jwt,
            },
          })
          .then((res) => {
            let id = res.data.announcementId;
            let title = res.data.announcementTitle;
            let text = res.data.announcementText;
            let createdAt = res.data.announcementCreatedAt;
            let updatedAt = res.data.announementUpdatedAt;
            this.announcements.push({
              id,
              title,
              text,
              createdAt,
              updatedAt,
              isDelete: false,
            });
          })
          .catch((error) => console.log(error));
      });
    },
    getProgress(progress) {
      switch (progress) {
        case "IN_PROGRESS":
          this.status = "In progress";
          break;
        case "STALLED":
          this.status = "Stalled";
          break;
        case "COMPLETED":
          this.status = "Completed";
          break;
        default:
          this.status = "Founding";
      }
    },
    getType(type) {
      switch (type) {
        case "WEB_DEVELOPMENT":
          this.type = "Web development";
          break;
        case "GAME_DEVELOPMENT":
          this.type = "Game development";
          break;
        case "MUSIC":
          this.type = "Music";
          break;
        default:
          this.type = "Film";
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
    showHideMessageModal() {
      console.log("click");
      this.showModal = !this.showModal;
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

.form-field-no-border {
  width: 100%;
  border: 0;
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

.add-announcement {
  display: flex;
}
</style>