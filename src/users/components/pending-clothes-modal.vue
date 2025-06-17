<script>
export default {
  name: "PendingClothesModal",
  props: {
    items: { type: Array, required: true }
  },
  data() {
    return {
      page: 0,
      pageSize: 10
    };
  },
  computed: {
    startIndex() {
      return this.page * this.pageSize;
    },
    endIndex() {
      return this.startIndex + this.pageSize;
    },
    pagedItems() {
      return this.items.slice(this.startIndex, this.endIndex);
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    nextPage() {
      if (this.endIndex < this.items.length) this.page++;
    },
    prevPage() {
      if (this.page > 0) this.page--;
    }
  }
};
</script>

<template>
  <div class="modal-backdrop" @click.self="close">
    <div class="modal-content">
      <button class="close-btn" @click="close">×</button>
      <div class="modal-title">Pendientes</div>
      <div class="gallery">
        <button class="arrow left" @click="prevPage" :disabled="page === 0">‹</button>
        <div class="cards">
          <div class="card" v-for="item in pagedItems" :key="item.id">
            <button class="editar-btn-card" @click="$emit('edit', item)">Editar</button>
            <img :src="item.imagen" alt="Prenda pendiente" />
            <div>Nombre: {{ item.nombre }}</div>
            <div>Tipo: {{ item.tipo }}</div>
            <div>Estado: Pendiente</div>
            <div>Precio: S/. {{ item.precio }}</div>
          </div>
        </div>
        <button class="arrow right" @click="nextPage" :disabled="endIndex >= items.length">›</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.modal-content {
  background: #fff;
  border-radius: 20px;
  padding: 30px 20px;
  min-width: 700px;
  min-height: 350px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}
.close-btn {
  position: absolute;
  top: 10px; right: 20px;
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
}
.modal-title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #b46e7e;
  margin-bottom: 20px;
  letter-spacing: 1px;
}
.gallery {
  display: flex;
  align-items: center;
  justify-content: center;
}
.cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 15px;
  margin: 0 20px;
}
.card {
  background: #ffdde4;
  border-radius: 15px;
  padding: 10px;
  text-align: center;
  font-size: 0.9rem;
  color: #7a3030;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.card img {
  width: 60px;
  height: 60px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 5px;
}
.editar-btn-card {
  position: absolute;
  top: 6px;
  right: 6px;
  background: #ffd2dd;
  border: none;
  padding: 2px 10px;
  border-radius: 10px;
  cursor: pointer;
  color: #b46e7e;
  font-weight: 700;
  font-size: 0.8rem;
  z-index: 2;
}
.arrow {
  background: #e4738f;
  color: #fff;
  border: none;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}
.arrow:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>
