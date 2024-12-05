<template>
    <div class="trading-platform dark-theme">
        <!-- 顶部导航 -->
        <header class="platform-header">
            <div class="header-left">
                <h1 class="logo">况客交易所</h1>
                <el-menu mode="horizontal" class="main-nav">
                    <el-menu-item index="1">现货</el-menu-item>
                    <el-menu-item index="2">保证金</el-menu-item>
                    <el-menu-item index="3">基金</el-menu-item>
                    <el-menu-item index="4">期权</el-menu-item>
                </el-menu>
            </div>
            <div class="header-right">
                <el-button-group>
                    <el-button>充值</el-button>
                    <el-button>提现</el-button>
                </el-button-group>
                <span class="user-assets">≈ 123,456.78 CNY</span>
            </div>
        </header>

        <!-- 主交易区域 -->
        <div class="trading-container">
            <!-- 左侧市场列表 -->
            <div class="market-list">
                <div class="market-search">
                    <el-input v-model="searchMarket" placeholder="搜索市场" prefix-icon="Search" />
                    <div class="market-tabs">
                        <el-tabs>
                            <el-tab-pane label="自选">
                                <market-list :data="favoriteMarkets" />
                            </el-tab-pane>
                            <el-tab-pane label="股票型">
                                <market-list :data="stockMarkets" />
                            </el-tab-pane>
                            <el-tab-pane label="债券型">
                                <market-list :data="bondMarkets" />
                            </el-tab-pane>
                        </el-tabs>
                    </div>
                </div>
            </div>

            <!-- 中间图表区域 -->
            <div class="chart-section">
                <!-- 交易对信息 -->
                <div class="symbol-info">
                    <div class="symbol-basic">
                        <h2>华夏上证50ETF</h2>
                        <div class="price-info">
                            <span class="current-price">3.456</span>
                            <span class="price-change up">+2.31%</span>
                        </div>
                    </div>
                    <div class="symbol-stats">
                        <div class="stat-item">
                            <span class="label">24h高</span>
                            <span class="value">3.521</span>
                        </div>
                        <div class="stat-item">
                            <span class="label">24h低</span>
                            <span class="value">3.401</span>
                        </div>
                        <div class="stat-item">
                            <span class="label">24h成交额</span>
                            <span class="value">123.45M</span>
                        </div>
                    </div>
                </div>

                <!-- K线图表 -->
                <div class="chart-container">
                    <Main />
                </div>

            </div>


        </div>

        <!-- 底部最新成交 -->
        <div class="recent-trades">
            <el-table :data="recentTrades" height="200">
                <el-table-column label="时间" prop="time" width="120" />
                <el-table-column label="价格" prop="price" width="100">
                    <template #default="scope">
                        <span :class="scope.row.side === 'buy' ? 'green' : 'red'">
                            {{ scope.row.price }}
                        </span>
                    </template>
                </el-table-column>
                <el-table-column label="数量" prop="amount" width="100" />
                <el-table-column label="成交额" prop="total" />
            </el-table>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import Main from './components/main.vue'

// 搜索和市场数据
const searchMarket = ref('')
const favoriteMarkets = ref([])
const stockMarkets = ref([])
const bondMarkets = ref([])

// 图表相关
const timeframe = ref('1h')

// 交易面板数据
const orderType = ref('limit')
const limitPrice = ref('')
const amount = ref('')
const percentage = ref(0)

// 订单簿数据
const asks = ref([
    { price: 3.458, amount: 1000, total: 3458, percentage: 80 },
    { price: 3.457, amount: 500, total: 1728.5, percentage: 40 },
    // ... 更多卖单数据
])

const bids = ref([
    { price: 3.455, amount: 800, total: 2764, percentage: 60 },
    { price: 3.454, amount: 1200, total: 4144.8, percentage: 90 },
    // ... 更多买单数据
])

// 最新成交数据
const recentTrades = ref([
    {
        time: '14:30:25',
        price: 3.456,
        amount: 100,
        total: 345.6,
        side: 'buy'
    },
    // ... 更多成交数据
])

// 图表引用
// 在 script 标签内添加以下类型定义
interface Trade {
    time: string
    price: number
    amount: number
    total: number
    side: 'buy' | 'sell'
}

interface OrderBookItem {
    price: number
    amount: number
    total: number
    percentage: number
}

</script>

<style scoped>
.trading-platform {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background-color: #f5f7fa;
    color: #333;
}

.platform-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px;
    height: 64px;
    background-color: #fff;
    border-bottom: 1px solid #ebeef5;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
}

.header-left {
    display: flex;
    align-items: center;
    gap: 32px;
}

.logo {
    font-size: 22px;
    font-weight: bold;
    color: #409EFF;
}

.trading-container {
    display: flex;
    flex: 1;
    overflow: hidden;
    padding: 16px;
    gap: 16px;
    background-color: #f5f7fa;
}

.market-list {
    width: 320px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.market-search {
    padding: 16px;
}

.market-tabs {
    margin-top: 16px;
}

.chart-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.trading-panel {
    width: 360px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
}

.symbol-info {
    padding: 20px;
    border-bottom: 1px solid #ebeef5;
}

.symbol-basic {
    margin-bottom: 16px;
}

.symbol-basic h2 {
    font-size: 20px;
    margin: 0 0 8px 0;
}

.price-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.symbol-stats {
    display: flex;
    gap: 24px;
}

.stat-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.stat-item .label {
    font-size: 12px;
    color: #909399;
}

.stat-item .value {
    font-size: 14px;
    font-weight: 500;
}

.chart-container {
    padding: 16px;
}

.chart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.chart-tools {
    display: flex;
    gap: 16px;
    align-items: center;
}

.order-book {
    padding: 20px;
}

.order-book-header {
    display: flex;
    justify-content: space-between;
    padding: 0 16px 8px;
    color: #909399;
    font-size: 12px;
}

.order-row {
    display: flex;
    justify-content: space-between;
    padding: 6px 16px;
    position: relative;
    font-size: 13px;
}

.recent-trades {
    margin: 16px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
    padding: 16px;
}

.order-form {
    padding: 20px;
}

.price-input,
.amount-input {
    margin-bottom: 16px;
}

.price-input label,
.amount-input label {
    display: block;
    margin-bottom: 8px;
    color: #606266;
}

.order-buttons {
    display: flex;
    gap: 16px;
    margin-top: 24px;
}

.buy-button,
.sell-button {
    flex: 1;
    height: 40px;
}

/* 其他样式保持不变 */
</style>
