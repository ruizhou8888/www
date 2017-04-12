<template lang="html">
<div>
    <el-row :gutter="40">
        <el-col :span="6">
            <div class="card">
                <div class="content">
                    <el-row>
                        <el-col :span="8" style="text-align:center">
                            <i style="color:#F3BB45" class="iconfont icon-users large"></i>
                        </el-col>
                        <el-col :span="16" class="numbers">
                            <p>船员 / 学生</p>
                            <p class="total">13209 人</p>
                        </el-col>
                    </el-row>
                    <div class="footer">
                        <hr>
                        <div class="stats">
                            <i class="el-icon-search"></i><span class="btn-tag">搜索简历</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="card">
                <div class="content">
                    <el-row>
                        <el-col :span="8" style="text-align:center">
                            <i style="color:#7AC29A" class="iconfont icon-resume large"></i>
                        </el-col>
                        <el-col :span="16" class="numbers">
                            <p>收到简历</p>
                            <p class="total">8669 份</p>
                        </el-col>
                    </el-row>
                    <div class="footer">
                        <hr>
                        <div class="stats">
                            <i class="el-icon-check"></i><span class="btn-tag">处理简历</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="card">
                <div class="content">
                    <el-row>
                        <el-col :span="8" style="text-align:center">
                            <i style="color:#EB5E28" class="iconfont icon-message large"></i>
                        </el-col>
                        <el-col :span="16" class="numbers">
                            <p>通知</p>
                            <p class="total">14</p>
                        </el-col>
                    </el-row>
                    <div class="footer">
                        <hr>
                        <div class="stats">
                            <i class="el-icon-view"></i><span class="btn-tag">查看</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
        <el-col :span="6">
            <div class="card">
                <div class="content">
                    <el-row>
                        <el-col :span="8" style="text-align:center">
                            <i style="color:#68B3C8" class="iconfont icon-tuwen large"></i>
                        </el-col>
                        <el-col :span="16" class="numbers">
                            <p>公众文章</p>
                            <p class="total">20</p>
                        </el-col>
                    </el-row>
                    <div class="footer">
                        <hr>
                        <div class="stats">
                            <i class="el-icon-view"></i><span class="btn-tag">查看所有</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-col>
    </el-row>
    <el-row :gutter="40" style="margin-top:15px">
        <el-col :span="12">
            <!--区域车辆统计-->
            <div class="card">
                <div class="content">
                    <div id="area"></div>
                </div>
            </div>
        </el-col>
        <el-col :span="12">
            <!--异常车辆统计-->
             <div class="card">
                <div class="content">
                    <div id="pieChart"></div>
                </div>
            </div>
        </el-col>
    </el-row>
</div>
</template>
<script>
import echarts from 'echarts'

export default{
    mounted () {
       this.initPicChart();
       this.initSZ();
    },
    data(){
        return { 
            zoption : {
                title: {
                    text: '武汉市车辆区域分布统计图',
                    subtext: '数据来自网络',
                   x:"center",
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    boundaryGap: [0, 0.01]
                },
                yAxis: {
                    type: 'category',
                    data: ['江岸区', '江汉区', '硚口区', '汉阳区', '武昌区', '青山区', '洪山区', '东西湖区', '汉南区', '蔡甸区', '江夏区', '黄陂区', '新洲区', '车辆总数(个)', ]
                },
                series: [{
                    name: '2017年',
                    type: 'bar',
                    data: [3, 10, 35, 78, 20, 24, 34, 42, 74, 45, 3, 7, 8, 200]
                }, ]
            },           
            option : {
                    title : {
                        text: '武汉市电动车盗窃饼状图',
                        subtext: '区域比例',
                        x:'center'
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: ['江岸区 ','江汉区 ','硚口区 ','汉阳区 ','武昌区 ','洪山区 ','青山区 ','东西湖区 ','蔡甸区 ','江夏区 ','黄陂区 ','新洲区 ','汉南区 ']
                    },
                    series : [
                        {
                            name: '数据展示',
                            type: 'pie',
                            radius : '55%',
                            center: ['50%', '60%'],
                            data:[
                                {value:335, name:'江岸区 '},
                                {value:310, name:'江汉区 '},
                                {value:234, name:'硚口区 '},
                                {value:135, name:'汉阳区 '},
                                {value:1548, name:'武昌区 '},
                                {value:232, name:'洪山区 '},
                                {value:500, name:'青山区 '},
                                {value:168, name:'东西湖区 '},
                                {value:568, name:'蔡甸区 '},
                                {value:200, name:'江夏区 '},
                                {value:761, name:'黄陂区 '},
                                {value:651, name:'新洲区 '},
                                {value:404, name:'汉南区 '},
                            ],
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                }
                            }
                        }
                    ]
                }      
        
        
        
        }
    },
    methods:{
        initPicChart(){
            this.line = echarts.init(document.getElementById('pieChart'));
            this.line.setOption(this.option);
        },
        initSZ(){
            this.area = echarts.init(document.getElementById('area'));
            this.area.setOption(this.zoption);
        }
    }
}

</script>
<style lang="css" scoped>
    .total{
        font-weight:500 !important;
        font-size:30px !important;
    }
    .large{
        font-size:40px;
    }
    .btn-tag{
        padding-left:5px;
    }
    #pieChart {
        height:400px;
        width:100%;
    }
    #area{
        height:400px;
        width:100%;
    }
    #pieChart #area canvas{
        width:100%;
    }  
    .card{
        border-radius: 6px;
        box-shadow: 0 2px 2px rgba(204, 197, 185, 0.5);
        background-color: #FFFFFF;
        color: #252422;
        margin-bottom: 20px;
        position: relative;
        z-index: 1; 
    }
    .card .content{
        padding: 15px 15px 10px 15px;
    }
    .card .footer{
        padding: 0;
        line-height: 30px;
    }
    .card .numbers {
        font-size: 2em;
        text-align: right;
    }
    .card .numbers p {
        margin: 0;
        font-size:16px;
        line-height:1.4em;
    }
    .card .footer hr {
        margin-top: 5px;
        margin-bottom: 5px;
        border-color: #F1EAE0;
        border: 0;
        border-top: 1px solid #eee;
    }
    .card .footer div {
        display: inline-block;
    }
    .card .stats {
        color: #a9a9a9;
        font-weight: 300;
        cursor: pointer;
    }
</style>