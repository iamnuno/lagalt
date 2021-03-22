<template>
  <div class=" d-flex flex-row p-3 bg-info text-white shadow">
    <div>
    <h3 >{{ title }}</h3>
    </div>
    <div class=" d-flex flex-column justify-content-center flex-grow-1 ml-4">
      <!-- navbar buttons -->
      <div class="d-flex flex-row">
      <a class="button text-white">Home</a>
      </div>
    </div>
    <div  class="d-flex flex-column justify-content-center">
    <div v-if="isLoggedIn" >Login</div>

      <!-- profile -->
      <div id="profile-container" class="d-flex flex-row profile-container">
        <div class="d-flex flex-column">
          <div class="bg-light text-dark my-1 px-2 rounded-pill username shadow">
            {{ username }}
          </div>
        </div>
        <div class="d-flex flex-column icon shadow-sm  rounded-circle">
        <font-awesome-icon :icon="['fas', 'user-circle']" size="2x" />
        </div>

        <div class="dropdown-container d-none flex-column position-absolute bg-white rounded shadow">
          <div class="d-block dropdown-item text-dark rounded text-center mb-1" @click="toProfile" >Profile</div>
          <div class="d-block dropdown-item text-dark rounded text-center mb-1" @click="logout" >Log Out</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data(){
    return{
      title: "Lagalt",
      isLoggedIn: false,
      username: "Ahmad",
    }
  },
  methods:{
    logout(){
      alert("logout")
    },
    toProfile() {
      alert("profile")
    }
  }
};
</script>

<style scoped>

.button:hover,
.profile-container:hover,
.dropdown-item:hover{
  cursor: pointer;
}
.button:hover {
  color: rgb(0, 0, 0) !important;
  text-decoration: none;
}


.username{
  right: -9px;
  position: relative;
}
.icon {
  z-index: 1;
}

.profile-container:hover .dropdown-container {
  display: flex !important;
}

.dropdown-container .dropdown-item:hover {
  background-color: #ddd;
}

.dropdown-container {
  margin-top: 33px;
  font-size: 12px;
  padding: 9px 5px 5px;
  min-width: 100px;
  z-index: 1;
}

.dropdown-item {
  background-color: lightgray;
  text-decoration: none;
}

</style>
