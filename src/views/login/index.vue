<template>
    <div class="login-container min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="login-box max-w-md w-full bg-white/95 backdrop-blur-sm p-8 rounded-2xl shadow-xl">
            <div class="text-center">
                <div class="logo-container mb-6">
                    <!-- <img src="@/assets/imgs/icon.icns" alt="Logo" class="w-24 h-24 mx-auto object-contain"> -->
                </div>
                <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">
                    登录您的账户
                </h2>
                <p class="mt-2 text-sm text-gray-600">
                    欢迎回来！请输入您的账户信息
                </p>
            </div>

            <form class="mt-8 space-y-6" @submit.prevent="handleLogin">
                <div class="space-y-4">
                    <div class="input-group">
                        <label class="text-sm font-medium text-gray-700 mb-1 block">用户名</label>
                        <el-input v-model="username" type="text" required placeholder="请输入用户名" :prefix-icon="User"
                            class="login-input" />
                    </div>

                    <div class="input-group">
                        <label class="text-sm font-medium text-gray-700 mb-1 block">密码</label>
                        <el-input v-model="password" :type="showPassword ? 'text' : 'password'" required
                            placeholder="请输入密码" :prefix-icon="Lock" :suffix-icon="showPassword ? View : Hide"
                            @click-suffix-icon="showPassword = !showPassword" class="login-input" />
                    </div>
                </div>

                <div class="flex items-center justify-between text-sm">
                    <el-checkbox v-model="rememberMe">
                        记住我
                    </el-checkbox>
                    <a href="#" class="text-blue-600 hover:text-blue-800 transition-colors">
                        忘记密码？
                    </a>
                </div>

                <div>
                    <el-button type="primary" class="login-button w-full h-11 text-lg rounded-lg" native-type="submit"
                        :loading="loading">
                        {{ loading ? '登录中...' : '登录' }}
                    </el-button>
                </div>
            </form>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import { User, Lock, View, Hide } from '@element-plus/icons-vue'

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const loading = ref(false)
const router = useRouter()
const { login } = useUserStore()

const handleLogin = async () => {
    if (!username.value || !password.value) {
        ElMessage.warning('请输入用户名和密码')
        return
    }

    loading.value = true
    try {
        await new Promise(resolve => setTimeout(resolve, 800))
        console.log('Login attempt:', username.value, password.value)
        ElMessage.success('登录成功！')
        login()
        await nextTick()
        router.push('/')
    } catch (error) {
        ElMessage.error('登录失败，请重试')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-container {
    background-image: url('@/assets/login-bg.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
}

.login-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(147, 51, 234, 0.5));
}

.login-box {
    position: relative;
    transition: transform 0.3s ease;
}

.login-box:hover {
    transform: translateY(-5px);
}

.login-input :deep(.el-input__wrapper) {
    box-shadow: none !important;
    background: transparent;
    border: 1px solid #e5e7eb;
    transition: all 0.3s ease;
}

.login-input :deep(.el-input__wrapper:hover) {
    border-color: #3b82f6;
}

.login-input :deep(.el-input__wrapper.is-focus) {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1) !important;
}

.login-button {
    background: linear-gradient(135deg, #3b82f6, #9333ea);
    border: none;
    transition: all 0.3s ease;
}

.login-button:hover {
    opacity: 0.9;
    transform: translateY(-1px);
}

@media (max-width: 640px) {
    .login-box {
        margin: 1rem;
        padding: 1.5rem;
    }
}
</style>