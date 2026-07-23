"use client";

import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Calculator, DollarSign, TrendingUp, Calendar, Percent, Info, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import SiteHeader from '@/components/SiteHeader';
import PulseTeaser from '@/components/PulseTeaser';

const translations = {
  en: {
    navCalc: "Calculator",
    navRes: "Resources",
    navAbout: "About",
    savePdf: "Save PDF",
    heroTitle1: "Visualize Your ",
    heroTitle2: "Dividend Snowball",
    heroSub: "Calculate how your investments grow over time with the power of compound interest and Dividend Reinvestment Plans (DRIP).",
    invDetails: "Investment Details",
    initInv: "Initial Investment",
    moCont: "Monthly Contribution",
    yrsGrow: "Years to Grow",
    yrs: "Yrs",
    mktAssump: "Market Assumptions",
    expRet: "Expected Annual Return",
    divYield: "Dividend Yield",
    divTax: "Dividend Tax Rate",
    enDrip: "Enable DRIP",
    enDripSub: "Reinvest dividends automatically",
    finVal: "Final Portfolio Value",
    totCont: "Total Contributions",
    annDiv: "Annual Dividend Income",
    byYr: "By Year",
    chartTitle: "Portfolio Growth Projection",
    chartSub: "Watch your wealth compound over time",
    chartVal: "Total Value",
    chartCont: "Contributions",
    resTitle: "The Power of Dividend Investing",
    resSub: "Master the fundamentals of wealth creation through compound interest and strategic dividend reinvestment.",
    res1Title: "What is a DRIP (Dividend Reinvestment Plan)?",
    res1Desc: "A Dividend Reinvestment Plan, commonly known as DRIP, is an investment strategy that allows shareholders to automatically reinvest their cash dividends into additional shares or fractional shares of the underlying stock on the dividend payment date. Instead of receiving a cash payout, the money is immediately put back to work. This systematic approach eliminates the temptation to spend the dividends and ensures that your capital continues to compound over time without incurring additional brokerage commissions.",
    res2Title: "The Magic of Compound Interest",
    res2Desc: "Albert Einstein famously referred to compound interest as the \"eighth wonder of the world.\" In the context of dividend investing, compounding occurs when you earn returns not just on your initial principal, but also on the accumulated dividends from previous periods. As your share count grows through DRIP, your future dividend payments increase correspondingly. Over a 10, 20, or 30-year horizon, this \"snowball effect\" can transform a modest monthly contribution into a substantial portfolio capable of funding your retirement.",
    res3Title: "High Yield vs. Dividend Growth",
    res3Desc: "Investors often face a dilemma: should they chase high initial dividend yields (e.g., 7-10%) or focus on companies with lower yields (e.g., 2-3%) but a strong history of annual dividend increases? While high yields are attractive for immediate income, they can sometimes indicate a distressed company. Conversely, Dividend Aristocrats—companies that have increased their payouts for 25+ consecutive years—offer a growing income stream that outpaces inflation. Our calculator helps you model both scenarios to find the right balance for your financial goals.",
    res4Title: "Achieving FIRE (Financial Independence, Retire Early)",
    res4Desc: "The FIRE movement relies heavily on creating passive income streams that exceed living expenses. Dividend investing is a cornerstone strategy for many FIRE practitioners. By consistently investing in broad-market index funds (like S&P 500 ETFs) or a diversified portfolio of blue-chip dividend stocks, you can build a reliable cash flow. Use our YieldGrower calculator to determine exactly how much you need to invest monthly, and for how long, to reach your \"crossover point\" where your dividends cover your lifestyle.",
    abtTitle: "About YieldGrower Calculator",
    abt1: "YieldGrower is a comprehensive, free financial tool designed to help investors visualize the long-term trajectory of their portfolios. Whether you are a beginner taking your first steps into the stock market or a seasoned investor planning for early retirement, understanding the mathematical reality of your investment plan is crucial.",
    abt2: "Our calculator takes into account essential variables including your initial principal, monthly contributions, expected market returns, dividend yields, and even tax implications. By toggling the DRIP feature, you can instantly see the dramatic difference that reinvesting makes over decades. We do not store your financial data; all calculations are performed securely within your browser. Start planning your financial freedom today."
  },
  ko: {
    navCalc: "계산기",
    navRes: "투자 정보",
    navAbout: "소개",
    savePdf: "PDF 저장",
    heroTitle1: "당신의 ",
    heroTitle2: "배당 스노우볼",
    heroSub: "복리의 마법과 배당 재투자(DRIP)를 통해 당신의 자산이 시간이 지남에 따라 어떻게 성장하는지 시각화해 보세요.",
    invDetails: "투자 설정",
    initInv: "초기 투자금",
    moCont: "월 적립금",
    yrsGrow: "투자 기간",
    yrs: "년",
    mktAssump: "시장 예상치",
    expRet: "예상 연평균 수익률",
    divYield: "배당 수익률",
    divTax: "배당 소득세율",
    enDrip: "배당 재투자 (DRIP)",
    enDripSub: "받은 배당금을 자동으로 재투자합니다",
    finVal: "최종 자산 가치",
    totCont: "총 납입 원금",
    annDiv: "연간 배당 수익",
    byYr: "투자 완료 시점",
    chartTitle: "자산 성장 그래프",
    chartSub: "시간에 따른 복리 효과를 확인하세요",
    chartVal: "총 자산",
    chartCont: "누적 원금",
    resTitle: "배당 투자의 힘",
    resSub: "복리 이자와 전략적인 배당 재투자를 통한 자산 증식의 기초를 마스터하세요.",
    res1Title: "DRIP (배당 재투자) 이란 무엇인가요?",
    res1Desc: "DRIP(Dividend Reinvestment Plan)은 주주들이 현금 배당을 받는 대신, 그 배당금으로 해당 주식을 자동으로 추가 매수하는 투자 전략입니다. 현금을 받아 소비하는 유혹을 없애고, 돈이 곧바로 다시 일하게 만듭니다. 이 체계적인 접근법은 추가적인 거래 수수료 없이 자본이 시간이 지남에 따라 계속해서 복리로 늘어나도록 보장합니다.",
    res2Title: "복리의 마법",
    res2Desc: "알베르트 아인슈타인은 복리를 '세계 8대 불가사의'라고 불렀습니다. 배당 투자에서 복리는 초기 원금뿐만 아니라 이전 기간에 누적된 배당금에서도 수익을 얻을 때 발생합니다. DRIP을 통해 보유 주식 수가 늘어남에 따라 미래의 배당금 지급액도 그에 비례하여 증가합니다. 10년, 20년, 30년의 장기적인 관점에서 이 '스노우볼 효과'는 적은 월 적립금을 은퇴 자금으로 쓸 수 있는 거대한 포트폴리오로 탈바꿈시킬 수 있습니다.",
    res3Title: "고배당 vs 배당 성장",
    res3Desc: "투자자들은 종종 딜레마에 빠집니다. 7~10%의 높은 초기 배당 수익률을 쫓을 것인가, 아니면 2~3%로 낮지만 매년 배당금을 인상해 온 역사가 깊은 우량주에 집중할 것인가? 높은 수익률은 당장의 수입에는 매력적이지만, 때로는 기업의 재무 상태가 위험하다는 신호일 수 있습니다. 반면, 25년 이상 연속으로 배당을 늘려온 '배당 귀족주'들은 인플레이션을 뛰어넘는 성장하는 수입원을 제공합니다. 저희 계산기를 사용하여 두 시나리오를 모두 테스트해 보세요.",
    res4Title: "FIRE (조기 은퇴) 달성하기",
    res4Desc: "FIRE(경제적 자립, 조기 은퇴) 운동은 생활비를 초과하는 패시브 인컴(수동적 소득) 흐름을 만드는 것에 크게 의존합니다. 배당 투자는 많은 FIRE 족들에게 핵심 전략입니다. S&P 500 ETF와 같은 시장 지수 펀드나 우량 배당주 포트폴리오에 꾸준히 투자함으로써 신뢰할 수 있는 현금 흐름을 구축할 수 있습니다. 계산기를 사용하여 배당금이 생활비를 충당하는 '크로스오버 포인트'에 도달하기 위해 매월 얼마를 투자해야 하는지 확인해 보세요.",
    abtTitle: "YieldGrower 계산기 소개",
    abt1: "YieldGrower는 투자자들이 포트폴리오의 장기적인 궤적을 시각화할 수 있도록 돕기 위해 고안된 무료 금융 도구입니다. 주식 시장에 첫 발을 내딛는 초보자이든 조기 은퇴를 계획하는 노련한 투자자이든, 투자 계획의 수학적 현실을 이해하는 것은 매우 중요합니다.",
    abt2: "저희 계산기는 초기 투자금, 월 적립금, 예상 시장 수익률, 배당 수익률, 심지어 세금까지 필수적인 변수들을 모두 고려합니다. DRIP 기능을 켜고 끔으로써, 수십 년 동안 재투자가 만드는 극적인 차이를 즉시 확인할 수 있습니다. 저희는 귀하의 금융 데이터를 저장하지 않으며, 모든 계산은 귀하의 브라우저 내에서 안전하게 수행됩니다. 오늘부터 경제적 자유를 향한 계획을 시작하세요."
  }
};

