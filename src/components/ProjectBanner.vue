<template>
  <div class="card" @click="toProjectDetails">
    <div class="row flex-nowrap justify-content-center align-items-center">
      <div class="initials">{{ projectInitials }}</div>
      <div class="name">{{ project.projectTitle }}</div>
      <div class="tags">
        <span v-for="tag in project.projectTags" :key="tag">{{ tag }}</span>
      </div>
      <div class="skills" v-if="user != undefined">
        <span
          v-for="skill in project.projectSkills"
          :key="skill"
          :class="{ match_skill: skillMatch(skill) }"
          >{{ skill }}</span
        >
      </div>
      <div class="type text-capitalize">{{ industry }}</div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: ["project", "user"],
  computed: {
    projectInitials() {
      let initials = "";

      const nameArray = this.project.projectTitle.split(" ");
      initials += nameArray[0][0];
      initials += nameArray[nameArray.length - 1][0];

      return initials.toUpperCase();
    },
    industry() {
      return this.project.projectType.replaceAll("_", " ").toLowerCase();
    },
    ...mapState(["isAuthorized"]),
  },
  methods: {
    toProjectDetails() {
      if (this.isAuthorized) {
        const id = this.project.projectId;
        this.$router.push({
          name: "project",
          params: { id },
        });
      }
    },
    skillMatch(skill) {
      return this.$store.getters.isAnonymous
        ? false
        : this.user.userSkills.includes(skill);
    },
  },
};
</script>

<style scoped>
.card {
  margin: 1em;
  font-size: 0.8rem;
  background-color: #fdfffc;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
  border-radius: 10px;
  transition: box-shadow 0.3s;
}

.card:hover {
  cursor: pointer;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}

.row {
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
}

.initials {
  margin: 1em;
  min-width: 3em;
  min-height: 3em;
  background-color: #d1495b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.name {
  margin: auto;
  width: 20%;
}

.tags {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  width: 30%;
}

.tags span {
  background-color: #fcf5c7;
}

.skills span {
  background-color: #d1495b;
}

.skills {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  flex-grow: 1;
}

.skills span {
  background-color: #f25f5c;
}

span {
  margin: 0.25em;
  padding: 0.5em;
  border-radius: 15px;
}

.type {
  margin: 1em;
  margin-right: 2em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.match_skill {
  background-color: #2ec4b6 !important;
}
</style>