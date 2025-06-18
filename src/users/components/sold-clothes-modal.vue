<script>
export default {
  name: "SoldClothesModal",
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
      <div class="modal-title">Vendidos</div>
      <div class="gallery">
        <button class="arrow left" @click="prevPage" :disabled="page === 0">
          <img src="/public/FLECHAIZQUIERDA.png" />
        </button>
        <div class="cards">
          <div class="card" v-for="item in pagedItems" :key="item.id">
            <img :src="item.imagen" alt="Prenda" />
            <div class="dato-card">Tipo: {{ item.tipo }}</div>
            <div class="dato-card">Estado: Vendido</div>
            <div class="dato-card">Precio: S/. {{ item.precio }}</div>
          </div>
        </div>
        <button class="arrow right" @click="nextPage" :disabled="endIndex >= items.length">
          <img src="/public/FlechaContinuar.png" />
        </button>
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
  border-radius: 150px;
  padding: 50px 40px;
  min-width: 1300px;
  min-height: 800px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.close-btn {
  position: absolute;
  top: 30px;
  right: 60px;
  background: none;
  border: none;
  font-size: 3rem;
  cursor: pointer;
  color: #000000;
  z-index: 2;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #e4738f;
}

.modal-title {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #000;
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.gallery {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 600px; /* Centra verticalmente las flechas respecto a las cards */
}

.cards {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 40px;
  margin: 0 40px;
}

.card {
  padding: 30px 20px;
  text-align: center;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  min-width: 180px;
  min-height: 260px;
  box-shadow: 0 2px 8px rgba(180,110,126,0.07);
}

.card img {
  width: 130px;
  height: 130px;
  border-radius: 10px;
  object-fit: cover;
  margin-bottom: 15px;
  background: #fff;
}

.card div {
  font-size: 0.8rem;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  text-align: left;
  margin-bottom: 5px;
  padding-bottom: 5px;
  padding-top: 5px;
}

.dato-card {
  background: #f5b9cb;
  border-radius: 15px;
  padding: 4px 12px;
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 1rem;
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.arrow {
  background: none;
  border: none;
  border-radius: 0;
  width: 70px;
  height: 70px;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.arrow:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.arrow img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: filter 0.2s, transform 0.2s;
}

.arrow:hover img:not(:disabled) {
  filter: brightness(1.2) drop-shadow(0 0 6px #e4738f);
  transform: scale(1.08);
}
</style>