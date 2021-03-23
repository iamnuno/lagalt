/<template>
  <div class="bg-light d-flex flex-column rounded mx-2 my-2 p-1 card">
    <div class="d-flex flex-row justify-content-between">
      <div id="type">{{ username }}:</div>
      <div id="message">{{ date }}</div>
    </div>
    <div class="breakline my-1" />
    <div id="message">{{ message }}</div>
  </div>
</template>

<script>
export default {
  props: ["commit"],
  data() {
    return {
      message: this.commit.commit.message,
      username: this.commit.commit.author.name,
      date: this.commit.commit.author.date,
    };
  },
  created() {
    this.message = this.commit.commit.message;
    this.username = this.commit.commit.author.name;
    this.date = this.commit.commit.author.date;
    console.log(this.commit.commit.message);
    console.log(this.commit);
  },
};
</script>

<style scoped>
.card:hover {
  box-shadow: 0 0 11px rgba(33, 33, 33, 1);
}

.card {
  font-size: 10px;
  transition: box-shadow 0.2s;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
}
.breakline {
  background-color: rgba(119, 119, 119, 0.418);
  padding-top: 1px;
  margin-top: 1px;
}
</style>