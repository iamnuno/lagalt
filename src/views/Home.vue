<template>
  <div class="flex-grow-1 d-flex flex-column m-5 p-4 rounded shadow">
    <div class="d-flex flex-column mb-5" v-if="isAuthorized">
      <div class="flex-grow-1 text-nowrap h4">My Projects</div>
      <div class="box breakline my-2" />
      <div v-if="userProjects.length != 0">
        <ProjectBanner
          v-for="project in userProjects"
          :key="project.projectId"
          :project="project"
          :user="user"
        />
        <div v-if="userProjects.length == 0" class="text-center">
          You don't have any projects yet.
        </div>
      </div>
    </div>
    <div class="d-flex flex-row flex-wrap">
      <h4 class="flex-grow-1 text-nowrap">Available Projects</h4>
      <div class="break" />
      <!-- filter -->
      <div class="rounded box d-flex flex-row mr-2">
        <div
          id="industry-list"
          class="bg-light rounded px-lg-2 mx-2 my-1 filter-button d-flex flex-lg-row-reverse flex-nowrap"
        >
          <div class="px-2 pointer rounded industry-button">Industry</div>

          <div class="industry-banner">
            <div
              @click="filterByIndustry($event)"
              class="mx-2 pointer rounded item"
            >
              Web development
            </div>
            <div
              @click="filterByIndustry($event)"
              class="mx-2 pointer rounded item"
            >
              Game development
            </div>
            <div
              @click="filterByIndustry($event)"
              class="mx-2 pointer rounded item"
            >
              Film
            </div>
            <div
              @click="filterByIndustry($event)"
              class="mx-2 pointer rounded item"
            >
              Music
            </div>
          </div>
        </div>
        <div
          id="status-list"
          class="bg-light rounded mx-2 my-1 d-flex flex-row-reverse"
        >
          <div class="px-2 pointer rounded status-button">Status</div>

          <div class="status-banner">
            <div
              @click="filterByStatus($event)"
              class="mx-2 pointer rounded item"
            >
              In progress
            </div>
            <div
              @click="filterByStatus($event)"
              class="mx-2 pointer rounded item"
            >
              Stalled
            </div>
            <div
              @click="filterByStatus($event)"
              class="mx-2 pointer rounded item"
            >
              Finished
            </div>
            <div
              @click="filterByStatus($event)"
              class="mx-2 pointer rounded item"
            >
              Founding
            </div>
          </div>
        </div>

        <font-awesome-icon
          :icon="['fas', 'filter']"
          size="1x"
          class="m-2 rounded-circle text-light shadow"
        />
      </div>

      <!-- search -->
      <div class="d-flex flex-row box rounded">
        <!-- TODO: set width to 25% on small screen -->
        <input
          id="search"
          v-model="search"
          type="text"
          placeholder="Search.."
          class="m-1 border-0 rounded"
        />
        <font-awesome-icon
          :icon="['fas', 'search']"
          size="1x"
          class="m-2 rounded-circle text-light shadow pointer"
          @click="searchButton()"
        />
      </div>
    </div>
    <div class="box breakline my-2" />
    <!-- labels -->
    <!-- TODO: realign labels in table instead of using flex -->
    <div id="label" class="d-flex flex-row pt-2 labels ml-5 rounded">
      <div>name</div>
      <div>Tags</div>
      <div class="mr-5">Skills</div>
      <div class="mx-5">Industry</div>
    </div>
    <!-- availableProjects' list goes here -->
    <div v-if="getProjects">
      <ProjectBanner
        v-for="project in getProjects"
        :key="project.projectId"
        :project="project"
        :user="user"
      />
    </div>
    <div
      class="h5 text-center py-5"
      v-if="getProjects ? getProjects.length == 0 : false"
    >
      No result.
    </div>
  </div>
</template>

<script>
import ProjectBanner from "../components/ProjectBanner";
import { mapState } from "vuex";
import {
  getAvailableProjects,
  getUserProjects,
  getUser,
  getRelatedProjectByUser,
} from "../utils/apiService";

export default {
  name: "Home",
  components: { ProjectBanner },
  data() {
    return {
      userProjects: [],
      availableProjects: undefined,
      user: undefined,
      search: null,
    };
  },
  async mounted() {
    if (this.isAuthorized) {
      this.availableProjects = await getRelatedProjectByUser();

      this.user = await getUser();
      this.userProjects = [];
      this.user.userProjects.map(async (e) => {
        const project = await getUserProjects(e);
        if (project.active) {
          this.userProjects.push(project);
        }
      });
    } else {
      this.availableProjects = await getAvailableProjects();
    }
  },
  methods: {
    filterByIndustry: async function (event) {
      this.availableProjects = await getAvailableProjects(
        event.target.innerText,
        ""
      );
    },
    searchButton: async function () {
      this.availableProjects = await getAvailableProjects("", this.search);
    },
    filterByStatus: async function (event) {
      console.log("hi:" + event.target.innerText);
      if (event.target.innerText === "") {
        this.availableProjects = await getAvailableProjects();
      } else {
        this.availableProjects = await getAvailableProjects(
          "",
          "",
          event.target.innerText
        );
      }
    },
  },
  computed: {
    getProjects() {
      return this.availableProjects;
    },
    ...mapState(["isAuthorized"]),
  },
};
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
}

input:focus {
  outline: none;
}

.box {
  background-color: rgba(119, 119, 119, 0.418);
}
.breakline {
  padding-top: 1px;
  margin-top: 1px;
}
.pointer {
  cursor: pointer;
}

.industry-banner,
.status-banner {
  transition-property: width;
  transition-duration: 2s;
  width: 0px;
  display: flex;
  flex-direction: row-reverse;
  overflow: hidden;
}

.status-button:hover + .status-banner,
.status-banner:hover {
  width: 325px;
}

.industry-button:hover + .industry-banner,
.industry-banner:hover {
  width: 400px;
}

.item {
  cursor: pointer;
  z-index: 2;
  white-space: nowrap;
}

.item:hover {
  background-color: lightgray;
}

.active {
  background-color: rgba(119, 119, 119, 0.418);
}

.labels {
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>
