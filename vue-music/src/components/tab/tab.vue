<template>
<div class="tab">
 <router-link tag="div"class="tab-item" to="/recommend">
  <span class="tab-word">推荐</span>
 </router-link>
  <router-link tag="div"class="tab-item" to="/single">
  <span class="tab-word">歌手</span>
 </router-link>
  <router-link tag="div"class="tab-item" to="/rank">
  <span class="tab-word">排行</span>
 </router-link>
  <router-link tag="div"class="tab-item" to="/search">
  <span class="tab-word">搜索</span>
 </router-link>
</div>
</template>

<script>
 export default{
 name:'MTab'
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/mixin'
.tab
 display:flex
 height:30px
 line-height:30px
 font-size:$font-size-medium
 margin-top:10px
 z-index:0
.tab-item
 flex:1
 text-align:center

.tab-word
 color:$color-text-l
 padding-bottom:5px
&.router-link-active
 .tab-word
  color:$color-theme
  border-bottom:2px solide $color-theme
</style>