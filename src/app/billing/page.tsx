import { billingPlans, usageStats } from "@/lib/data";
import { UsageBar } from "@/components/UsageBar";

const invoices = [
  { id: "INV-2025-003", date: "Mar 1, 2025", amount: "$29.00", status: "Paid" },
  { id: "INV-2025-002", date: "Feb 1, 2025", amount: "$29.00", status: "Paid" },
  { id: "INV-2025-001", date: "Jan 1, 2025", amount: "$29.00", status: "Paid" },
];

export default function BillingPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Billing</h1>
        <p className="text-gray-500 mt-1">
          Manage your subscription plan and view usage.
        </p>
      </div>

      {/* Plans */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {billingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`bg-white rounded-xl border p-6 shadow-sm flex flex-col ${
                plan.current
                  ? "border-violet-400 ring-2 ring-violet-200"
                  : "border-gray-200"
              }`}
            >
              {plan.current && (
                <span className="self-start text-xs font-semibold text-violet-600 bg-violet-50 px-2 py-0.5 rounded-full mb-3">
                  Current Plan
                </span>
              )}
              <h3 className="font-bold text-gray-900 text-lg">{plan.name}</h3>
              <div className="mt-1 mb-4">
                <span className="text-3xl font-bold text-gray-900">
                  ${plan.price}
                </span>
                <span className="text-gray-400 text-sm">/{plan.period}</span>
              </div>
              <ul className="space-y-2 flex-1 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-green-500 mt-0.5">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <button
                disabled={plan.current}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  plan.current
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : plan.price === 0
                    ? "border border-gray-200 text-gray-700 hover:bg-gray-50"
                    : "bg-violet-600 text-white hover:bg-violet-700"
                }`}
              >
                {plan.current ? "Current Plan" : plan.price === 0 ? "Downgrade" : "Upgrade"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Usage */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Usage This Month
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-5">
          {usageStats.map((stat) => (
            <UsageBar key={stat.label} stat={stat} />
          ))}
        </div>
      </section>

      {/* Payment Method */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Payment Method
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-8 bg-gray-900 rounded-md flex items-center justify-center">
                <span className="text-white text-xs font-bold">VISA</span>
              </div>
              <div>
                <p className="font-medium text-gray-900">Visa ending in 4242</p>
                <p className="text-sm text-gray-400">Expires 12/26</p>
              </div>
            </div>
            <button className="text-sm text-violet-600 hover:underline">
              Update
            </button>
          </div>
        </div>
      </section>

      {/* Invoice History */}
      <section>
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Invoice History
        </h2>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Invoice
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Date
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Amount
                </th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Status
                </th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 font-medium text-gray-900">{inv.id}</td>
                  <td className="px-6 py-4 text-gray-500">{inv.date}</td>
                  <td className="px-6 py-4 text-gray-900">{inv.amount}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-50 text-green-700">
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-violet-600 hover:underline text-sm">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
