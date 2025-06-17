<template>
  <div class="clothing-card">
    <div class="container-buttons">
      <div class="trash-buttons" @click="$emit('trash',clothe)">
        <img src="/public/trash.png" alt="favorite" class="icon" />
      </div>
      <div class="edit-buttons"  @click="$emit('edit', clothe)">
        <img src="/public/EditIcon.png" alt="edit" class="icon" />
      </div>
    </div>

    <img :src="clothe.imagen" :alt="clothe.nombre" class="clothe-image"/>

    <ul class="info-tags">
      <li class="tag">Tipo: {{ clothe.tipo }}</li>
      <li class="tag">Talla: {{ clothe.talla }}</li>
      <li class="tag">Color: {{ clothe.color }}</li>
    </ul>
  </div>

</template>

<script>
export default {
  name: "ClotheCardWardrobe",
  props: {
    clothe: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.clothing-card {
  background-color: #E8E8E8;
  border-radius: 16px;
  padding: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  width: 180px;
  text-align: center;
  font-family: 'K2D', sans-serif;
}

.container-buttons {
  display: flex;
  justify-content: space-between;
  margin-bottom: 6px;
}

.icon {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.clothe-image {
  width: 100%;
  height: 160px;
  object-fit: contain;
  border-radius: 8px;
  background: white;
}

.info-tags {
  list-style: none;
  padding: 0;
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.tag {
  background-color: #F5B9CB;
  border-radius: 12px;
  padding: 4px 8px;
  font-size: 13px;
  font-weight: 500;
}
</style>
