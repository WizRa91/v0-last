"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { useAurei } from "@/hooks/useAurei" // Assuming you have this hook

interface AureiWalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AureiWalletModal({ isOpen, onClose }: AureiWalletModalProps) {
  const { totalAurei, loading } = useAurei() // Example usage

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="theme-secondary-bg theme-text theme-border">
        <DialogHeader>
          <DialogTitle className="theme-text">My Aurei Wallet</DialogTitle>
          <DialogDescription className="theme-secondary-text">
            View your Aurei balance and transaction history.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          {loading ? (
            <p className="theme-secondary-text">Loading Aurei balance...</p>
          ) : (
            <p className="text-2xl font-bold theme-text">
              {totalAurei} <span className="text-sm font-normal theme-secondary-text">Aurei</span>
            </p>
          )}
          {/* Placeholder for transaction history or other wallet features */}
          <div className="mt-6 p-4 theme-primary-bg rounded-md">
            <p className="theme-text text-sm">Transaction history will appear here.</p>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button onClick={onClose} variant="outline" className="theme-button-outline">
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
