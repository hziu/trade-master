<template>
    <div class="min-h-screen bg-gray-900 text-white">
        <el-container class="h-screen">
            <el-aside width="200px" class="bg-gray-800">
                <div class="p-4">
                    <h1 class="text-xl font-bold text-indigo-400">TradeMax Pro</h1>
                </div>
                <el-menu default-active="1" class="bg-gray-800 border-none" @select="handleSelect">
                    <el-menu-item index="1">
                        <el-icon>
                            <TrendCharts />
                        </el-icon>
                        <span>市场概览</span>
                    </el-menu-item>
                    <el-menu-item index="2">
                        <el-icon>
                            <Money />
                        </el-icon>
                        <span>交易中心</span>
                    </el-menu-item>
                    <el-menu-item index="3">
                        <el-icon>
                            <PieChart />
                        </el-icon>
                        <span>投资组合</span>
                    </el-menu-item>
                    <el-menu-item index="4">
                        <el-icon>
                            <Document />
                        </el-icon>
                        <span>新闻资讯</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header class="bg-gray-800 border-b border-gray-700">
                    <div class="flex justify-between items-center h-full">
                        <div class="flex space-x-4">
                            <el-button type="success" size="small">
                                <el-icon>
                                    <ArrowUp />
                                </el-icon> 买入
                            </el-button>
                            <el-button type="danger" size="small">
                                <el-icon>
                                    <ArrowDown />
                                </el-icon> 卖出
                            </el-button>
                        </div>
                        <el-dropdown>
                            <span class="el-dropdown-link cursor-pointer flex items-center">
                                <el-avatar :size="32" src="/placeholder.svg?height=32&width=32" />
                                <span class="ml-2">用户名</span>
                                <el-icon class="el-icon--right"><arrow-down /></el-icon>
                            </span>
                            <template #dropdown>
                                <el-dropdown-menu>
                                    <el-dropdown-item>个人设置</el-dropdown-item>
                                    <el-dropdown-item>退出登录</el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </el-header>

                <el-main class="p-6">
                    <el-row :gutter="20">
                        <el-col :span="16">
                            <el-card class="mb-6 bg-gray-800 border-none shadow-lg">
                                <template #header>
                                    <div class="card-header flex justify-between items-center">
                                        <span class="text-lg font-semibold">市场概览</span>
                                        <el-radio-group v-model="chartType" size="small">
                                            <el-radio-button label="day">日</el-radio-button>
                                            <el-radio-button label="week">周</el-radio-button>
                                            <el-radio-button label="month">月</el-radio-button>
                                        </el-radio-group>
                                    </div>
                                </template>
                                <div class="h-80 bg-gray-700 rounded-lg flex items-center justify-center">
                                    <!-- 这里应该放置实际的图表组件 -->
                                    <span class="text-gray-400">市场趋势图表</span>
                                </div>
                            </el-card>
                            <el-card class="bg-gray-800 border-none shadow-lg">
                                <template #header>
                                    <div class="card-header flex justify-between items-center">
                                        <span class="text-lg font-semibold">热门股票</span>
                                        <el-input v-model="search" placeholder="搜索股票" class="w-48" size="small">
                                            <template #prefix>
                                                <el-icon>
                                                    <Search />
                                                </el-icon>
                                            </template>
                                        </el-input>
                                    </div>
                                </template>
                                <el-table :data="filteredStockData" style="width: 100%"
                                    :header-cell-style="{ background: '#374151', color: '#fff' }">
                                    <el-table-column prop="name" label="名称" />
                                    <el-table-column prop="code" label="代码" />
                                    <el-table-column prop="price" label="价格" />
                                    <el-table-column prop="change" label="涨跌幅">
                                        <template #default="scope">
                                            <span :class="scope.row.change >= 0 ? 'text-green-500' : 'text-red-500'">
                                                {{ scope.row.change }}%
                                            </span>
                                        </template>
                                    </el-table-column>
                                    <el-table-column label="操作" width="120">
                                        <template #default="scope">
                                            <el-button size="small"
                                                @click="handleQuickTrade(scope.row)">快速交易</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </el-card>
                        </el-col>
                        <el-col :span="8">
                            <el-card class="mb-6 bg-gray-800 border-none shadow-lg">
                                <template #header>
                                    <div class="card-header">
                                        <span class="text-lg font-semibold">快速交易</span>
                                    </div>
                                </template>
                                <el-form :model="tradeForm" label-position="top">
                                    <el-form-item label="股票代码">
                                        <el-input v-model="tradeForm.stockCode" />
                                    </el-form-item>
                                    <el-form-item label="交易类型">
                                        <el-radio-group v-model="tradeForm.type">
                                            <el-radio-button label="buy">买入</el-radio-button>
                                            <el-radio-button label="sell">卖出</el-radio-button>
                                        </el-radio-group>
                                    </el-form-item>
                                    <el-form-item label="数量">
                                        <el-input-number v-model="tradeForm.quantity" :min="1" :step="100"
                                            step-strictly />
                                    </el-form-item>
                                    <el-form-item>
                                        <el-button type="primary" @click="handleTrade" class="w-full">
                                            {{ tradeForm.type === 'buy' ? '买入' : '卖出' }}
                                        </el-button>
                                    </el-form-item>
                                </el-form>
                            </el-card>
                            <el-card class="bg-gray-800 border-none shadow-lg">
                                <template #header>
                                    <div class="card-header flex justify-between items-center">
                                        <span class="text-lg font-semibold">最新新闻</span>
                                        <el-button type="text" @click="refreshNews">刷新</el-button>
                                    </div>
                                </template>
                                <el-timeline>
                                    <el-timeline-item v-for="news in newsData" :key="news.id" :timestamp="news.time"
                                        placement="top" :type="news.type">
                                        <el-card class="bg-gray-700 border-none">
                                            <h4>{{ news.title }}</h4>
                                            <p class="text-sm text-gray-400">{{ news.content }}</p>
                                        </el-card>
                                    </el-timeline-item>
                                </el-timeline>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { ArrowDown, ArrowUp, TrendCharts, Money, PieChart, Document, Search } from '@element-plus/icons-vue'

