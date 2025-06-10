"use client"

import { DialogContent as DialogContentUI } from "@/components/ui/dialog"

import { Dialog } from "@/components/ui/dialog"

import { QrCode, Wallet } from "lucide-react"
import { useState } from "react"
import { SignInModal } from "./sign-in-modal"
import { SignUpModal } from "./sign-up-modal"
import { UserProfile } from "./user-profile"
import { AureiWalletModal } from "./aurei-wallet-modal"
import { useAuth } from "@/hooks/useAuth"
import { useAurei } from "@/hooks/useAurei"
import { Button } from "@/components/ui/button"

export function AuthButtons() {
  const { user, loading } = useAuth()
  const { totalAurei } = useAurei() // Assuming useAurei provides totalAurei
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showSignInModalFromQR, setShowSignInModalFromQR] = useState(false)

  if (loading) {
    return (
      <div className="flex items-center gap-2">
        <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div>
        <div className="h-10 w-24 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md"></div>
      </div>
    )
  }

  if (user) {
    return (
      <>
        <div className="flex items-center gap-3">
          <Button
            onClick={() => setShowWalletModal(true)}
            variant="outline"
            size="icon"
            className="bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white border-amber-500 dark:from-amber-500 dark:to-orange-600 dark:hover:from-amber-600 dark:hover:to-orange-700 dark:border-amber-600 relative p-2"
            title={`${totalAurei} Aurei`}
          >
            <Wallet size={20} />
            {totalAurei > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-green-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                {totalAurei > 99 ? "99+" : totalAurei}
              </span>
            )}
          </Button>
          <UserProfile />
        </div>
        <AureiWalletModal isOpen={showWalletModal} onClose={() => setShowWalletModal(false)} />
      </>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <div className="inline-flex -space-x-px rtl:space-x-reverse">
        {/* QR Code Button - Triggers the standard SignInModal for now */}
        <Button
          onClick={() => setShowSignInModalFromQR(true)}
          className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 theme-secondary-bg theme-text hover:bg-[var(--custom-secondary-bg)]/90 border theme-border dark:bg-dark-accent dark:text-dark-text-primary dark:hover:bg-dark-hover-teal transition-all duration-200 p-2.5"
          size="icon"
          aria-label="Sign in with QR code"
          title="Sign in with QR code"
        >
          <QrCode size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
        <SignInModal
          triggerButton={
            <Button className="rounded-none shadow-none first:rounded-s-md last:rounded-e-md focus-visible:z-10 theme-secondary-bg theme-text hover:bg-[var(--custom-secondary-bg)]/90 border-y border-r theme-border dark:bg-dark-accent dark:text-dark-text-primary dark:hover:bg-dark-hover-teal transition-all duration-200 px-4 py-2 text-sm">
              Sign In
            </Button>
          }
        />
      </div>
      <SignUpModal />
      {/* This separate SignInModal instance is for the QR button */}
      {/* It's a bit redundant but fulfills the "QR button opens a modal" idea simply */}
      {/* A more advanced QR flow would require a different modal or logic */}
      <Dialog open={showSignInModalFromQR} onOpenChange={setShowSignInModalFromQR}>
        <DialogContentUI className="theme-secondary-bg theme-text theme-border p-0">
          {/* Re-using SignInModal's internal structure by passing children or a specific prop */}
          {/* For simplicity, we're just re-using the component. Ideally, SignInModal would be more composable. */}
          <SignInModal
            isOpenedExternally={showSignInModalFromQR}
            onExternalClose={() => setShowSignInModalFromQR(false)}
          />
        </DialogContentUI>
      </Dialog>
    </div>
  )
}
