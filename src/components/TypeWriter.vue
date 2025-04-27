<template>
  <el-card class="page-container">
    <div :style="styleProps" class="typewriter">
      <span>{{ displayText }}</span>
      <span class="cursor">|</span>
    </div>
  </el-card>
</template>

<script setup>
import {computed, onMounted, onUnmounted, ref} from 'vue'

const props = defineProps({
  phrases: {
    type: Array,
    default: () => ['1. 健康打卡', '2. 体温上报', '3. 异常报告']
  },
  speed: {
    type: Number,
    default: 100
  },
  fontSize: {
    type: String,
    default: '2rem'
  },
  color: {
    type: String,
    default: '#2c3e50'
  }
})

const currentIndex = ref(0)
const displayText = ref('')
const timer = ref(null)
const phase = ref('typing') // 新增阶段控制：typing | pausing | deleting

const styleProps = computed(() => ({
  fontSize: props.fontSize,
  color: props.color,
  opacity: '60%',
  fontFamily: "'JetBrains Mono', 'Microsoft YaHei', monospace"
}))

const getNextPhrase = () => {
  const nextIndex = (currentIndex.value + 1) % props.phrases.length
  return props.phrases[nextIndex]
}

const startTyping = () => {
  phase.value = 'typing'
  const target = props.phrases[currentIndex.value]

  if (displayText.value.length < target.length) {
    displayText.value = target.slice(0, displayText.value.length + 1)
    timer.value = setTimeout(startTyping, props.speed)
  } else {
    phase.value = 'pausing'
    timer.value = setTimeout(startDeleting, 1000) // 暂停1秒后开始删除
  }
}

const startDeleting = () => {
  phase.value = 'deleting'
  const nextPhrase = getNextPhrase()
  const commonPrefix = findCommonPrefix(
      props.phrases[currentIndex.value],
      nextPhrase
  )

  if (displayText.value.length > commonPrefix.length) {
    displayText.value = displayText.value.slice(0, -1)
    timer.value = setTimeout(startDeleting, props.speed * 1.5)
  } else {
    currentIndex.value = (currentIndex.value + 1) % props.phrases.length
    timer.value = setTimeout(startTyping, props.speed) // 立即开始下一个短语
  }
}

const findCommonPrefix = (str1, str2) => {
  let i = 0
  while (i < str1.length && i < str2.length && str1[i] === str2[i]) {
    i++
  }
  return str1.substring(0, i)
}

onMounted(() => {
  timer.value = setTimeout(startTyping, 500) // 初始延迟
})

onUnmounted(() => {
  clearTimeout(timer.value)
})
</script>

<style scoped>
.page-container {
  min-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.typewriter {
  text-align: center;
  line-height: 1.5;
}

.cursor {
  animation: blink 1s step-end infinite;
  margin-left: 2px;
}

@keyframes blink {
  50% {
    opacity: 0
  }
}

/* 如果项目中没有引入JetBrains Mono字体，需要添加以下内容 */
/* @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono&display=swap'); */
</style>
