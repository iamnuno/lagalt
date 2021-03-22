<template>
  <div v-if="projects.length && user" class="content">
    <ProjectBanner
      v-for="project in projects"
      :key="project.id"
      :project="project"
      :user="user"
    />
  </div>
</template>

<script>
import ProjectBanner from "../components/ProjectBanner";
export default {
  name: "Home",
  components: { ProjectBanner },
  data() {
    return {
      projects: [],
      user: null,
    };
  },
  mounted() {
    // TODO use real API calls
    // fetch projects
    fetch("http://localhost:3000/projects")
      .then((res) => res.json())
      .then((data) => (this.projects = data))
      .catch((err) => console.log(err));

    // fetch user
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((data) => (this.user = data))
      .catch((err) => console.log(err));

    console.log(this.projects);
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
</style>