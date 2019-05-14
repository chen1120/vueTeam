<template>
  <div class="home">
    This is an Home page
    <div class="test">
      <div class="test1">
        好气呀
      </div>
    </div>
    <p>{{ outputCount }}</p>
    <p>{{ getTodo }}</p>
    <button @click="btnClick">点击</button>
  </div>
</template>

<script>
import { GETADDRESSURL } from '@/apiUrl'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import { CHANGE_CONUNT } from 'store/modules/moduleName/mutationName'
import { OUTPUT_COUNT, GET_TODO } from 'store/modules/moduleName/getterName'
import { ACTION_CHANGE_COUNT } from 'store/modules/moduleName/actionName'
export default {
  name: 'home',
  async created () {
    const res = await this.$http({
      url: GETADDRESSURL,
      methods: 'GET'
    })
    console.log(res)
  },
  methods: {
    btnClick () {
      this.aChangeCount(3)
    },
    ...mapMutations({
      'changeCount': `GL/${CHANGE_CONUNT}`
    }),
    ...mapActions({
      'aChangeCount': `GL/${ACTION_CHANGE_COUNT}`
    })
  },
  computed: {
    ...mapState({
      count: state => state.GL.count
    }),
    ...mapGetters({
      'outputCount': `GL/${OUTPUT_COUNT}`,
      'getTodo': `LWD/${GET_TODO}`
    })
  }
}
</script>

<style lang="less">
  .home {
    font-size: 16PX;
  }
  .test {
    width: 100px;
    background: #ff6700;
    height: 100px;
    .test1 {
      color: #fff;
    }
  }
</style>
