"use client";

import { useMemo } from 'react';
import { usePersistedState } from '@/hooks/usePersistedState';
import { calcStorageKey } from '@/lib/calculator-storage';
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
import { Calculator, TrendingUp, Calendar, Percent, Info, Printer } from 'lucide-react';
import { motion } from 'framer-motion';
import SiteHeader from '@/components/SiteHeader';
import { useLocale } from '@/components/LocaleProvider';
import NumberField from '@/components/NumberField';
import CurrencyIcon from '@/components/CurrencyIcon';
import { useMoneyValue } from '@/hooks/useMoneyValue';
import PulseTeaser from '@/components/PulseTeaser';
import CalculatorFaq from '@/components/CalculatorFaq';
import RelatedTools from '@/components/RelatedTools';
import CopyCalcLink from '@/components/CopyCalcLink';
import CalculatorMethodology from '@/components/CalculatorMethodology';

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
    expRet: "Annual Price Growth (Excluding Dividends)",
    returnHelp: "Enter expected price appreciation only. Dividend yield and tax are calculated separately below.",
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
    res1Desc: "A Dividend Reinvestment Plan, commonly known as DRIP, uses cash dividends to purchase additional full or fractional shares instead of paying the cash out. Reinvestment can increase the number of shares that may receive future dividends, but plan availability, purchase timing, fees, and fractional-share rules depend on the broker or issuer.",
    res2Title: "The Magic of Compound Interest",
    res2Desc: "Compounding means returns can be earned on both contributed capital and previously retained returns. With DRIP, reinvested net dividends can buy more shares, which may produce additional dividends later. The effect depends on time, contributions, realized returns, taxes, fees, and whether dividends continue; it does not guarantee a retirement outcome.",
    res3Title: "High Yield vs. Dividend Growth",
    res3Desc: "A higher current yield can increase modeled income, but it can also reflect a lower market price or greater risk of a dividend reduction. A lower-yielding investment may or may not grow its dividend. Test several yield assumptions and assess total return, diversification, fees, and the sustainability of distributions outside this calculator.",
    res4Title: "Achieving FIRE (Financial Independence, Retire Early)",
    res4Desc: "Financial-independence planning compares future spending with income and withdrawals supported by a portfolio. Dividends can be one source of cash, but they are not guaranteed and should not be evaluated separately from price changes, taxes, inflation, and portfolio risk. Use this projection alongside the FIRE and inflation tools to compare assumptions rather than to select investments.",
    abtTitle: "About YieldGrower Calculator",
    abt1: "YieldGrower is a comprehensive, free financial tool designed to help investors visualize the long-term trajectory of their portfolios. Whether you are a beginner taking your first steps into the stock market or a seasoned investor planning for early retirement, understanding the mathematical reality of your investment plan is crucial.",
    abt2: "Our calculator models initial principal, monthly contributions, annual price growth, dividend yield, and dividend tax separately. Enter price appreciation excluding dividends to avoid counting dividend returns twice. By toggling DRIP, you can compare reinvesting after-tax dividends with taking them as cash. We do not store your financial data; all calculations are performed securely within your browser."
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
    expRet: "연간 주가 상승률 (배당 제외)",
    returnHelp: "예상 주가 상승분만 입력하세요. 배당 수익률과 세금은 아래에서 별도로 계산됩니다.",
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
    res1Desc: "DRIP(Dividend Reinvestment Plan)은 현금 배당을 지급받는 대신 그 배당으로 주식 또는 소수점 주식을 추가 매수하는 방식입니다. 재투자로 미래 배당을 받을 수량이 늘 수 있지만, 이용 가능 여부와 매수 시점, 수수료, 소수점 매매 규칙은 증권사나 발행사마다 다릅니다.",
    res2Title: "복리의 마법",
    res2Desc: "복리는 납입 원금뿐 아니라 이전에 남겨 둔 수익에도 다시 수익이 발생하는 구조입니다. DRIP에서는 세후 배당으로 주식을 더 매수하고 그 주식이 이후 배당을 만들 수 있습니다. 실제 결과는 기간, 적립금, 실현 수익률, 세금, 수수료, 배당 유지 여부에 따라 달라지며 은퇴 결과를 보장하지 않습니다.",
    res3Title: "고배당 vs 배당 성장",
    res3Desc: "높은 현재 배당률은 계산상 소득을 늘리지만 주가 하락이나 배당 삭감 위험이 반영된 결과일 수도 있습니다. 낮은 배당률의 종목도 배당 성장이 보장되지는 않습니다. 여러 배당률을 비교하고 총수익, 분산, 수수료, 분배금 지속 가능성은 계산기 밖에서 별도로 확인해야 합니다.",
    res4Title: "FIRE (조기 은퇴) 달성하기",
    res4Desc: "경제적 자립 계획은 미래 지출과 포트폴리오가 감당할 수 있는 소득·인출을 비교합니다. 배당은 현금 원천 중 하나지만 보장되지 않으며 주가 변화, 세금, 물가, 포트폴리오 위험과 분리해 평가하면 안 됩니다. 종목 선택이 아니라 가정 비교를 위해 FIRE·인플레이션 도구와 함께 사용하세요.",
    abtTitle: "YieldGrower 계산기 소개",
    abt1: "YieldGrower는 투자자들이 포트폴리오의 장기적인 궤적을 시각화할 수 있도록 돕기 위해 고안된 무료 금융 도구입니다. 주식 시장에 첫 발을 내딛는 초보자이든 조기 은퇴를 계획하는 노련한 투자자이든, 투자 계획의 수학적 현실을 이해하는 것은 매우 중요합니다.",
    abt2: "이 계산기는 초기 투자금, 월 적립금, 연간 주가 상승률, 배당 수익률, 배당세를 각각 계산합니다. 배당 수익이 이중 반영되지 않도록 주가 상승률에는 배당을 제외한 값만 입력하세요. DRIP을 켜고 끄면 세후 배당을 재투자하는 경우와 현금으로 받는 경우를 비교할 수 있습니다. 금융 데이터는 저장하지 않으며 모든 계산은 브라우저에서 수행됩니다."
  }
};