export default function DividendCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [yearsToGrow, setYearsToGrow] = useState<number>(20);
  const [expectedAnnualReturn, setExpectedAnnualReturn] = useState<number>(7);
  const [dividendYield, setDividendYield] = useState<number>(3);
  const [dividendTaxRate, setDividendTaxRate] = useState<number>(15);
  const [dripEnabled, setDripEnabled] = useState<boolean>(true);
  const [currency, setCurrency] = useState<'USD' | 'KRW'>('USD');
  const [lang, setLang] = useState<'en' | 'ko'>('en');

  const t = translations[lang];

  const calculateData = useMemo(() => {
    let currentBalance = initialInvestment;
    let totalContributions = initialInvestment;
    const data = [];

    for (let year = 1; year <= yearsToGrow; year++) {
      let yearlyDividend = 0;
      let yearlyCapitalGain = 0;

      for (let month = 1; month <= 12; month++) {
        currentBalance += monthlyContribution;
        totalContributions += monthlyContribution;

        const monthlyReturnRate = expectedAnnualReturn / 12 / 100;
        const monthlyGain = currentBalance * monthlyReturnRate;
        currentBalance += monthlyGain;
        yearlyCapitalGain += monthlyGain;

        const monthlyDividendRate = dividendYield / 12 / 100;
        const monthlyDividend = currentBalance * monthlyDividendRate;
        const afterTaxDividend = monthlyDividend * (1 - dividendTaxRate / 100);
        
        if (dripEnabled) {
          currentBalance += afterTaxDividend;
        }
        yearlyDividend += afterTaxDividend;
      }

      data.push({
        year,
        balance: Math.round(currentBalance),
        contributions: Math.round(totalContributions),
        yearlyDividend: Math.round(yearlyDividend),
        capitalGain: Math.round(yearlyCapitalGain),
      });
    }

    return data;
  }, [
    initialInvestment,
    monthlyContribution,
    yearsToGrow,
    expectedAnnualReturn,
    dividendYield,
    dividendTaxRate,
    dripEnabled
  ]);

  const finalData = calculateData[calculateData.length - 1];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(currency === 'USD' ? 'en-US' : 'ko-KR', {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const InputField = ({ label, icon: Icon, value, onChange, type = "number", suffix = "" }: any) => (
    <div className="relative group">
      <label className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</label>
      <div className="relative rounded-xl shadow-sm transition-all duration-200 group-hover:shadow-md">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
        </div>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="block w-full pl-11 pr-8 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all sm:text-sm"
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
            <span className="text-slate-400 sm:text-sm">{suffix}</span>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <SiteHeader
        active="dividend"
        lang={lang}
        currency={currency}
        onLangChange={setLang}
        onCurrencyChange={setCurrency}
        showLocaleControls
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            {t.heroTitle1} <span className="text-indigo-600">{t.heroTitle2}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed mb-6"
          >
            {t.heroSub}
          </motion.p>
          <button 
            onClick={() => window.print()} 
            className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors mb-8 print:hidden"
          >
            <Printer className="w-4 h-4" /> {t.savePdf}
          </button>

          <PulseTeaser lang={lang} />

          {/* Top Ad Slot (Leaderboard) */}
          <div className="w-full max-w-3xl mx-auto h-[90px] bg-slate-100 border border-slate-200 border-dashed rounded-lg flex items-center justify-center text-slate-400 text-sm mb-8 print:hidden">
            [Google AdSense - Top Leaderboard (728x90)]
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Inputs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-4 space-y-6"
          >
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-8">
                <Calculator className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-bold text-slate-900">{t.invDetails}</h2>
              </div>
              
              <div className="space-y-5">
                <InputField 
                  label={t.initInv} 
                  icon={DollarSign} 
                  value={initialInvestment} 
                  onChange={setInitialInvestment} 
                />
                <InputField 
                  label={t.moCont} 
                  icon={DollarSign} 
                  value={monthlyContribution} 
                  onChange={setMonthlyContribution} 
                />
                <InputField 
                  label={t.yrsGrow} 
                  icon={Calendar} 
                  value={yearsToGrow} 
                  onChange={setYearsToGrow} 
                  suffix={t.yrs}
                />
                
                <div className="pt-4 pb-2 border-t border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-slate-400" />
                    {t.mktAssump}
                  </h3>
                  <div className="space-y-5">
                    <InputField 
                      label={t.expRet} 
                      icon={Percent} 
                      value={expectedAnnualReturn} 
                      onChange={setExpectedAnnualReturn} 
                      suffix="%"
                    />
                    <InputField 
                      label={t.divYield} 
                      icon={Percent} 
                      value={dividendYield} 
                      onChange={setDividendYield} 
                      suffix="%"
                    />
                    <InputField 
                      label={t.divTax} 
                      icon={Percent} 
                      value={dividendTaxRate} 
                      onChange={setDividendTaxRate} 
                      suffix="%"
                    />
                  </div>
                </div>

                {/* DRIP Toggle */}
                <div className="pt-4 border-t border-slate-100">
                  <label className="flex items-center justify-between cursor-pointer group">
                    <div>
                      <span className="block text-sm font-semibold text-slate-900">{t.enDrip}</span>
                      <span className="block text-xs text-slate-500 mt-0.5">{t.enDripSub}</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="checkbox" 
                        className="sr-only" 
                        checked={dripEnabled}
                        onChange={(e) => setDripEnabled(e.target.checked)}
                      />
                      <div className={`block w-12 h-7 rounded-full transition-colors ${dripEnabled ? 'bg-indigo-600' : 'bg-slate-200'}`}></div>
                      <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${dripEnabled ? 'transform translate-x-5' : ''}`}></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Results & Chart */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10">
                  <p className="text-sm font-semibold text-slate-500 mb-1">{t.finVal}</p>
                  <p className="text-3xl font-bold text-slate-900 tracking-tight">{formatCurrency(finalData?.balance || 0)}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10">
                  <p className="text-sm font-semibold text-slate-500 mb-1">{t.totCont}</p>
                  <p className="text-3xl font-bold text-slate-900 tracking-tight">{formatCurrency(finalData?.contributions || 0)}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-violet-50 to-violet-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10">
                  <p className="text-sm font-semibold text-slate-500 mb-1">{t.annDiv}</p>
                  <p className="text-3xl font-bold text-indigo-600 tracking-tight">{formatCurrency(finalData?.yearlyDividend || 0)}</p>
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                    <Info className="w-3 h-3" /> {t.byYr} {yearsToGrow}
                  </p>
                </div>
              </div>
            </div>

            {/* Middle Ad Slot (In-article) */}
            <div className="w-full h-[100px] bg-slate-100 border border-slate-200 border-dashed rounded-xl flex items-center justify-center text-slate-400 text-sm mt-6 mb-2 print:hidden">
              [Google AdSense - In-article Ad (Responsive)]
            </div>

            {/* Chart Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{t.chartTitle}</h3>
                  <p className="text-sm text-slate-500 mt-1">{t.chartSub}</p>
                </div>
              </div>
              
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={calculateData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorContributions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="year" 
                      tickFormatter={(value) => `${value}${lang === 'ko' ? '년' : ' Yr'}`} 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      dy={10}
                    />
                    <YAxis 
                      tickFormatter={(value) => currency === 'USD' ? `$${(value / 1000).toFixed(0)}k` : `₩${(value / 10000).toFixed(0)}만`} 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#64748b', fontSize: 12 }}
                      dx={-10}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        borderRadius: '12px',
                        border: '1px solid #e2e8f0',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                      }}
                      formatter={(value: any, name: any) => [formatCurrency(Number(value)), name === 'balance' ? t.chartVal : t.chartCont]}
                      labelFormatter={(label) => `${lang === 'ko' ? label + '년차' : 'Year ' + label}`}
                    />
                    <Legend 
                      verticalAlign="top" 
                      height={36}
                      iconType="circle"
                      formatter={(value) => value === 'balance' ? t.chartVal : t.chartCont}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      name="balance" 
                      stroke="#4f46e5" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorBalance)" 
                      activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="contributions" 
                      name="contributions" 
                      stroke="#10b981" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorContributions)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Ad Slot (Multiplex/Native) */}
        <div className="w-full max-w-7xl mx-auto h-[150px] bg-slate-100 border border-slate-200 border-dashed rounded-xl flex items-center justify-center text-slate-400 text-sm mt-16 print:hidden">
          [Google AdSense - Multiplex / Native Ads]
        </div>

        {/* Resources Section (SEO & AdSense Content) */}
        <div id="resources" className="mt-24 pt-16 border-t border-slate-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">{t.resTitle}</h2>
            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">{t.resSub}</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <article className="prose prose-slate max-w-none">
                <h3 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">1</span>
                  {t.res1Title}
                </h3>
                <p className="text-slate-600 leading-relaxed mt-3">{t.res1Desc}</p>
              </article>

              <article className="prose prose-slate max-w-none">
                <h3 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">2</span>
                  {t.res2Title}
                </h3>
                <p className="text-slate-600 leading-relaxed mt-3">{t.res2Desc}</p>
              </article>
            </div>

            <div className="space-y-8">
              <article className="prose prose-slate max-w-none">
                <h3 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">3</span>
                  {t.res3Title}
                </h3>
                <p className="text-slate-600 leading-relaxed mt-3">{t.res3Desc}</p>
              </article>

              <article className="prose prose-slate max-w-none">
                <h3 className="text-xl font-bold text-indigo-600 flex items-center gap-2">
                  <span className="bg-indigo-100 text-indigo-700 w-8 h-8 rounded-full flex items-center justify-center text-sm">4</span>
                  {t.res4Title}
                </h3>
                <p className="text-slate-600 leading-relaxed mt-3">{t.res4Desc}</p>
              </article>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="mt-24 pt-16 border-t border-slate-200 mb-12">
          <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-3xl p-8 md:p-12 text-center border border-indigo-100 shadow-sm">
            <h2 className="text-3xl font-bold text-slate-900 mb-6">{t.abtTitle}</h2>
            <div className="text-slate-600 max-w-3xl mx-auto leading-relaxed space-y-4">
              <p>{t.abt1}</p>
              <p>{t.abt2}</p>
            </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="mt-24 pt-8 border-t border-slate-200 text-center pb-8 print:hidden">
          <p className="text-sm text-slate-500 mb-4">
            Disclaimer: YieldGrower is for informational and educational purposes only. It is not financial advice.
          </p>
          <div className="flex justify-center gap-6 text-sm">
            <Link href="/privacy" className="text-slate-500 hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <a href="#" className="text-slate-500 hover:text-indigo-600 transition-colors">Terms of Service</a>
            <a href="mailto:support@yieldgrower.com" className="text-slate-500 hover:text-indigo-600 transition-colors">Contact</a>
          </div>
        </footer>
      </main>
    </div>
  );
}