<template>
  <div>
    <form action="" @submit="addProject">
      <!-- Project title -->
      <div>
        <label>Project title</label>
        <input type="text" required v-model="title" />
      </div>
      <!-- Project type -->
      <div>
        <label>Project type</label>
        <select v-model="type">
          <option value="Music">Music</option>
          <option value="Film">Film</option>
          <option value="Web Development">Web Development</option>
          <option value="Game Development">Game Development</option>
        </select>
      </div>
      <!-- Project description -->
      <div>
        <label>Project description</label>
        <input type="text" v-model="description" required />
      </div>
      <!-- Project progress -->
      <div>
        <label>Project progress</label>
        <select v-model="progress">
          <option value="Founding">Founding</option>
          <option value="In progress">In progress</option>
          <option value="Stalled">Stalled</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
      <!-- Project skills -->
      <div>
        <label>Project skills</label>
        <input type="text" v-model="newSkill" />
        <button type="button" @click="addSkill">Add skill</button>
        <span
          v-for="skill in skills"
          :key="skill"
          @click="removeSkill(skill)"
          >{{ skill }}</span
        >
        <span v-if="skills.length === 0">No skills added yet</span>
      </div>
      <!-- Project tags -->
      <div>
        <label>Project tags</label>
        <input type="text" v-model="newTag" />
        <button type="button" @click="addTag">Add tag</button>
        <span v-for="tag in tags" :key="tag" @click="removeTag(tag)">{{
          tag
        }}</span>
        <span v-if="tags.length === 0">No tags added yet</span>
      </div>
      <!-- Project external-url -->
      <div>
        <label>External URL</label>
        <input type="text" v-model="externalUrl" />
      </div>
      <!-- Project background-url -->
      <div>
        <label>Background URL</label>
        <input type="text" v-model="backgroundUrl" />
      </div>
      <!-- Project photos -->
      <div>
        <label for="">Photos</label>
        <input type="text" v-model="newPhoto" />
        <button type="button" @click="addPhoto">Add photo</button>
        <span
          v-for="photo in photos"
          :key="photo"
          @click="removePhoto(photo)"
          >{{ photo }}</span
        >
      </div>

      <button>Create project</button>
      <span class="error" :class="{ show_error: error !== '' }">
        {{ error }}</span
      >
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      title: "",
      description: "",
      type: "Music",
      progress: "Founding",
      tags: [],
      newTag: "",
      skills: [],
      newSkill: "",
      externalUrl: "",
      backgroundUrl: "",
      photos: [],
      newPhotoUrl: "",
      error: "",
    };
  },
  methods: {
    addProject(e) {
      e.preventDefault();

      if (this.skills.length === 0) {
        this.error = "You need to add skills!";
      } else if (this.tags.length === 0) {
        this.error = "You need to add tags!";
      } else {
        this.error = "";
      }

      if (this.error == "") {
        alert(
          `Title: ${this.title}\nDescription: ${this.description}\nType: ${this.type}\nProgress: ${this.progress}\nTags: ${this.tags}\nSkills: ${this.skills}\nExternal URL: ${this.externalUrl}\nBackground URL: ${this.backgroundUrl}\nPhotos: ${this.photos}`
        );
        this.skills = [];
        this.tags = [];
      }
    },
    addSkill() {
      if (!this.skills.includes(this.newSkill)) {
        this.skills.push(this.newSkill);
        this.newSkill = "";
      }
    },
    removeSkill(skill) {
      this.skills = this.skills.filter((x) => x !== skill);
    },
    addTag() {
      if (!this.tags.includes(this.newTag)) {
        this.tags.push(this.newTag);
        this.newTag = "";
      }
    },
    removeTag(tag) {
      this.tags = this.tags.filter((x) => x !== tag);
    },
    addPhoto() {
      if (!this.photos.includes(this.newPhoto)) {
        this.photos.push(this.newPhoto);
        this.newPhoto = "";
      }
    },
    removePhoto(photo) {
      this.photos = this.photos.filter((x) => x !== photo);
    },
  },
};
</script>

<style>
.error {
  display: none;
}

.show_error {
  display: inline;
  color: red;
}
</style>