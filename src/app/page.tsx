"use client";

import { useState, useMemo } from 'react';
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
import { Calculator, DollarSign, TrendingUp, Calendar, Percent, PieChart, Info, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DividendCalculator() {
  const [initialInvestment, setInitialInvestment] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [yearsToGrow, setYearsToGrow] = useState<number>(20);
  const [expectedAnnualReturn, setExpectedAnnualReturn] = useState<number>(7);
  const [dividendYield, setDividendYield] = useState<number>(3);
  const [dividendTaxRate, setDividendTaxRate] = useState<number>(15);
  const [dripEnabled, setDripEnabled] = useState<boolean>(true);
  const [currency, setCurrency] = useState<'USD' | 'KRW'>('USD');

  const calculateData = useMemo(() => {
    let currentBalance = initialInvestment;
    let totalContributions = initialInvestment;
    const data = [];

    for (let year = 1; year <= yearsToGrow; year++) {
      let yearlyDividend = 0;
      let yearlyCapitalGain = 0;

      for (let month = 1; month <= 12; month++) {
        // 1. Add monthly contribution
        currentBalance += monthlyContribution;
        totalContributions += monthlyContribution;

        // 2. Calculate monthly capital gain
        const monthlyReturnRate = expectedAnnualReturn / 12 / 100;
        const monthlyGain = currentBalance * monthlyReturnRate;
        currentBalance += monthlyGain;
        yearlyCapitalGain += monthlyGain;

        // 3. Calculate monthly dividend
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
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-indigo-600 p-2 rounded-lg">
              <PieChart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-violet-600">
              YieldGrower
            </span>
          </div>
          <div className="flex items-center gap-4 sm:gap-6">
            <select 
              value={currency} 
              onChange={(e) => setCurrency(e.target.value as 'USD' | 'KRW')}
              className="text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-700 py-1.5 pl-3 pr-8 focus:ring-indigo-500 focus:border-indigo-500 outline-none cursor-pointer"
            >
              <option value="USD">USD ($)</option>
              <option value="KRW">KRW (₩)</option>
            </select>
            <button 
              onClick={() => window.print()} 
              className="hidden sm:flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
            >
              <Printer className="w-4 h-4" /> Save PDF
            </button>
            <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-600 border-l border-slate-200 pl-6">
              <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-indigo-600 transition-colors">Calculator</button>
              <button onClick={() => document.getElementById('resources')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-600 transition-colors">Resources</button>
              <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="hover:text-indigo-600 transition-colors">About</button>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6"
          >
            Visualize Your <span className="text-indigo-600">Dividend Snowball</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-600 leading-relaxed mb-8"
          >
            Calculate how your investments grow over time with the power of compound interest and Dividend Reinvestment Plans (DRIP).
          </motion.p>

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
                <h2 className="text-xl font-bold text-slate-900">Investment Details</h2>
              </div>
              
              <div className="space-y-5">
                <InputField 
                  label="Initial Investment" 
                  icon={DollarSign} 
                  value={initialInvestment} 
                  onChange={setInitialInvestment} 
                />
                <InputField 
                  label="Monthly Contribution" 
                  icon={DollarSign} 
                  value={monthlyContribution} 
                  onChange={setMonthlyContribution} 
                />
                <InputField 
                  label="Years to Grow" 
                  icon={Calendar} 
                  value={yearsToGrow} 
                  onChange={setYearsToGrow} 
                  suffix="Yrs"
                />
                
                <div className="pt-4 pb-2 border-t border-slate-100">
                  <h3 className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-slate-400" />
                    Market Assumptions
                  </h3>
                  <div className="space-y-5">
                    <InputField 
                      label="Expected Annual Return" 
                      icon={Percent} 
                      value={expectedAnnualReturn} 
                      onChange={setExpectedAnnualReturn} 
                      suffix="%"
                    />
                    <InputField 
                      label="Dividend Yield" 
                      icon={Percent} 
                      value={dividendYield} 
                      onChange={setDividendYield} 
                      suffix="%"
                    />
                    <InputField 
                      label="Dividend Tax Rate" 
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
                      <span className="block text-sm font-semibold text-slate-900">Enable DRIP</span>
                      <span className="block text-xs text-slate-500 mt-0.5">Reinvest dividends automatically</span>
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
                  <p className="text-sm font-semibold text-slate-500 mb-1">Final Portfolio Value</p>
                  <p className="text-3xl font-bold text-slate-900 tracking-tight">{formatCurrency(finalData?.balance || 0)}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10">
                  <p className="text-sm font-semibold text-slate-500 mb-1">Total Contributions</p>
                  <p className="text-3xl font-bold text-slate-900 tracking-tight">{formatCurrency(finalData?.contributions || 0)}</p>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-violet-50 to-violet-100 rounded-full opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                <div className="relative z-10">
                  <p className="text-sm font-semibold text-slate-500 mb-1">Annual Dividend Income</p>
                  <p className="text-3xl font-bold text-indigo-600 tracking-tight">{formatCurrency(finalData?.yearlyDividend || 0)}</p>
                  <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
                    <Info className="w-3 h-3" /> By Year {yearsToGrow}
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
                  <h3 className="text-xl font-bold text-slate-900">Portfolio Growth Projection</h3>
                  <p className="text-sm text-slate-500 mt-1">Watch your wealth compound over time</p>
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
                      tickFormatter={(value) => `Yr ${value}`} 
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
                      formatter={(value: any, name: any) => [formatCurrency(Number(value)), name === 'balance' ? 'Total Value' : 'Contributions']}
                      labelFormatter={(label) => `Year ${label}`}
                    />
                    <Legend 
                      verticalAlign="top" 
                      height={36}
                      iconType="circle"
                    />
                    <Area 
                      type="monotone" 
                      dataKey="balance" 
                      name="Total Value" 
                      stroke="#4f46e5" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorBalance)" 
                      activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="contributions" 
                      name="Contributions" 
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

        {/* Resources Section */}
        <div id="resources" className="mt-24 pt-16 border-t border-slate-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Investment Resources</h2>
            <p className="mt-4 text-slate-600">Learn more about dividend investing and compound interest.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-indigo-600 mb-2">What is DRIP?</h3>
              <p className="text-sm text-slate-600">A Dividend Reinvestment Plan (DRIP) allows investors to automatically reinvest cash dividends to purchase additional shares.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-indigo-600 mb-2">The Rule of 72</h3>
              <p className="text-sm text-slate-600">A simple way to determine how long an investment will take to double given a fixed annual rate of interest.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-bold text-indigo-600 mb-2">High Yield vs Growth</h3>
              <p className="text-sm text-slate-600">Understand the trade-offs between high initial dividend yields and companies with strong dividend growth histories.</p>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div id="about" className="mt-24 pt-16 border-t border-slate-200 mb-12">
          <div className="bg-indigo-50 rounded-3xl p-8 md:p-12 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">About YieldGrower</h2>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              YieldGrower is a free tool designed to help investors visualize the long-term power of dividend reinvestment and compound interest. We believe that understanding these concepts is the first step towards financial independence.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
