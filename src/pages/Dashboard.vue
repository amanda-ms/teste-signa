<template>
  <div class="dashboard container">
    <div class="header">
      <div class="content">
        <img src="@/assets/mdi_search.svg" />
        <input type="text" placeholder="Pesquise por tags" v-model="q" />
      </div>
    </div>

    <table class="table content">
      <thead>
        <tr>
          <th>Id</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Linguagem</th>
          <th>Tags</th>
          <th>Editar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="starred in filterLanguage" :key="starred.id">
          <td>
            {{ starred.id }}
          </td>

          <td>
            <a :href="starred.html_url" class="anchor">
              {{ starred.name }}
            </a>
          </td>

          <td>
            {{
              starred.description || "Esse repositório não possui descrição."
            }}
          </td>

          <td>{{ starred.language }}</td>

          <td class="table__tags">
            <div>
              {{ tag }}
            </div>
          </td>

          <td class="table__action">
            <a href="#" @click="editTags(starred.id)">
              <img src="@/assets/edit-file.svg" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="modal" v-if="modal">
      <div class="modal__content">
        <div class="modal__content__header">
          <p>Editar tags</p>

          <button @click="modal = false">
            <img src="@/assets/close.svg" />
          </button>
        </div>
        <input type="text" v-model="tag" />
        <div class="modal__content__tags">
          <button
            v-for="(item, index) in tags"
            :key="index"
            :value="item"
            @click="addTags"
          >
            {{ item }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  data: () => ({
    q: "",
    tag: "",
    repository: [],
    tags: ["HTML", "CSS", "Vue", "React", "Golang", "Nodejs", "Angular"],
    modal: false,
  }),
  computed: {
    ...mapGetters({ seekFavorites: "seekFavorites" }),

    filterLanguage() {
      return this.seekFavorites.filter((item) =>
        item.language.toLowerCase().match(RegExp(this.q.toLowerCase()))
      );
    },
  },

  methods: {
    editTags(id) {
      this.modal = true;
      this.repository = this.seekFavorites.find((item) => item.id === id);

      // console.log(this.repository);

      // localStorage.setItem("tag", JSON.stringify("tag"));
    },
    addTags() {
      const arr = [];
      this.tags.map((item) => arr.push(item));
      console.log(arr);

      this.tag = arr.join(",");
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

.dashboard {
  display: flex;
  flex-direction: column;
  background: #000;
  .header {
    background: #fff;
    height: 60px;
    display: flex;
    align-items: center;
    .content {
      display: flex;
      input {
        height: auto;
        padding: 10px;
        border: 0;
        outline: 0;
        width: 30%;
        font-size: 12px;
        font-family: Poppins, sans-serif;
        &::placeholder {
          color: #90a0b7;
          font-size: 14px;
        }
      }
    }
  }
  .table {
    margin-top: 40px;
    margin-bottom: 40px;
    width: 85%;
    background: #fff;
    border-radius: 5px;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.06);
    border-collapse: collapse;
    &__tags {
      display: flex;
      align-items: center;
      div {
        padding: 5px 15px;
        border: 1px solid rgb(122, 13, 13);
        margin-right: 15px;
        border-radius: 4px;
        color: rgb(122, 13, 13);
        font-weight: 500;
      }
    }
    &__action {
      img {
        width: 30px;
        height: 30px;
      }
    }
    thead {
      tr {
        color: #334d6e;
        th {
          padding: 10px;
          border-bottom: 1px solid #ebeff2;
          text-align: left;
        }
      }
    }

    tbody {
      tr {
        border-top: 1px solid #ebeff2;
        td {
          padding: 10px;
          text-align: left;
          .anchor {
            color: #000;
          }
        }
      }
    }
  }
  .modal {
    background: rgba(0, 0, 0, 0.5);
    width: 100%;
    top: 0;
    left: 0;
    height: 100%;
    position: fixed;
    display: flex;
    align-items: center;
    justify-content: center;
    &__content {
      padding: 10px;
      width: 500px;
      background: #fff;
      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        button {
          background: transparent;
          width: 30px;
          border: 0;
          outline: 0;
          height: 25px;
          cursor: pointer;
          img {
            width: 25px;
            height: 25px;
          }
        }
      }
      input {
        margin: 15px 0;
        padding: 10px;
        width: 100%;
        outline: 0;
        font-size: 15px;
        font-family: Poppins, sans-serif;
      }
      &__tags {
        display: flex;
        button {
          padding: 5px 10px;
          border: 0;
          background: rgb(122, 13, 13);
          color: #fff;
          border-radius: 15px;
          outline: 0;
          cursor: pointer;
          margin-right: 5px;
        }
      }
    }
  }
}
</style>
