"use client"

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import React, { useState } from "react"
import { cn } from "@/lib/utils"

type PricingSwitchProps = {
  onSwitch: (value: string) => void
}

type PricingCardProps = {
  isYearly?: boolean
  title: string
  monthlyPrice?: number
  yearlyPrice?: number
  description: string
  features: string[]
  actionLabel: string
  popular?: boolean
  exclusive?: boolean
  actionLink?: string
}

const PricingHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <section className="text-center">
    <h2 className="text-3xl font-bold">{title}</h2>
    <p className="text-xl pt-1">{subtitle}</p>
    <br />
  </section>
)

const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
  <Tabs defaultValue="0" className="w-40 mx-auto" onValueChange={onSwitch}>
    <TabsList className="py-6 px-2">
      <TabsTrigger value="0" className="text-base">
        Monthly
      </TabsTrigger>
      <TabsTrigger value="1" className="text-base">
        Yearly
      </TabsTrigger>
    </TabsList>
  </Tabs>
)

const PricingCard = ({ isYearly, title, monthlyPrice, yearlyPrice, description, features, actionLabel, actionLink, popular, exclusive }: PricingCardProps) => (
  <Card
    className={cn(`w-72 flex flex-col justify-between py-1 ${popular ? "border-rose-400" : "border-zinc-700"} mx-auto sm:mx-0`, {
      "animate-background-shine bg-white dark:bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] transition-colors":
        exclusive,
    })}>
    <div>
      <CardHeader className="pb-8 pt-4">
        {isYearly && yearlyPrice && monthlyPrice ? (
          <div className="flex justify-between">
            <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
            <div
              className={cn("px-2.5 rounded-xl h-fit text-sm py-1 bg-zinc-200 text-black dark:bg-zinc-800 dark:text-white", {
                "bg-gradient-to-r from-orange-400 to-rose-400 dark:text-black ": popular,
              })}>
              Save ${monthlyPrice * 12 - yearlyPrice}
            </div>
          </div>
        ) : (
          <CardTitle className="text-zinc-700 dark:text-zinc-300 text-lg">{title}</CardTitle>
        )}
        <div className="flex gap-0.5">
          <h3 className="text-3xl font-bold">{yearlyPrice && isYearly ? "$" + yearlyPrice : monthlyPrice ? "$" + monthlyPrice : "Custom"}</h3>
          <span className="flex flex-col justify-end text-sm mb-1">{yearlyPrice && isYearly ? "/year" : monthlyPrice ? "/month" : null}</span>
        </div>
        <CardDescription className="pt-1.5 h-12">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        {features.map((feature: string) => (
          <CheckItem key={feature} text={feature} />
        ))}
      </CardContent>
    </div>
    <CardFooter className="mt-2">
        {actionLink ? (
          <a href={actionLink} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button className="relative w-full bg-black dark:bg-white text-white dark:text-black rounded-md px-6 py-2 font-medium hover:opacity-90">
              {actionLabel}
            </Button>
          </a>
        ) : (
          <Button className="relative w-full bg-black dark:bg-white text-white dark:text-black rounded-md px-6 py-2 font-medium hover:opacity-90">
            {actionLabel}
          </Button>
        )}
      </CardFooter>
  </Card>
)

const CheckItem = ({ text }: { text: string }) => (
  <div className="flex gap-2">
    <CheckCircle2 size={18} className="my-auto text-green-400" />
    <p className="pt-0.5 text-zinc-700 dark:text-zinc-300 text-sm">{text}</p>
  </div>
)

export default function page() {
  const [isYearly, setIsYearly] = useState(false)
  const togglePricingPeriod = (value: string) => setIsYearly(parseInt(value) === 1)

  const plans = [
  {
    title: "Starter Signals",
    monthlyPrice: 1,
    yearlyPrice: 1,
    description: "Get your foot in the market with curated entry and exit points on trending tokens.",
    features: ["Limited memecoin signals per week", "Real-time entry/exit alerts", "Stop-loss & take-profit guidance"],
    actionLabel: "Purchase Now",
    actionLink: "https://t.me/vaesmartsignals_starter"
  },
  {
    title: "Pro",
    monthlyPrice: 75,
    yearlyPrice: 750,
    description: "For serious traders who want daily premium signals.",
    features: ["Daily curated signals for trending memecoins & major tokens", "Multi-target take-profit & stop-loss strategies", "Historical performance analytics for each signal"],
    actionLabel: "Purchase Now",
    popular: true,
    actionLink: "https://link.depay.com/1YXhcjWimEaEc7iLEYbdRs" // <-- MUST be a value
  },
  {
    title: "Elite",
    monthlyPrice: 250,
    yearlyPrice: 2000,
    description: "VIP-grade access for power traders",
    features: ["Full memecoin & altcoin coverage", "Whale wallet tracking + early-entry alerts", "Example Feature Number 3", "Direct Telegram VIP support & insights"],
    actionLabel: "Purchase Now",
    actionLink: "https://link.depay.com/A6UUzvdNzmf2HTit7UQgk"
  },
];
  return (
    <div className="py-8">
      <PricingHeader title="SmartSignal Pricing Plans" subtitle="Choose the signals that are right for you!" />
      <PricingSwitch onSwitch={togglePricingPeriod} />
      <section className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-8 mt-8">
        {plans.map((plan) => {
          return <PricingCard key={plan.title} {...plan} isYearly={isYearly} />
        })}
      </section>
    </div>
  )
}
