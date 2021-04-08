<template>
  <div class="d-flex flex-row flex-grow-1">
    <!-- announcements -->
    <div
      v-if="showAnnouncements && isCollaborator"
      class="color w-25 d-flex flex-column align-content-center"
    >
      <div class="py-4 h3 text-center mx-2 text-truncate">Announcements</div>
      <!-- card -->
      <div>
        <ProjectCard
          v-for="announcement in announcements"
          :key="announcement.announcementId"
          :data="{
            title: announcement.announcementTitle,
            text: announcement.announcementText,
            date: announcement.announcementCreatedAt,
          }"
        />
      </div>
    </div>
    <!-- body -->
    <div class="flex-grow-1 w-100 d-flex flex-column">
      <div
        id="title"
        class="bg-light rounded shadow-lg p-2 w-1 h5 position-absolute m-3 no-pointer text-capitalize"
      >
        {{ project.projectTitle }}
      </div>
      <div ref="photo" class="img" />
      <div id="status" class="d-flex flex-row justify-content-between p-2 mx-4">
        <div
          class="in-progress no-pointer text-white rounded shadow p-1 text-capitalize"
        >
          {{ status }}
        </div>
        <div
          class="mx-1 in-progress no-pointer text-white rounded shadow p-1 text-capitalize"
        >
          {{ progress }}
        </div>
        <!-- SPACE -->
        <div class="flex-grow-1" v-if="isAuthorized" />
        <NewApplicationModal v-if="!isAdmin" :projectId="this.id" />
        <router-link
          v-if="isAdmin"
          class="pointer rounded bg-dark text-white shadow p-1 bttn"
          :to="{ name: 'ProjectAdminView', id: id }"
        >
          Admin View
        </router-link>
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
            v-for="(tag, index) in project.projectTags"
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
            v-for="(skill, index) in project.projectSkills"
            :key="index"
            class="p-1 m-1 text-center rounded shadow bg-warning text-white no-pointer"
          >
            {{ skill }}
          </div>
        </div>
      </div>
      <div class="breakline mx-2" />
      <!-- PROJECT CARDS -->
      <div v-if="isCollaborator">
        <div class="h3 mx-2 mb-1">Messages</div>
        <div id="projectcards" class="d-flex flex-row flex-wrap">
          <ProjectCard
            v-for="projectCard in cards"
            :key="projectCard.projectCardId"
            :data="{
              title: projectCard.projectCardTitle,
              text: projectCard.projectCardText,
              date: projectCard.projectCardCreatedAt,
            }"
          />
          <div class="m-2">
            <NewProjectCardModal
              :projectId="id"
              @updateProjectCards="updateProjectCards"
            />
          </div>
        </div>
      </div>
      <div class="breakline mx-2" />
      <!-- COLLABORATORS LIST -->
      <div class="d-flex flex-lg-row flex-column">
        <!-- PHOTOS -->
        <div class="flex-grow-1 d-flex flex-column flex-grow-1">
          <div id="photo-container" class="bg-light shadow rounded m-2">
            <div class="h4 p-1 text-center">Gallery</div>
            <div class="breakline mx-2 mb-2" />
            <!-- show images -->
            <ImageModal
              v-for="(photo, index) in project.projectPhotos"
              :key="index"
              :photo="photo"
              class="m-2"
            />
            <div
              class="text-center p-3 h5"
              v-if="project.projectPhotos ? project.projectPhotos == 0 : false"
            >
              There are no images yet.
            </div>
          </div>
        </div>
        <div
          v-if="project.projectUsers !== undefined"
          id="collaborators"
          class="bg-white shadow rounded d-flex flex-column w-50 m-2"
        >
          <div class="h4 text-center p-1 text-truncate mb-1">Collaborators</div>
          <div class="breakline mx-2" />
          <div class="scorllable scrollbar m-2 rounded">
            <UserCard
              v-for="collaborator in collaborators"
              :key="collaborator.userId"
              :name="collaborator.userName"
            />
          </div>
        </div>
      </div>
    </div>

    <div
      class="color w-25 d-flex flex-column align-content-center"
      v-if="commits.length != 0"
    >
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
import { mapState } from "vuex";

import {
  getProjectById,
  getGitCommit,
  getCollaborators,
  isAdmin,
  getAnnouncements,
  getProjectCards,
} from "../utils/apiService";

export default {
  name: "project-user-view",
  data() {
    return {
      id: this.$route.params.id,
      project: {},
      commits: [],
      collaborators: [],
      announcements: [],
      cards: [],
      isAdmin: false,
      isCollaborator: false,
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
  mounted: async function () {
    this.project = await getProjectById(this.id);
    this.project.projectUsers.map(async (e) => {
      this.collaborators.push(await getCollaborators(e));
    });
    this.project.announcements.map(async (e) => {
      this.announcements.push(await getAnnouncements(e));
    });
    this.project.projectCards.map(async (e) => {
      this.cards.push(await getProjectCards(e));
    });

    const user = await isAdmin(this.id);
    if (user) {
      this.isAdmin = user.admin;
      this.isCollaborator = user.approvalStatus == "APPROVED" ? true : false;
    }

    this.commits = await getGitCommit(this.project.externalUrl);
    this.$refs.photo.style.background =
      "url(" + this.project.projectBackgroundPhoto + ")";
  },
  computed: {
    isAnnouncements() {
      return this.project.projectCards.length != 0;
    },
    isCommits() {
      return this.commits != undefined;
    },
    status() {
      if (this.project.projectType != undefined) {
        return this.project.projectType.replaceAll("_", " ").toLowerCase();
      } else {
        return "";
      }
    },
    progress() {
      if (this.project.projectProgress != undefined) {
        return this.project.projectProgress.replaceAll("_", " ").toLowerCase();
      } else {
        return "";
      }
    },
    showAnnouncements() {
      if (this.project.announcements != undefined) {
        if (this.project.announcements.length != 0) return true;
      }
      return false;
    },
    ...mapState(["isAuthorized"]),
  },
  methods: {
    toAdminView() {
      const id = this.id;
      this.$$route.push({ name: "admin", props: id });
    },
    updateProjectCards(card) {
      this.cards.push(card);
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

.scorllable {
  max-height: 300px;
  overflow-y: scroll;
}

.scrollbar::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: #f5f5f5;
  border-radius: 10px;
}

.scrollbar::-webkit-scrollbar {
  width: 12px;
  background-color: #f5f5f5;
}

.scrollbar::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: gray;
}

.scrollbar {
  scrollbar-color: #512da8 #f5f5f5;
}
</style>
