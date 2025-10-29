export default function Settings() {
  return (
    <>
      {/* Page Title */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Settings</h2>
        <p className="text-slate-400">Configure your marketplace settings</p>
      </div>

      <div className="space-y-6">
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">General Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-slate-400 text-sm mb-2">Store Name</label>
              <input
                type="text"
                placeholder="My Marketplace"
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Email</label>
              <input
                type="email"
                placeholder="admin@example.com"
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-sm mb-2">Currency</label>
              <select className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>LYB (£)</option>
              </select>
            </div>
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Notifications</h3>
          <div className="space-y-3">
            {["Email notifications", "Push notifications", "Order updates", "Marketing emails"].map((item, index) => (
              <label
                key={index}
                className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg cursor-pointer hover:bg-slate-700/50"
              >
                <span className="text-white">{item}</span>
                <input type="checkbox" className="w-5 h-5 accent-purple-500" defaultChecked={index < 2} />
              </label>
            ))}
          </div>
        </div>

        <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:shadow-lg transition-shadow">
          Save Changes
        </button>
      </div>
    </>
  )
}
