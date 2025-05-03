import React from "react";
import { Check, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SubscriptionPlans = () => {
  const navigate = useNavigate();
  const plans = [
    {
      name: "Basic",
      price: "Free",
      period: "",
      features: [
        "Basic listing features",
        "Standard customer support",
        "Up to 5 active listings",
        "Basic analytics",
      ],
      buttonText: "Current Plan",
      buttonVariant: "outline",
      isCurrent: true,
    },
    {
      name: "Premium",
      price: "$9.99",
      period: "/month",
      features: [
        "All Basic features",
        "Priority customer support",
        "Unlimited listings",
        "Advanced analytics",
        "Featured listings",
        "Custom branding",
      ],
      buttonText: "Upgrade to Monthly",
      buttonVariant: "primary",
      isPopular: true,
    },
    {
      name: "Premium",
      price: "$99.99",
      period: "/year",
      features: [
        "All Premium features",
        "Priority customer support",
        "Unlimited listings",
        "Advanced analytics",
        "Featured listings",
        "Custom branding",
        "2 months free",
      ],
      buttonText: "Upgrade to Yearly",
      buttonVariant: "primary",
      isPopular: false,
    },
  ];

  const handleSubscribe = (plan) => {
    navigate("/subscribe", { state: { plan } });
  };

  return (
    <div className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Choose Your Plan
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Select the plan that best fits your needs
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name + plan.period}
              className={`relative rounded-lg border bg-white p-8 shadow-sm ${
                plan.isPopular
                  ? "border-primary-500 ring-2 ring-primary-500"
                  : "border-gray-200"
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center rounded-full bg-primary-500 px-3 py-1 text-sm font-medium text-white">
                    <Star size={16} className="mr-1" fill="currentColor" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="text-center">
                <h3 className="text-lg font-medium text-gray-900">
                  {plan.name}
                </h3>
                <div className="mt-4 flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-gray-900">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-lg text-gray-500">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <Check className="mt-1 h-5 w-5 flex-shrink-0 text-green-500" />
                    <span className="ml-3 text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <button
                  className={`w-full rounded-md px-4 py-2 text-sm font-medium ${
                    plan.buttonVariant === "primary"
                      ? "bg-primary-500 text-white hover:bg-primary-600"
                      : "border border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                  }`}
                  onClick={() => handleSubscribe(plan)}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;
