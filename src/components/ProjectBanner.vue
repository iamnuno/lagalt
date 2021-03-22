<template>
  <div class="card" @click="toProjectDetails">
    <div class="row">
      <div class="initials">{{ projectInitials }}</div>
      <div class="name">{{ project.name }}</div>
      <div class="tags">
        <span v-for="tag in project.tags" :key="tag">{{ tag }}</span>
      </div>
      <div class="skills">
        <span
          v-for="skill in project.skills"
          :key="skill"
          :class="{ match_skill: user.skills.includes(skill) }"
          >{{ skill }}</span
        >
      </div>
      <div class="type">{{ project.type }}</div>
    </div>
  </div>
</template>

<script>
export default {
  // TODO: use props instead of hardcoded data
  data() {
    return {
      project: {
        id: 1,
        name: "Lost in Translation",
        tags: ["Translation", "Sign Language", "English"],
        type: "Web development",
        skills: ["Javascript", "Vue", "HTML", "CSS"],
      },
      user: {
        skills: ["Vue", "Javascript", "CSS"],
      },
    };
  },
  computed: {
    projectInitials() {
      let initials = "";

      const nameArray = this.project.name.split(" ");
      initials += nameArray[0][0];
      initials += nameArray[nameArray.length - 1][0];

      return initials.toUpperCase();
    },
  },
  methods: {
    // TODO: implement real routing
    toProjectDetails() {
      alert(`Navigate to project id: ${this.project.id}`);
    },
  },
};
</script>

<style scoped>
.card {
  width: 95%;
  height: 15%;
  margin: 1em;
  font-size: 0.8rem;
  background-color: #fdfffc;
  display: flex;
  justify-content: center;
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
}

.initials {
  margin: auto;
  width: 3em;
  height: 3em;
  background-color: #d1495b;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.name {
  margin: auto;
}

.tags {
  margin: auto;
  display: flex;
  flex-wrap: wrap;
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
  margin: auto;
}

.match_skill {
  background-color: #2ec4b6 !important;
}
</style>