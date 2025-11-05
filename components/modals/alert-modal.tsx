"use client"
import { useState, useEffect } from "react";
import { Modal } from "../ui/modal";
import { Button } from "../ui/button";
interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

const AlertModal = ({ isOpen, onClose, onConfirm, loading }: AlertModalProps) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);
    if (!mounted) {
        return null;
    }
  return (
    <Modal title="Are you sure?" description="This action cannot be undone." isOpen={isOpen} onclose={onClose}>
        <div className="space-y-4 py-2 pb-2">
            <div className="flex items-center justify-end gap-2">
                <Button variant="outline" onClick={onClose} disabled={loading}>Cancel</Button>
                <Button variant="destructive" onClick={onConfirm} disabled={loading}>Continue</Button>
            </div>
        </div>
    </Modal>
  )
}

export default AlertModal