export default function DividendCalculator() {
  const { lang, currency } = useLocale();
  const [initialInvestment, setInitialInvestment] = useMoneyValue(
    10000,
    calcStorageKey("dividend", "initialInvestment"),
    { urlParam: "i" }
  );
  const [monthlyContribution, setMonthlyContribution] = useMoneyValue(
    500,
    calcStorageKey("dividend", "monthlyContribution"),
    { urlParam: "m" }
  );
  const [yearsToGrow, setYearsToGrow] = usePersistedState(
    calcStorageKey("dividend", "yearsToGrow"),
    20,
    { urlParam: "y" }
  );
  const [expectedAnnualReturn, setExpectedAnnualReturn] = usePersistedState(
    calcStorageKey("dividend", "expectedAnnualReturn"),
    7,
    { urlParam: "r" }
  );
  const [dividendYield, setDividendYield] = usePersistedState(
    calcStorageKey("dividend", "dividendYield"),
    3,
    { urlParam: "dy" }
  );
  const [dividendTaxRate, setDividendTaxRate] = usePersistedState(
    calcStorageKey("dividend", "dividendTaxRate"),
    15,
    { urlParam: "t" }
  );
  const [dripEnabled, setDripEnabled] = usePersistedState(
    calcStorageKey("dividend", "dripEnabled"),
    true,
    { urlParam: "drip", urlType: "boolean" }
  );

  const t = translations[lang];
  const moneySuffix = currency === 'KRW' ? '원' : 'USD';

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

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <SiteHeader
        active="dividend"
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

          <PulseTeaser />
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
              <div className="flex items-center justify-between gap-3 mb-8">
                <div className="flex items-center gap-2 min-w-0">
                  <Calculator className="w-6 h-6 text-indigo-600 shrink-0" />
                  <h2 className="text-xl font-bold text-slate-900">{t.invDetails}</h2>
                </div>
                <CopyCalcLink />
              </div>
              
              <div className="space-y-5">
                <NumberField 
                  label={t.initInv} 
                  icon={CurrencyIcon} 
                  value={initialInvestment} 
                  onChange={setInitialInvestment}
                  suffix={moneySuffix}
                />
                <NumberField 
                  label={t.moCont} 
                  icon={CurrencyIcon} 
                  value={monthlyContribution} 
                  onChange={setMonthlyContribution}
                  suffix={moneySuffix}
                />
                <NumberField 
                  label={t.yrsGrow} 
                  icon={Calendar} 
                  value={yearsToGrow} 
                  onChange={setYearsToGrow} 
                  suffix={t.yrs}
                />
                
                <div className="pt-4 pb-2 border-t border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-slate-400" />
                    {t.mktAssump}
                  </h3>
                  <p className="text-xs leading-relaxed text-slate-500 mb-4">
                    {t.returnHelp}
                  </p>
                  <div className="space-y-5">
                    <NumberField 
                      label={t.expRet} 
                      icon={Percent} 
                      value={expectedAnnualReturn} 
                      onChange={setExpectedAnnualReturn} 
                      suffix="%"
                    />
                    <NumberField 
                      label={t.divYield} 
                      icon={Percent} 
                      value={dividendYield} 
                      onChange={setDividendYield} 
                      suffix="%"
                    />
                    <NumberField 
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

            {/* Chart Area */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 sm:p-8 mt-6">
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
                      formatter={(value, name) => [formatCurrency(Number(value)), name === 'balance' ? t.chartVal : t.chartCont]}
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

        {/* Resources Section */}
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

        <CalculatorMethodology page="dividend" />
        <CalculatorFaq page="dividend" />
        <RelatedTools page="dividend" />

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
      </main>
    </div>
  );
}
