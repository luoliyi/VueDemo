<template>
    <div class="test">
      <a-select :defaultValue="provinceData[0].key" style="width: 120px" @change="handleProvinceChange">
        <a-select-option v-for="province in provinceData" :key="province.key" :value="province.value">{{province.value}}</a-select-option>
      </a-select>
      <a-select v-model="cities[0].key" style="width: 120px">
        <a-select-option v-for="city in cities" :key="city.key" :value="city.value">{{city.value}}</a-select-option>
      </a-select>
    </div>
</template>

<script>
const provinceData = [
  { key: 'zhejiang', value: 'zhejiang' },
  { key: 'Jiangsu', value: 'Jiangsu' }
]
const cityData = {
  zhejiang: [
    { key: 'Hangzhou', value: 'Hangzhou' },
    { key: 'Ningbo', value: 'Ningbo' },
    { key: 'Wenzhou', value: 'Wenzhou' }
  ],
  Jiangsu: [
    { key: 'Nanjing', value: 'Nanjing' },
    { key: 'Suzhou', value: 'Suzhou' },
    { key: 'Zhenjiang', value: 'Zhenjiang' }
  ]
}
export default {
  name: 'Test',
  data () {
    return {
      provinceData,
      cityData,
      cities: cityData[provinceData[0].key]
    }
  },
  methods: {
    handleProvinceChange (value) {
      this.cities = cityData[value]
    }
  }
}
</script>

<style lang="less" scoped>

</style>
