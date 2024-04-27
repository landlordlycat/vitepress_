---
title: Profile
layout: page
---

<script setup>
import {ref,onMounted} from 'vue'

const yiyan = ref('')

const getYiyan = async () => {
 const res = await fetch('https://v1.hitokoto.cn/')
 const data = await res.json()
 yiyan.value = data
}

onMounted(async()=>{
  await getYiyan()
})

</script>

<div :class="$style.yiyan">
<span>一言</span>
<span :class="$style.hitokoto"> {{yiyan.hitokoto ?? '接口请求失败，请稍后再重试~'}} --{{yiyan.from ?? ''}}
</span>
<button :class="$style.button" @click="getYiyan">下一条</button>

</div>

<style module>
.yiyan {
  margin-top: 20px;
  display:flex;
  flex-direction: column;
  align-items: center;
  font-size: 20px;
}

.button {
  color: #666;
  font-weight: bold;
  border:1px solid #ccc;
  padding: 1px 10px;
  border-radius: 5px;
  margin-top: 10px;
}
.button:hover{
  background-color: rgba(0,0,0,0.02);
  color:#555
}

.hitokoto {
  cursor: pointer;
  background: linear-gradient(to right,#742f2b,#146420) no-repeat right bottom;
  background-size:0% 2px;
  transition:background-size 1s;
  padding: 5px 10px;
}

.hitokoto:hover {
  background-position:left bottom;
  background-size:100% 2px;
}

</style>
