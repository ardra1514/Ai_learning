import React, { useContext } from 'react'
import { AuthContext} from '../../context/AuthContext'
import { Bell, Menu, User } from 'lucide-react'

const Header = ({ toggleSidebar }) => {
    const {user} = useContext(AuthContext)
  return <header
  className="sticky top-0 z-40 w-full h-16 backdrop-blur-xl border-b"
  style={{
    backgroundColor: "rgba(255,255,255,0.95)",
    borderColor: "rgba(109,165,192,0.2)",
  }}
>
  <div className="flex items-center justify-between h-full px-6">

    {/* Mobile Menu Button */}
    <button
      onClick={toggleSidebar}
      className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl"
      style={{
        color: "var(--secondary-dark)",
      }}
      aria-label="Toggle sidebar"
    >
      <Menu size={24} />
    </button>

    <div className="hidden md:block"></div>

    <div className="flex items-center gap-3">

      {/* Notification Bell */}
      <button
        className="relative inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 hover:scale-105"
        style={{
          backgroundColor: "rgba(109,165,192,0.12)",
        }}
      >
        <Bell
          size={20}
          strokeWidth={2}
          style={{ color: "var(--teal-dark)" }}
        />

        <span
          className="absolute top-2 right-2 w-2 h-2 rounded-full"
          style={{
            backgroundColor: "var(--teal)",
          }}
        />
      </button>

      {/* User Profile */}
      <div className="flex items-center gap-3 pl-3 border-l border-slate-200/60">

        <div
          className="flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-200"
          style={{
            backgroundColor: "rgba(109,165,192,0.08)",
          }}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white shadow-md"
            style={{
              background:
                "linear-gradient(135deg,var(--teal-dark),var(--teal))",
            }}
          >
            <User
              size={18}
              strokeWidth={2.5}
            />
          </div>

          <div>
            <p
              className="text-sm font-semibold"
              style={{
                color: "var(--primary-dark)",
              }}
            >
              {user?.username || "User"}
            </p>

            <p
              className="text-xs"
              style={{
                color: "var(--slate-blue)",
              }}
            >
              {user?.email || "user@example.com"}
            </p>
          </div>
        </div>

      </div>

    </div>

  </div>
</header>
}

export default Header