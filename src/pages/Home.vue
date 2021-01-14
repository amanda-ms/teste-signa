<template>
  <div class="home container">
    <div class="home__content">
      <figure class="home__content__figure">
        <img src="@/assets/github-octocat.png" />
      </figure>

      <div class="home__content__user">
        <div class="home__content__user__search">
          <span>https://github.com/</span>
          <input type="search" placeholder="Usuário" v-model="user" />
        </div>
        <button @click="searchRepositories">Buscar repositórios</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    user: "",
  }),
  computed: {
    ...mapGetters({ seekFavorites: "seekFavorites" }),
  },
  mounted() {},
  methods: {
    async searchRepositories() {
      await this.$store.dispatch("seekFavorites", this.user);

      this.$router.push("/dashboard");
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 85%;
  margin: 0 7.5%;
}

.container {
  width: 100%;
  height: 100%;
}

.home {
  background: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  &__content {
    display: flex;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    border: 1px solid rgb(122, 13, 13);
    box-shadow: 2px 2px 2px 1px rgba(194, 111, 111, 0.2);
    background: #fff;
    width: 450px;
    height: 430px;
    &__figure {
      margin-top: 50px;
      height: 150px;
      width: 150px;
      object-fit: cover;
      border: 2px solid rgb(122, 13, 13);
      border-radius: 50%;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &__title {
      margin: 20px 0;
      font-size: 25px;
    }
    &__user {
      margin: 40px 0;
      display: flex;
      flex-direction: column;
      &__search {
        input {
          outline: 0;
          border: 0;
          border: 1px solid #000;
          border-radius: 25px;
          padding: 2px 10px;
        }
      }
      button {
        margin-top: 20px;
        outline: 0;
        border: 0;
        border-radius: 25px;
        color: #fff;
        padding: 10px;
        background: rgb(122, 13, 13);
        cursor: pointer;
      }
    }
  }
}
</style>
