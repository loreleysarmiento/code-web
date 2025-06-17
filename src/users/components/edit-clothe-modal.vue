<script>
export default {
  name: "EditClotheModal",
  props: {
    clothe: { type: Object, required: true },
    visible: { type: Boolean, default: false }
  },
  data() {
    return {
      edited: { ...this.clothe }
    };
  },
  watch: {
    clothe(newVal) {
      this.edited = { ...newVal };
    }
  },
  methods: {
    close() {
      this.$emit("close");
    },
    save() {
      this.$emit("save", this.edited);
    },
    remove() {
      this.$emit("remove", this.edited);
    }
  }
};
</script>

<template>
  <div v-if="visible" class="modal-backdrop" @click.self="close">
    <div class="modal-rosa">
      <div class="modal-header">
        <span class="clothe-name">{{ edited.nombre }}</span>
        <button class="close-btn" @click="close">×</button>
      </div>
      <div class="modal-main-box">
        <div class="modal-img-box">
          <img :src="edited.imagen" alt="Imagen prenda" />
        </div>
        <div class="modal-data-box">
          <div class="data-columns">
            <div class="left-col">
              <div class="inline-field">
                <label>Precio:</label>
                <input v-model="edited.precio" type="number" />
              </div>
              <div class="inline-field">
                <label>Tipo:</label>
                <input v-model="edited.tipo" />
              </div>
              <div class="inline-field">
                <label>Talla:</label>
                <input v-model="edited.talla" />
              </div>
              <div class="inline-field">
                <label>Color:</label>
                <input v-model="edited.color" />
              </div>
            </div>
            <div class="right-col">
              <label>Descripción:</label>
              <textarea v-model="edited.descripcion" rows="7" />
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button class="icon-btn delete" @click="remove" title="Eliminar">
            🗑️
          </button>
          <button class="icon-btn save" @click="save" title="Guardar">
            ✔️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-main-box {
  background: #f4b8cb;
  border-radius: 20px;
  margin: 0 30px 0 30px;
  padding: 24px 24px 24px 24px;
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.modal-backdrop {
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.modal-rosa {
  background: #ffffff;
  border-radius: 20px;
  min-width: 700px;
  min-height: 520px;
  padding: 0 0 30px 0;
  position: relative;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  display: flex;
  flex-direction: column;
  align-items: stretch;
}
.modal-header {
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  border-radius: 20px 20px 0 0;
  padding: 28px 30px 18px 30px;
  font-size: 1.5rem;
  font-weight: 700;
  color: #7a3030;
  position: relative;
}
.clothe-name {
  flex: 1;
  text-align: center;
  color: #7a3030;
}
.close-btn {
  position: absolute;
  right: 30px;
  top: 22px;
  background: none;
  border: none;
  font-size: 2rem;
  color: #b46e7e;
  cursor: pointer;
}
.modal-img-box {
  background: #e4738f;
  border-radius: 15px;
  margin: 18px 30px 0 30px;
  padding: 12px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-img-box img {
  width: 120px;
  height: 120px;
  border-radius: 10px;
  object-fit: cover;
  background: #fff;
}
.modal-data-box {
  background: #e4738f;
  border-radius: 15px;
  margin: 18px 30px 0 30px;
  padding: 24px 24px;
}
.data-columns {
  display: flex;
  gap: 30px;
}
.left-col, .right-col {
  display: flex;
  flex-direction: column;
  gap: 18px;
  flex: 1;
}
.inline-field {
  display: flex;
  align-items: center;
  gap: 12px;
}
.left-col label, .right-col label {
  font-weight: 600;
  color: #7a3030;
  margin-bottom: 2px;
  min-width: 80px;
}
.left-col input {
  border: 1px solid #ffd2dd;
  border-radius: 8px;
  padding: 6px 10px;
  background: #fff;
  color: #7a3030;
  font-size: 1rem;
  margin-bottom: 0;
  flex: 1;
}
.right-col textarea {
  border: 1px solid #ffd2dd;
  border-radius: 8px;
  padding: 6px 10px;
  background: #fff;
  color: #7a3030;
  font-size: 1rem;
  resize: vertical;
  min-height: 60px;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  margin: 28px 40px 0 40px;
}
.icon-btn {
  background: #ffd2dd;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  font-size: 1.7rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.icon-btn.delete:hover {
  background: #f44336;
  color: #fff;
}
.icon-btn.save:hover {
  background: #4caf50;
  color: #fff;
}
</style>
