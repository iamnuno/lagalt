<template>
  <div class="d-flex flex-row flex-grow-1">
    <!-- announcements -->
    <div class="color w-25 d-flex flex-column align-content-center">
      <div class="py-4 h3 text-center mx-2 text-truncate">Announcements</div>
      <!-- card -->
      <div>
        <ProjectCard
          v-for="announcement in announcements"
          :key="announcement.id"
          :data="announcement"
        />
      </div>
    </div>

    <!-- body -->
    <div class="flex-grow-1 w-100 d-flex flex-column">
      <div
        id="title"
        class="bg-light rounded shadow-lg p-2 w-1 h5 position-absolute m-3 no-pointer text-capitalize"
      >
        {{ title }}
      </div>
      <div class="img" />
      <div id="status" class="d-flex flex-row justify-content-between p-2 mx-4">
        <div class="in-progress no-pointer text-white rounded shadow p-1">
          {{ status }}
        </div>
        <!-- SPACE -->
        <div class="flex-grow-1" />
        <NewApplicationModal v-if="!isCreator" />
        <div
          v-if="isCreator"
          class="pointer rounded bg-dark text-white shadow p-1 bttn"
          @click="toAdminView()"
        >
          Admin View
        </div>
      </div>
      <div class="breakline mx-2" />
      <div class="d-flex flex-column m-2">
        <div
          id="tags"
          class="d-flex flex-row flex-wrap bg-light rounded shadow"
        >
          <div
            class="d-flex flex-column justify-content-center bg-dark text-white rounded-left px-2 no-pointer"
          >
            Tags
          </div>
          <div
            v-for="(tag, index) in tags"
            :key="index"
            class="p-1 m-1 text-center rounded shadow bg-warning text-white no-pointer"
          >
            {{ tag }}
          </div>
        </div>
        <div
          id="skills"
          class="d-flex flex-row flex-wrap bg-light rounded shadow my-1"
        >
          <div
            class="d-flex flex-column justify-content-center bg-dark text-white rounded-left pl-1 pr-2 no-pointer"
          >
            Skills
          </div>
          <div
            v-for="(skill, index) in skills"
            :key="index"
            class="p-1 m-1 text-center rounded shadow bg-warning text-white no-pointer"
          >
            {{ skill }}
          </div>
        </div>
      </div>
      <div class="breakline mx-2" />
      <!-- PROJECT CARDS -->
      <div class="h3 mx-2 mb-1">Messages</div>
      <div id="projectcards" class="d-flex flex-row flex-wrap">
        <!-- TODO: FETCH PROJECT CARDS INSTEAD OF ANNOUNCEMENTS WHEN THE ENDPOINTS ARE READY -->
        <ProjectCard
          v-for="announcement in announcements"
          :key="announcement.id"
          :data="announcement"
        />
        <div class="m-2">
          <NewProjectCardModal />
        </div>
      </div>
      <div class="breakline mx-2" />
      <!-- COLLABORATORS LIST -->
      <div class="d-flex flex-row">
        <div
          v-if="collaborators.length !== 0"
          id="collaborators"
          class="bg-white shadow rounded d-flex flex-column w-25 m-2"
        >
          <div class="h4 text-center p-1 text-truncate mb-1">Collaborators</div>
          <div class="breakline mx-2" />
          <UserCard
            v-for="(collaborator, index) in collaborators"
            :key="index"
            :name="collaborator.name"
          />
        </div>
        <!-- PHOTOS -->
        <div class="flex-grow-1 d-flex flex-column">
          <div id="photo-container" class="bg-light shadow rounded m-2">
            <div class="h4 p-1 text-center">Gallery</div>
            <div class="breakline mx-2 mb-2" />
            <!-- show images -->
            <ImageModal
              v-for="(photo, index) in photos"
              :key="index"
              :photo="photo"
              class="m-2"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="color w-25 d-flex flex-column align-content-center">
      <div class="py-4 h3 text-center">Git repository</div>
      <div v-if="isCommits">
        <CommitCard
          v-for="(commit, index) in commits"
          :key="index"
          :commit="commit"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CommitCard from "../components/CommitCard.vue";
import ImageModal from "../components/ImageModal.vue";
import NewApplicationModal from "../components/NewApplicationModal.vue";
import NewProjectCardModal from "../components/NewProjectCardModal.vue";
import ProjectCard from "../components/ProjectCard";
import UserCard from "../components/UserCard.vue";

export default {
  name: "project-user-view",
  data() {
    return {
      id: --this.$route.params.id,
      announcements: [],
      projects: [],
      commits: [],
      collaborators: [],
      tags: [],
      skills: [],
      photos: [],
      status: "in progress",
      title: "",
      isCreator: true,
    };
  },
  components: {
    ProjectCard,
    CommitCard,
    NewProjectCardModal,
    NewApplicationModal,
    UserCard,
    ImageModal,
  },
  created: async function () {
    // TODO: UPDATE isCreator IF THE VIEWER HAS CREATED THE SELECTED PROJECT
    await fetch("http://localhost:3000/projects")
      .then((res) => res.json())
      .then((data) => (this.projects = data))
      .catch((err) => console.log(err));

    await fetch(this.projects[this.id].repo)
      .then((res) => res.json())
      .then((data) => (this.commits = data))
      .catch((err) => console.log(err));
    this.announcements = this.projects[this.id].announcements;
    this.title = this.projects[this.id].name;

    this.collaborators = [
      { name: "ahmad" },
      { name: "numo" },
      { name: "ahmad" },
      { name: "numo" },
      { name: "ahmad" },
      { name: "numo" },
      { name: "ahmad" },
      { name: "numo" },
      { name: "ahmad" },
      { name: "numo" },
      { name: "ahmad" },
      { name: "numo" },
      { name: "ahmad" },
      { name: "numo" },
      { name: "ahmad" },
      { name: "numo" },
      { name: "ahmad" },
      { name: "numo" },
      { name: "ahmad" },
      { name: "numo" },
      { name: "ahmad" },
      { name: "numo" },
    ];
    this.tags = this.projects[this.id].tags;
    this.skills = this.projects[this.id].skills;
    this.photos = this.projects[this.id].photos;
  },
  computed: {
    isAnnouncements() {
      return this.projects.length != 0;
    },
    isCommits() {
      return this.commits.length > 1;
    },
  },
  methods: {
    toAdminView() {
      let id = this.id;
      this.$$route.push({ name: "admin", props: id });
    },
  },
};
</script>

<style>
.color {
  background-color: rgba(185, 185, 185, 0.219);
}

.title-container {
  position: relative;
}

.img {
  height: 200px;
  background-size: cover;
  background-image: url("https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1366&q=80");
  background-repeat: no-repeat;
}
.in-progress {
  background-color: rgba(83, 190, 128, 0.5);
}

.breakline {
  background-color: rgba(119, 119, 119, 0.418);
  padding-top: 1px;
  margin-top: 1px;
}

.no-pointer {
  cursor: default !important;
}

.bttn:hover {
  box-shadow: 0 0 11px rgba(0, 0, 0, 0.486) !important;
  transition: box-shadow 0.1s linear;
}
</style>
