<template>
  <div class="d-flex flex-row flex-grow-1">
    <!-- announcements -->
    <div
      class="ann w-25 d-flex flex-column align-content-center d-none d-print-block"
    >
      <div class="py-4 h3 text-center">Announcements</div>
      <!-- card -->
      <div v-if="projects.length">
        <ProjectCard
          v-for="announcement in projects[--this.$route.params.id]
            .announcements"
          :key="announcement.id"
          :data="announcement"
        />
      </div>
    </div>
    <div class="flex-grow-1 w-100">body</div>
    <div class="ann w-25">Git repository</div>
  </div>
</template>

<script>
import ProjectCard from "../components/ProjectCard";

export default {
  name: "project-user-view",
  data() {
    return {
      announcements: false,
      projects: [],
    };
  },
  components: {
    ProjectCard,
  },
  mounted: function () {
    fetch("http://localhost:3000/projects")
      .then((res) => res.json())
      .then((data) => (this.projects = data))
      .catch((err) => console.log(err));
    console.log(this.projects);
  },
};
</script>

<style>
.ann {
  background-color: gray;
}
</style>
