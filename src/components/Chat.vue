<template>
  <div>
    <div
      id="icon"
      class="d-flex justify-content-center algin-item-center rounded-circle bg-success p-3 text-white"
    >
      <font-awesome-icon :icon="['fas', 'comment-alt']" size="2x" />
    </div>
    <div id="chat-container" class="bg-success rounded-lg shadow w-25">
      <div class="d-flex flex-column m-2 p-1 bg-white rounded shadow">
        <div
          ref="items"
          v-for="(project, index) in messeges"
          :key="index"
          class="rounded py-1 shadow bg-secondary d-flex flex-row justify-content-start px-2 mb-1 pointer"
          @click="showItemsFor()"
        >
          <div
            class="d-flex flex-column justify-content-center algin-item-center mr-3"
          >
            <div class="bg-warning rounded-circle px-1">
              {{ project.name.substring(0, 2).toUpperCase() }}
            </div>
          </div>
          <div>
            <div class="text-capitalize">{{ project.messeges[index].uid }}</div>
            <div>{{ project.messeges[index].text }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "chat",
  data() {
    return {
      messeges: [],
    };
  },
  methods: {
    showItemsFor() {
      for (let i = 0; i < this.$refs.items.length; i++) {
        this.$refs.items[i].classList.toggle("show-item");
      }
    },
  },
  created: function () {
    this.messeges = [
      {
        name: "Lost in translation",
        messeges: [
          {
            uid: "ahmad",
            text: "hello",
            createdAt: "2021-03-21",
          },
          {
            uid: "ahmad",
            text: "hello",
            createdAt: "2021-03-21",
          },
          {
            uid: "ahmad",
            text: "hello",
            createdAt: "2021-03-21",
          },
          {
            uid: "ahmad",
            text: "hello",
            createdAt: "2021-03-21",
          },
        ],
      },
      {
        name: "Lost in translation",
        messeges: [
          {
            uid: "ahmad",
            text: "hello",
            createdAt: "2021-03-21",
          },
          {
            uid: "ahmad",
            text: "hello",
            createdAt: "2021-03-21",
          },
          {
            uid: "ahmad",
            text: "hello",
            createdAt: "2021-03-21",
          },
          {
            uid: "ahmad",
            text: "hello",
            createdAt: "2021-03-21",
          },
        ],
      },
      {
        name: "Lost in translation",
        messeges: [
          {
            uid: "ahmad",
            text: "hello",
            createdAt: "2021-03-21",
          },
          {
            uid: "ahmad",
            text: "hello",
            createdAt: "2021-03-21",
          },
          {
            uid: "ahmad",
            text: "hello",
            createdAt: "2021-03-21",
          },
          {
            uid: "ahmad",
            text: "hello",
            createdAt: "2021-03-21",
          },
        ],
      },
    ];
  },
};
</script>

<style scoped>
#icon {
  position: fixed !important;
  right: 10px;
  bottom: 90px;
}

#icon:hover + #chat-container {
  opacity: 1;
  bottom: 150px;
}

#chat-container:hover + #chat-container {
  opacity: 1;
  bottom: 160px;
}

#chat-container {
  opacity: 0;
  transition: all 0.1s linear;
  position: fixed !important;
  right: 60px;
  bottom: 130px;
}

.show-item {
  overflow: hidden;
  max-width: 20%;
}

.pointer {
  cursor: pointer;
}
</style>