const chartType = ref('day')
const search = ref('')

const stockData = ref([
    { name: '阿里巴巴', code: 'BABA', price: 200.5, change: 2.3 },
    { name: '腾讯控股', code: '0700.HK', price: 545.2, change: -1.5 },
    { name: '美团', code: '3690.HK', price: 278.9, change: 0.8 },
    { name: '京东', code: 'JD', price: 75.6, change: 1.2 },
    { name: '百度', code: 'BIDU', price: 180.3, change: -0.7 },
])

const filteredStockData = computed(() => {
    return stockData.value.filter(stock =>
        stock.name.toLowerCase().includes(search.value.toLowerCase()) ||
        stock.code.toLowerCase().includes(search.value.toLowerCase())
    )
})

const newsData = ref([
    { id: 1, title: '央行宣布新的货币政策', content: '央行今日宣布降低存款准备金率0.5个百分点，以支持实体经济发展。', time: '10:30', type: 'primary' },
    { id: 2, title: '科技巨头发布季度财报', content: '多家科技公司公布了超预期的季度财报，推动科技股全面上涨。', time: '14:15', type: 'success' },
    { id: 3, title: '全球股市创新高', content: '受经济复苏预期提振，全球主要股指纷纷创下历史新高。', time: '16:45', type: 'warning' },
])

const tradeForm = ref({
    stockCode: '',
    type: 'buy',
    quantity: 100,
})

const handleSelect = (key: string) => {
    console.log('Selected menu item:', key)
}

const handleQuickTrade = (stock: any) => {
    tradeForm.value.stockCode = stock.code
    ElMessage.success(`已选择 ${stock.name}（${stock.code}）进行快速交易`)
}

const handleTrade = () => {
    const action = tradeForm.value.type === 'buy' ? '买入' : '卖出'
    ElMessage.success(`${action} ${tradeForm.value.quantity} 股 ${tradeForm.value.stockCode}`)
}

const refreshNews = () => {
    // 这里应该是从API获取最新新闻的逻辑
    ElMessage.info('正在刷新最新新闻...')
}
</script>

<style scoped>
.el-menu {
    border-right: none;
}

.el-menu-item {
    color: #a0aec0;
}

.el-menu-item:hover,
.el-menu-item.is-active {
    background-color: #2d3748;
    color: #fff;
}

.el-table {
    background-color: transparent;
    color: #fff;
}

.el-table th,
.el-table tr {
    background-color: transparent;
}

.el-input,
.el-input-number {
    width: 100%;
}

:deep(.el-input__wrapper) {
    background-color: #4a5568;
    box-shadow: none;
}

:deep(.el-input__inner) {
    color: #fff;
}

:deep(.el-button) {
    background-color: #4a5568;
    border-color: #4a5568;
    color: #fff;
}

:deep(.el-button:hover) {
    background-color: #2d3748;
    border-color: #2d3748;
}

:deep(.el-radio-button__inner) {
    background-color: #4a5568;
    border-color: #4a5568;
    color: #fff;
}

:deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
    background-color: #3182ce;
    border-color: #3182ce;
    box-shadow: -1px 0 0 0 #3182ce;
}
</style>